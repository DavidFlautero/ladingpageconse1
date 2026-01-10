"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-0 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-blue-400/60 bg-gradient-to-br from-blue-500/30 via-slate-900 to-black flex items-center justify-center text-[10px] font-semibold tracking-[0.18em] text-blue-100">
            0KM
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-100">
              PLAN NACIONAL TU 0KM
            </p>
            <p className="text-[10px] text-gray-400">
              Plataforma privada de asesoría vehicular
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[11px] text-gray-300">
          <a href="#como-funciona" className="hover:text-white transition">
            Cómo funciona
          </a>
          <a href="#marcas" className="hover:text-white transition">
            Marcas y planes
          </a>
          <a href="#beneficios" className="hover:text-white transition">
            Beneficios
          </a>
          <a href="#preguntas" className="hover:text-white transition">
            Preguntas frecuentes
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#form"
            className="hidden sm:inline-flex text-[11px] px-3 py-1.5 rounded-full border border-blue-500/70 bg-blue-600/80 hover:bg-blue-500 text-white font-medium transition"
          >
            Evaluar mi caso
          </a>
          <Link
            href="/login"
            className="text-[11px] text-gray-400 hover:text-white transition"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </header>
  );
}
