"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  // Abre el modal automáticamente unos segundos después de cargar
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.45)]">
        {/* Botón cerrar */}
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="px-6 pt-6 pb-4">
          <div className="mb-4 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 mb-1">
              Consulta rápida
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Enviá tu consulta
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Un asesor oficial va a revisar tu información y te contactará en
              el horario que elijas. Sin costo inicial ni compromiso de compra.
            </p>
          </div>

          {/* Formulario */}
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
