import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente básico usando la anon key (RLS debe permitir inserts en landing_events)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const eventType =
      body.type || body.eventType || body.event_type || "visit";

    const { error } = await supabase
      .from("landing_events")
      .insert({ event_type: eventType });

    if (error) {
      console.error("[/api/events] Error insert landing_events:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/events] Error inesperado:", err);
    return NextResponse.json(
      { ok: false, error: "Error en /api/events" },
      { status: 500 }
    );
  }
}
