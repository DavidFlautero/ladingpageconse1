import { NextResponse } from "next/server";
import { supabase } from "@/lib/config";

// Si estás usando Edge y te da problemas, descomentá esto:
// export const runtime = "nodejs";

export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado en el entorno (env vars faltantes)." },
      { status: 500 }
    );
  }

  try {
    // EJEMPLO: ajustá esto a lo que realmente hacías
    const { data, error } = await supabase
      .from("config_whatsapp")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error al leer config de WhatsApp:", error);
      return NextResponse.json(
        { error: "No se pudo obtener la configuración de WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json({ config: data ?? null });
  } catch (err) {
    console.error("Error inesperado en /api/config/whatsapp:", err);
    return NextResponse.json(
      { error: "Error interno en la API de configuración de WhatsApp." },
      { status: 500 }
    );
  }
}
