"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const alreadyShown = window.localStorage.getItem("pn0km_entry_modal_v5");
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
      window.localStorage.setItem("pn0km_entry_modal_v5", "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 backdrop-blur-sm">
      <div className="max-w-xl w-full mx-4 max-h-[88vh] rounded-3xl border border-slate-200 bg-[#fdfaf5] shadow-[0_24px_70px_rgba(15,23,42,0.55)] flex flex-col overflow-hidden">
        {/* CINTA SUPERIOR CON COPY FUERTE */}
        <div className="relative bg-gradient-to-r from-teal-700 via-sky-700 to-sky-500 px-5 py-3 text-center text-white">
          <p className="text-[13px] font-semibold">
            Con sólo completar el formulario, recibís bonificaciones y toda la
            información para llegar a tu 0km.
          </p>
          <p className="mt-1 text-[11px] text-teal-50/90">
            Un asesor oficial se comunicará a la brevedad según el horario que elijas.
          </p>

          <button
            onClick={close}
            className="absolute right-3 top-2.5 h-7 w-7 rounded-full border border-white/40 bg-white/20 text-xs flex items-center justify-center hover:bg-white/30"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
          <div className="border border-slate-200 rounded-2xl bg-white p-3 md:p-4">
            <LeadForm />
          </div>

          {/* BADGES DE CONFIANZA */}
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] text-slate-600">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                ✓
              </span>
              <span className="font-medium">Sitio seguro</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">
                🛡
              </span>
              <span className="font-medium">Asesores comerciales oficiales</span>
            </div>
          </div>

          <p className="mt-2 text-[10px] text-slate-500 text-center">
            Esta plataforma es privada y no pertenece al Gobierno ni a organismos
            oficiales. Tus datos se usan sólo para responder esta consulta y derivarte a
            concesionarios autorizados.
          </p>
        </div>
      </div>
    </div>
  );
}
