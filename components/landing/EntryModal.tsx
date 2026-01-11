"use client";

import { useEffect, useState } from "react";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const alreadyShown = window.localStorage.getItem("pn0km_entry_modal");
      if (!alreadyShown) {
        setTimeout(() => setOpen(true), 800);
      }
    } catch {
      setTimeout(() => setOpen(true), 800);
    }
  }, []);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem("pn0km_entry_modal", "1");
    } catch {}
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    close();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#fdfaf5] rounded-3xl shadow-[0_24px_70px_rgba(15,23,42,0.35)] max-w-md w-full mx-4 p-5 relative border border-slate-200">
        <button
          onClick={close}
          className="absolute top-3 right-3 h-7 w-7 rounded-full border border-slate-200 bg-white text-slate-500 text-xs flex items-center justify-center hover:bg-slate-50"
        >
          ✕
        </button>
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber-700">
            ¡Consulte hoy!
          </p>
          <h2 className="text-lg font-semibold text-slate-900 leading-snug">
            Cupos limitados de evaluación sin costo para acceder a tu 0km.
          </h2>
          <p className="text-[13px] text-slate-700">
            Los cupos se actualizan cada 24 hs y dependen del mes y del cupo disponible en cada
            plan. Dejá tus datos y un asesor autorizado te contacta sin compromiso para explicarte
            opciones según tu scoring.
          </p>
          <ul className="text-[12px] text-slate-700 space-y-1">
            <li>• Evaluación sin costo.</li>
            <li>• No afecta tu historial crediticio.</li>
            <li>• No es un plan del Gobierno, es una plataforma privada de asesoría.</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={() => scrollToId("form")}
              className="flex-1 px-4 py-2.5 rounded-full bg-sky-700 text-white text-sm font-medium hover:bg-sky-600"
            >
              Evaluar mi caso ahora
            </button>
            <button
              onClick={() => scrollToId("como-funciona")}
              className="flex-1 px-4 py-2.5 rounded-full border border-slate-300 bg-white text-sm text-slate-800 hover:bg-slate-50"
            >
              Ver cómo funciona
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
