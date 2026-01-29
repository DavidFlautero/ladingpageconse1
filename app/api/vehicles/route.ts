import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type VehicleImageInput = {
  url?: string | null; // URL pública
  path?: string | null; // autos/xxxx.jpg (recomendado)
  position?: number | null; // 1..4
};

function supabaseGuard() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        message:
          "Supabase envs faltantes. Configurá NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (o NEXT_PUBLIC_SUPABASE_ANON_KEY).",
      },
      { status: 500 }
    );
  }
  return null;
}

function normalizeSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Intenta derivar el path a partir de una publicUrl estándar:
 * https://<ref>.supabase.co/storage/v1/object/public/vehicle-images/<PATH>
 */
function pathFromVehicleImagesPublicUrl(publicUrl: string): string | null {
  try {
    const marker = "/storage/v1/object/public/vehicle-images/";
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return publicUrl.slice(idx + marker.length);
  } catch {
    return null;
  }
}

function cleanImages(input: any): VehicleImageInput[] {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  return [];
}

function ensurePositions(images: VehicleImageInput[]): VehicleImageInput[] {
  const used = new Set<number>();
  const out: VehicleImageInput[] = images.map((img) => {
    const p = Number(img.position);
    if (Number.isInteger(p) && p >= 1 && p <= 4 && !used.has(p)) {
      used.add(p);
      return { ...img, position: p };
    }
    return { ...img, position: null };
  });

  for (const img of out) {
    if (img.position) continue;
    for (let p = 1; p <= 4; p++) {
      if (!used.has(p)) {
        used.add(p);
        img.position = p;
        break;
      }
    }
  }

  return out.filter((x) => x.position && x.position >= 1 && x.position <= 4);
}

async function removeStoragePaths(paths: string[]) {
  const unique = Array.from(new Set(paths.filter(Boolean)));
  if (!unique.length) return { ok: true as const };

  if (!supabaseAdmin) {
    return {
      ok: false as const,
      error: new Error("Supabase envs faltantes."),
    };
  }

  const { error } = await supabaseAdmin!.storage
    .from("vehicle-images")
    .remove(unique);

  if (error) {
    console.error(
      "Error removiendo archivos en Storage (vehicle-images):",
      error
    );
    return { ok: false as const, error };
  }

  return { ok: true as const };
}

export async function GET() {
  const guard = supabaseGuard();
  if (guard) return guard;

  // Trae secciones con vehículos y sus imágenes (tabla vehicle_images)
  const { data, error } = await supabaseAdmin!
    .from("vehicle_sections")
    .select(
      `
      id,
      title,
      slug,
      order_index,
      visible,
      vehicles:vehicles(
        id,
        title,
        cuota_desde,
        moneda,
        orden,
        imagen_url,
        imagen_url_2,
        imagen_url_3,
        vehicle_images:vehicle_images(
          id,
          path,
          public_url,
          position,
          created_at
        )
      )
    `
    )
    .order("order_index", { ascending: true })
    .order("orden", { foreignTable: "vehicles", ascending: true })
    .order("position", {
      foreignTable: "vehicles.vehicle_images",
      ascending: true,
    });

  if (error) {
    console.error("GET /api/vehicles error", error);
    return NextResponse.json({ sections: [] }, { status: 500 });
  }

  // Orden defensivo por si acaso
  const sections = (data ?? []).map((s: any) => ({
    ...s,
    vehicles: (s.vehicles ?? []).map((v: any) => ({
      ...v,
      vehicle_images: (v.vehicle_images ?? [])
        .slice()
        .sort(
          (a: any, b: any) =>
            Number(a.position ?? 999) - Number(b.position ?? 999)
        ),
    })),
  }));

  return NextResponse.json({ sections });
}

