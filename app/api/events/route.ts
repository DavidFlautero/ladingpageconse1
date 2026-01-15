import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { type } = body as { type?: string };

    if (!type) {
      return NextResponse.json(
        { error: "type es obligatorio" },
        { status: 400 }
      );
    }

    // Guardamos SIEMPRE el evento en landing_events
    const { error } = await supabaseAdmin
      .from("landing_events")
      .insert({ event_type: type });

    if (error) {
      console.error("[/api/events] Error insertando en landing_events:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/events] Error inesperado:", err);
    return NextResponse.json(
      { error: "Error inesperado" },
      { status: 500 }
    );
  }
}
