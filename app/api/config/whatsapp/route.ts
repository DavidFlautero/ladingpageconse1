import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Usamos la misma tabla/columnas que en lib/config.ts
const TABLE = "config";
const KEY_COLUMN = "key";
const VALUE_COLUMN = "value";
const KEY = "whatsapp_number";

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

export async function GET() {
  const guard = supabaseGuard();
  if (guard) return guard;

  const { data, error } = await supabaseAdmin!
    .from(TABLE)
    .select(`${VALUE_COLUMN}`)
    .eq(KEY_COLUMN, KEY)
    .maybeSingle();

  if (error) {
    console.error("GET /api/config/whatsapp error", error);
    return NextResponse.json({ number: null }, { status: 500 });
  }

  const raw = data ? (data as any)[VALUE_COLUMN] as string | null : null;
  return NextResponse.json({ number: raw ?? null });
}

export async function POST(req: NextRequest) {
  const guard = supabaseGuard();
  if (guard) return guard;

  const body = await req.json();
  const rawNumber: string = (body.number ?? "").toString().trim();

  const { error } = await supabaseAdmin!
    .from(TABLE)
    .upsert(
      {
        [KEY_COLUMN]: KEY,
        [VALUE_COLUMN]: rawNumber,
      },
      { onConflict: KEY_COLUMN }
    );

  if (error) {
    console.error("POST /api/config/whatsapp error", error);
    return NextResponse.json(
      { message: "No se pudo guardar el número de WhatsApp." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, number: rawNumber });
}
