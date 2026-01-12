import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("vehicle_sections")
    .select(
      "id, title, slug, order_index, visible, vehicles:vehicles(id, title, cuota_desde, moneda, imagen_url, imagen_url_2, imagen_url_3, orden)"
    )
    .order("order_index", { ascending: true })
    .order("orden", { foreignTable: "vehicles", ascending: true });

  if (error) {
    console.error("GET /api/vehicles error", error);
    return NextResponse.json({ sections: [] }, { status: 500 });
  }

  return NextResponse.json({ sections: data ?? [] });
}

export async function POST(req: NextRequest) {
  const body: any = await req.json();

  // Crear sección / marca
  if (body.type === "section") {
    const title = (body.title || "").trim();
    if (!title) {
      return NextResponse.json(
        { message: "El título de la sección es obligatorio." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const { data, error } = await supabaseAdmin
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

  // Crear vehículo
  if (body.type === "vehicle") {
    const {
      sectionId,
      title,
      cuotaDesde,
      moneda,
      imagenUrl,
      imagen1,
      imagen2,
      imagen3,
    } = body;

    const cleanTitle = (title || "").toString().trim();

    if (!sectionId || !cleanTitle) {
      return NextResponse.json(
        { message: "Faltan datos para crear el vehículo." },
        { status: 400 }
      );
    }

    const mainImage = imagenUrl || imagen1 || null;
    const secondImage = imagen2 || null;
    const thirdImage = imagen3 || null;

    if (!mainImage && !secondImage && !thirdImage) {
      return NextResponse.json(
        { message: "Debe haber al menos una imagen." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
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
          imagen_url: mainImage,
          imagen_url_2: secondImage,
          imagen_url_3: thirdImage,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("POST /api/vehicles (vehicle) error", error);
      return NextResponse.json(
        { message: "No se pudo crear el vehículo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ vehicle: data });
  }

  // Actualizar vehículo (título / cuota / moneda)
  if (body.type === "update_vehicle") {
    const { id, title, cuotaDesde, moneda } = body;

    if (!id) {
      return NextResponse.json(
        { message: "id de vehículo requerido." },
        { status: 400 }
      );
    }

    const cleanTitle = (title || "").toString().trim();

    const { data, error } = await supabaseAdmin
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

  // Eliminar vehículo
  if (body.type === "delete_vehicle") {
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "id de vehículo requerido." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("vehicles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("POST /api/vehicles (delete_vehicle) error", error);
      return NextResponse.json(
        { message: "No se pudo eliminar el vehículo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  // Toggle visible / no visible de una sección
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

    const { data, error } = await supabaseAdmin
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
