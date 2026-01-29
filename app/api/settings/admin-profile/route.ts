import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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
    .from("admin_profile")
    .select("id, nombre, email, telefono, avatar_url")
    .order("id", { ascending: true })
    .limit(1);

  if (error) {
    console.error("GET admin_profile error:", error);
    return NextResponse.json({ profile: null }, { status: 500 });
  }

  const profile = data && data.length > 0 ? data[0] : null;
  return NextResponse.json({ profile });
}

export async function PUT(req: Request) {
  const guard = supabaseGuard();
  if (guard) return guard;

  const body = await req.json();

  const payload = {
    id: 1,
    nombre: body.nombre || null,
    email: body.email || null,
    telefono: body.telefono || null,
    avatar_url: body.avatar_url || null,
  };

  const { data, error } = await supabaseAdmin!
    .from("admin_profile")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("PUT admin_profile error:", error);
    return NextResponse.json(
      { message: "No se pudo guardar el perfil" },
      { status: 500 }
    );
  }

  return NextResponse.json({ profile: data });
}
