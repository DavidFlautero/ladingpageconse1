"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#fdfaf5]/90 backdrop-blur border-b border-slate-200/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Marca */}
        <Link href="#hero" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 via-sky-500 to-teal-500 shadow-[0_8px_20px_rgba(37,99,235,0.35)]">
            <span className="text-[11px] font-semibold text-white">0km</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-slate-900">
              Plan Nacional tu 0km
            </span>
            <span className="text-[11px] text-slate-500">
              Plataforma privada de asesoría vehicular
            </span>
          </div>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden items-center gap-6 text-[13px] text-slate-700 md:flex">
          <a href="#hero" className="hover:text-sky-700 transition">
            Inicio
          </a>
          <a href="#marcas" className="hover:text-sky-700 transition">
            Autos disponibles
          </a>
          <a href="#form" className="hover:text-sky-700 transition">
            Consulta
          </a>

          <a
            href="#form"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-sky-700 px-4 py-2 text-[12px] font-medium text-white shadow-[0_10px_28px_rgba(15,118,110,0.35)] hover:bg-sky-600 transition"
          >
            Enviar consulta
          </a>
        </nav>

        {/* Botón simple en mobile */}
        <a
          href="#form"
          className="inline-flex items-center justify-center rounded-full bg-sky-700 px-4 py-2 text-[12px] font-medium text-white shadow-[0_10px_24px_rgba(15,118,110,0.35)] hover:bg-sky-600 transition md:hidden"
        >
          Enviar consulta
        </a>
      </div>
    </header>
  );
}
