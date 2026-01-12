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
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.45)]">
        {/* Botón cerrar */}
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="px-5 pt-5 pb-4">
          <div className="mb-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-600 mb-1">
              Cupos limitados
            </p>
            <h2 className="text-base font-semibold text-slate-900">
              Reservá tu cupo de asesoría 0km
            </h2>
            <p className="mt-1 text-[11px] text-slate-600">
              Con sólo completar el formulario vas a recibir opciones vigentes,
              bonificaciones y condiciones para llegar a tu 0km en cuotas.
              Un asesor oficial te va a contactar por WhatsApp o teléfono
              en el horario que elijas. Sin costo inicial ni compromiso de compra.
            </p>
          </div>

          <LeadForm />
        </div>
      </div>
    </div>
  );
}
