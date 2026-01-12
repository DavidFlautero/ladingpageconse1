import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, leadId, vehicleId } = body || {};

    if (!type) {
      return NextResponse.json(
        { error: "Tipo de evento requerido." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("events").insert({
      type,
      lead_id: leadId ?? null,
      vehicle_id: vehicleId ?? null,
    });

    if (error) {
      console.error("Error insertando event:", error);
      return NextResponse.json(
        { error: "No se pudo registrar el evento." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Error en /api/events:", err);
    return NextResponse.json(
      { error: "Error interno registrando el evento." },
      { status: 500 }
    );
  }
}
