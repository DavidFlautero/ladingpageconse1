import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("ADMIN_EMAIL o ADMIN_PASSWORD no definidos en .env");
    return NextResponse.json(
      { ok: false, message: "Config de admin incompleta." },
      { status: 500 }
    );
  }

  if (email === adminEmail && password === adminPassword) {
    const res = NextResponse.json({ ok: true });

    res.cookies.set(ADMIN_COOKIE, "admin-ok", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 horas
    });

    return res;
  }

  return NextResponse.json(
    { ok: false, message: "Credenciales inválidas." },
    { status: 401 }
  );
}
