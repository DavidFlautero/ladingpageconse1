"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const alreadyShown = window.localStorage.getItem("pn0km_entry_modal_v3");
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
      window.localStorage.setItem("pn0km_entry_modal_v3", "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 backdrop-blur-sm">
      <div className="bg-[#fdfaf5] rounded-3xl shadow-[0_24px_70px_rgba(15,23,42,0.55)] max-w-xl w-full mx-4 border border-slate-200 relative">
        <button
          onClick={close}
          className="absolute top-3 right-3 h-7 w-7 rounded-full border border-slate-200 bg-white text-slate-500 text-xs flex items-center justify-center hover:bg-slate-50"
        >
          ✕
        </button>

        <div className="bg-sky-500 text-white text-center text-[13px] font-medium py-2 px-3 rounded-t-3xl">
          Enviá tu consulta y recibí opciones de planes 0km en cuotas.
        </div>

        <div className="p-4 md:p-5">
          <p className="text-[13px] text-slate-600 mb-3 text-center">
            Completá el formulario y un asesor oficial se va a comunicar con vos a la
            brevedad. La consulta no tiene costo ni compromiso de compra.
          </p>

          <div className="border border-slate-200 rounded-2xl bg-white p-3 md:p-4">
            <LeadForm />
          </div>

          <p className="mt-2 text-[10px] text-slate-500 text-center">
            Esta plataforma es privada y no pertenece al Gobierno ni a organismos
            oficiales. Tus datos se usan sólo para responder esta consulta.
          </p>
        </div>
      </div>
    </div>
  );
}
