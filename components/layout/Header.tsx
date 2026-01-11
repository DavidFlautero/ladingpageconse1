"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#faf8f2]/95 backdrop-blur border-b border-slate-200/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* LOGO / MARCA */}
        <Link href="#hero" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-600 to-teal-500 flex items-center justify-center shadow-md">
            <span className="text-white text-[11px] font-semibold">0km</span>
          </div>
          <span className="text-[13px] font-semibold text-slate-900">
            Plan Nacional tu 0km
          </span>
        </Link>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-3">
          {/* LINK LOGIN */}
          <Link
            href="/login"
            className="text-[13px] font-medium text-slate-600 hover:text-slate-900 underline-offset-4 hover:underline"
          >
            Ingresar
          </Link>

          {/* CTA PRINCIPAL */}
          <a
            href="#form"
            className="rounded-full bg-sky-700 px-5 py-2 text-[13px] font-medium text-white shadow-lg hover:bg-sky-600 transition"
          >
            Enviar consulta
          </a>
        </div>
      </div>
    </header>
  );
}
