import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data, error } = await supabase
    .from("config")
    .select("value")
    .eq("key", "whatsapp_number")
    .maybeSingle();

  if (error) {
    console.error(error);
    return NextResponse.json({ whatsappNumber: null }, { status: 500 });
  }

  return NextResponse.json({
    whatsappNumber: data?.value ?? null,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const whatsappNumber = (body.whatsappNumber || "").toString();

  const { error } = await supabase
    .from("config")
    .upsert({ key: "whatsapp_number", value: whatsappNumber });

  if (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
