"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const alreadyShown = window.localStorage.getItem("pn0km_entry_modal_v2");
      if (!alreadyShown) {
        setTimeout(() => setOpen(true), 600);
      }
    } catch {
      setTimeout(() => setOpen(true), 600);
    }
  }, []);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem("pn0km_entry_modal_v2", "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 backdrop-blur-sm">
      <div className="bg-[#fdfaf5] rounded-3xl shadow-[0_28px_80px_rgba(15,23,42,0.55)] max-w-3xl w-full mx-4 border border-slate-200 relative overflow-hidden">
        <button
          onClick={close}
          className="absolute top-3 right-3 h-7 w-7 rounded-full border border-slate-200 bg-white text-slate-500 text-xs flex items-center justify-center hover:bg-slate-50 z-10"
        >
          ✕
        </button>

        {/* Barra superior interna tipo competencia */}
        <div className="bg-sky-500 text-white text-center text-[13px] font-medium py-2 px-3">
          ¡Con sólo completar el formulario, recibís detalles de cuotas y beneficios para tu 0km!
        </div>

        <div className="px-5 py-4">
          <div className="text-center mb-3">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Enviá tu consulta para acceder a planes 0km en cuotas.
            </h2>
            <p className="text-[13px] text-slate-600 mt-1">
              Un asesor oficial se va a comunicar con vos a la brevedad, según el horario de
              contacto que elijas. La consulta no tiene costo ni compromiso de compra.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-white p-4 md:p-5">
            <LeadForm />
          </div>

          <p className="mt-2 text-[10px] text-slate-500 text-center">
            Al enviar tu consulta autorizás a que un asesor se comunique con vos por WhatsApp o
            teléfono. Esta plataforma es privada y no pertenece al Gobierno ni a organismos
            oficiales.
          </p>
        </div>
      </div>
    </div>
  );
}