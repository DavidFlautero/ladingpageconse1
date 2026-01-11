"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const alreadyShown = window.localStorage.getItem("pn0km_entry_modal_v4");
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
      window.localStorage.setItem("pn0km_entry_modal_v4", "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 backdrop-blur-sm">
      <div className="max-w-lg w-full mx-4 max-h-[90vh] rounded-3xl border border-slate-200 bg-[#fdfaf5] shadow-[0_24px_70px_rgba(15,23,42,0.55)] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between bg-sky-500 text-white px-4 py-2.5">
          <p className="text-[13px] font-semibold">
            Enviá tu consulta para planes 0km en cuotas
          </p>
          <button
            onClick={close}
            className="h-7 w-7 rounded-full border border-sky-300 bg-sky-600/70 text-xs flex items-center justify-center hover:bg-sky-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4 md:p-5 overflow-y-auto">
          <p className="text-[12px] text-slate-600 mb-3 text-center">
            Completás el formulario y un asesor oficial se comunica con vos según el
            horario elegido. La consulta no tiene costo ni compromiso de compra.
          </p>

          <div className="border border-slate-200 rounded-2xl bg-white p-3 md:p-4">
            <LeadForm />
          </div>

          <p className="mt-2 text-[10px] text-slate-500 text-center">
            Esta plataforma es privada y no pertenece al Gobierno ni a organismos
            oficiales. Usamos tus datos sólo para responder esta consulta.
          </p>
        </div>
      </div>
    </div>
  );
}
