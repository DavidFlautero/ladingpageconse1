import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    // ✅ Evita que el build/deploy explote si faltan env vars (supabaseAdmin = null)
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error:
            "Supabase envs faltantes. Configurá NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (o NEXT_PUBLIC_SUPABASE_ANON_KEY).",
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo." },
        { status: 400 }
      );
    }

    // Validaciones básicas (profesional)
    const maxMb = 8;
    const maxBytes = maxMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: `El archivo supera el máximo permitido (${maxMb}MB).` },
        { status: 400 }
      );
    }

    // Opcional: limitar tipos
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (file.type && !allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato no soportado. Usá JPG, PNG o WEBP." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitizar nombre
    const safeName = (file.name || "image")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.\-_]/g, "");

    // Bucket profesional para vehículos
    const path = `autos/${Date.now()}-${safeName}`;

    const { data, error } = await supabaseAdmin.storage
      .from("vehicle-images")
      .upload(path, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      console.error("Error subiendo imagen (vehicle-images):", error);
      return NextResponse.json(
        { error: "Error al subir la imagen." },
        { status: 500 }
      );
    }

    const publicUrl = supabaseAdmin.storage
      .from("vehicle-images")
      .getPublicUrl(data.path).data.publicUrl;

    return NextResponse.json({ url: publicUrl, path: data.path });
  } catch (e: any) {
    console.error("Excepción en /api/upload-vehicle-image:", e);
    return NextResponse.json(
      { error: "Error inesperado al subir la imagen." },
      { status: 500 }
    );
  }
}
