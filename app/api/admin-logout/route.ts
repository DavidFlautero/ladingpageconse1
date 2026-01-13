import { NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // Borramos la cookie
  res.cookies.set(ADMIN_COOKIE, "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}