export async function POST(req: NextRequest) {
  const guard = supabaseGuard();
  if (guard) return guard;

  const body: any = await req.json();

  // --------------------------
  // Crear sección / marca
  // --------------------------
  if (body.type === "section") {
    const title = (body.title || "").trim();
    if (!title) {
      return NextResponse.json(
        { message: "El título de la sección es obligatorio." },
        { status: 400 }
      );
    }

    const slug = normalizeSlug(title);

    const { data, error } = await supabaseAdmin!
      .from("vehicle_sections")
      .insert([{ title, slug }])
      .select()
      .single();

    if (error) {
      console.error("POST /api/vehicles (section) error", error);
      return NextResponse.json(
        { message: "No se pudo crear la sección." },
        { status: 500 }
      );
    }

    return NextResponse.json({ section: data });
  }

  // --------------------------
  // Crear vehículo (PRO) con vehicle_images (máx 4, mín 1)
  // Entrada preferida: body.images: [{path,url,position}]
  // Compat legacy: imagenUrl/imagen1..imagen4 (URLs) -> se intenta derivar path
  // --------------------------
  if (body.type === "vehicle") {
    const { sectionId, title, cuotaDesde, moneda } = body;

    const cleanTitle = (title || "").toString().trim();
    if (!sectionId || !cleanTitle) {
      return NextResponse.json(
        { message: "Faltan datos para crear el vehículo." },
        { status: 400 }
      );
    }

    // Preferido: images[]
    let images: VehicleImageInput[] = cleanImages(body.images);

    // Legacy: urls sueltas
    if (!images.length) {
      const legacyUrls = [
        body.imagenUrl,
        body.imagen1,
        body.imagen2,
        body.imagen3,
        body.imagen4,
      ]
        .map((x: any) => (x ? String(x) : ""))
        .filter(Boolean)
        .slice(0, 4);

      images = legacyUrls.map((url: string, i: number) => ({
        url,
        path: pathFromVehicleImagesPublicUrl(url),
        position: i + 1,
      }));
    }

    images = images
      .map((img) => ({
        url: img.url ? String(img.url) : null,
        path: img.path ? String(img.path) : null,
        position: img.position != null ? Number(img.position) : null,
      }))
      .filter((img) => !!img.url || !!img.path);

    if (!images.length) {
      return NextResponse.json(
        { message: "Debe haber al menos una imagen." },
        { status: 400 }
      );
    }
    if (images.length > 4) {
      return NextResponse.json(
        { message: "Máximo 4 imágenes por vehículo." },
        { status: 400 }
      );
    }

    // Exigimos path (porque vehicle_images.path es NOT NULL)
    for (const img of images) {
      if (!img.path && img.url) img.path = pathFromVehicleImagesPublicUrl(img.url);
      if (!img.path) {
        return NextResponse.json(
          {
            message:
              "Cada imagen debe incluir path. Subí con /api/upload-vehicle-image para obtener {path,url}.",
          },
          { status: 400 }
        );
      }
    }

    images = ensurePositions(images);

    // Crear vehículo (seguimos guardando legacy URLs en columns por compat)
    const { data: vehicle, error: vErr } = await supabaseAdmin!
      .from("vehicles")
      .insert([
        {
          section_id: sectionId,
          title: cleanTitle,
          cuota_desde:
            cuotaDesde !== undefined && cuotaDesde !== null
              ? Number(cuotaDesde)
              : null,
          moneda: moneda || "ARS",
          imagen_url: images[0]?.url ?? null,
          imagen_url_2: images[1]?.url ?? null,
          imagen_url_3: images[2]?.url ?? null,
        },
      ])
      .select()
      .single();

    if (vErr) {
      console.error("POST /api/vehicles (vehicle) error", vErr);
      return NextResponse.json(
        { message: "No se pudo crear el vehículo." },
        { status: 500 }
      );
    }

    // Insert imágenes en tabla profesional
    const rows = images.map((img) => ({
      vehicle_id: vehicle.id,
      path: img.path!,
      public_url: img.url ?? null,
      position: img.position!,
    }));

    const { error: imgErr } = await supabaseAdmin!
      .from("vehicle_images")
      .insert(rows);

    if (imgErr) {
      console.error("POST /api/vehicles (vehicle_images) error", imgErr);
      // rollback: borrar vehículo si falló insertar imágenes
      await supabaseAdmin!.from("vehicles").delete().eq("id", vehicle.id);
      return NextResponse.json(
        { message: "No se pudieron guardar las imágenes del vehículo." },
        { status: 500 }
      );
    }

    // Devolver vehículo con imágenes
    const { data: fullVehicle } = await supabaseAdmin!
      .from("vehicles")
      .select(
        `
        id, section_id, title, cuota_desde, moneda, orden,
        imagen_url, imagen_url_2, imagen_url_3,
        vehicle_images:vehicle_images(id, path, public_url, position, created_at)
      `
      )
      .eq("id", vehicle.id)
      .single();

    return NextResponse.json({ vehicle: fullVehicle ?? vehicle });
  }

  // --------------------------
  // Actualizar vehículo (título / cuota / moneda)
  // --------------------------
  if (body.type === "update_vehicle") {
    const { id, title, cuotaDesde, moneda } = body;

    if (!id) {
      return NextResponse.json(
        { message: "id de vehículo requerido." },
        { status: 400 }
      );
    }

    const cleanTitle = (title || "").toString().trim();

    const { data, error } = await supabaseAdmin!
      .from("vehicles")
      .update({
        title: cleanTitle || undefined,
        cuota_desde:
          cuotaDesde !== undefined && cuotaDesde !== null
            ? Number(cuotaDesde)
            : null,
        moneda: moneda || "ARS",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("POST /api/vehicles (update_vehicle) error", error);
      return NextResponse.json(
        { message: "No se pudo actualizar el vehículo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ vehicle: data });
  }

  // --------------------------
  // Eliminar una imagen específica (DB + Storage)
  // body: { type: 'delete_vehicle_image', imageId }
  // --------------------------
  if (body.type === "delete_vehicle_image") {
    const { imageId } = body;

    if (!imageId) {
      return NextResponse.json(
        { message: "imageId requerido." },
        { status: 400 }
      );
    }

    const { data: img, error: gErr } = await supabaseAdmin!
      .from("vehicle_images")
      .select("id, vehicle_id, path")
      .eq("id", imageId)
      .single();

    if (gErr || !img) {
      return NextResponse.json(
        { message: "Imagen no encontrada." },
        { status: 404 }
      );
    }

    // borrar storage (no bloquea si falla; loguea)
    await removeStoragePaths([img.path]);

    const { error: dErr } = await supabaseAdmin!
      .from("vehicle_images")
      .delete()
      .eq("id", imageId);

    if (dErr) {
      console.error("delete_vehicle_image DB error:", dErr);
      return NextResponse.json(
        { message: "No se pudo eliminar la imagen." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  // --------------------------
  // Eliminar vehículo (profesional: borra imágenes en storage)
  // --------------------------
  if (body.type === "delete_vehicle") {
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "id de vehículo requerido." },
        { status: 400 }
      );
    }

    // 1) Paths a borrar
    const { data: imgs, error: iErr } = await supabaseAdmin!
      .from("vehicle_images")
      .select("path")
      .eq("vehicle_id", id);

    if (!iErr) {
      const paths = (imgs ?? []).map((x: any) => x.path).filter(Boolean);
      await removeStoragePaths(paths);
    } else {
      console.error("delete_vehicle fetch images error:", iErr);
    }

    // 2) Borrar vehículo (FK cascade elimina vehicle_images)
    const { error } = await supabaseAdmin!.from("vehicles").delete().eq("id", id);

    if (error) {
      console.error("POST /api/vehicles (delete_vehicle) error", error);
      return NextResponse.json(
        { message: "No se pudo eliminar el vehículo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  // --------------------------
  // Toggle visible / no visible de una sección
  // --------------------------
  if (
    body.type === "toggle_section_visibility" ||
    body.type === "toggle-section"
  ) {
    const sectionId = body.sectionId ?? body.id;
    const { visible } = body;

    if (!sectionId) {
      return NextResponse.json(
        { message: "sectionId requerido." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin!
      .from("vehicle_sections")
      .update({ visible })
      .eq("id", sectionId)
      .select()
      .single();

    if (error) {
      console.error("POST /api/vehicles (toggle) error", error);
      return NextResponse.json(
        { message: "No se pudo actualizar la sección." },
        { status: 500 }
      );
    }

    return NextResponse.json({ section: data });
  }

  return NextResponse.json({ message: "Tipo no soportado." }, { status: 400 });
}
