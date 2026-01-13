import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo protegemos las rutas /admin/**
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Dejar pasar siempre /admin/login (pantalla de login)
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Leer cookie de sesión de admin
  const token = req.cookies.get(ADMIN_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
