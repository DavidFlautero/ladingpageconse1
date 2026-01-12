import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("vehicle_sections")
    .select(
      "id,title,slug,order_index,vehicles:vehicles(id,title,cuota_desde,moneda,imagen_url,orden)"
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
  const supabase = createClient();
  const body = await req.json();

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
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const { data, error } = await supabase
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
    const { sectionId, title, cuotaDesde, moneda, imagenUrl } = body;

    if (!sectionId || !title || !String(title).trim()) {
      return NextResponse.json(
        { message: "Faltan datos para crear el vehículo." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          section_id: sectionId,
          title: String(title).trim(),
          cuota_desde:
            cuotaDesde !== undefined && cuotaDesde !== null
              ? Number(cuotaDesde)
              : null,
          moneda: moneda || "ARS",
          imagen_url: imagenUrl || null,
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

  return NextResponse.json({ message: "Tipo no soportado." }, { status: 400 });
}
