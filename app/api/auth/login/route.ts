import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Faltan credenciales." },
        { status: 400 }
      );
    }

    const email = String(body.email).trim();
    const password = String(body.password);

    // Validamos contra Supabase Auth usando el cliente de servidor
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.session) {
      return NextResponse.json(
        {
          error:
            error?.message ||
            "Credenciales inválidas o sesión no generada.",
        },
        { status: 401 }
      );
    }

    // Si quisieras una cookie propia, acá la podrías setear.
    // Para MVP solo devolvemos OK.
    return NextResponse.json(
      {
        ok: true,
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error en /api/auth/login:", err);
    return NextResponse.json(
      { error: "Error interno en el login." },
      { status: 500 }
    );
  }
}
