"use client";

import { useEffect, useState } from "react";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  // Abrir solo una vez por sesión
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.sessionStorage.getItem("entry-modal-dismissed");
    if (!dismissed) {
      setOpen(true);
    }
  }, []);

  function close() {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("entry-modal-dismissed", "1");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3">
      {/* CARD: max alto pantalla, con scroll interno */}
      <div className="relative w-full max-w-md rounded-3xl bg-white text-slate-900 shadow-2xl max-h-[calc(100vh-3rem)] overflow-y-auto">
        {/* BOTÓN CERRAR SIEMPRE VISIBLE */}
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-slate-700 hover:bg-black/20"
        >
          <span className="sr-only">Cerrar</span>
          ✕
        </button>

        {/* CONTENIDO */}
        <div className="px-5 pt-10 pb-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-500 mb-2">
            Consulta de acceso a tu 0km
          </p>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Antes de seguir, completá tu consulta para evaluar si podés acceder al 0km en cuotas.
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Es un formulario único: con estos datos un asesor oficial revisa tu perfil y después te
            contacta por WhatsApp o teléfono con las alternativas vigentes.
          </p>

          {/* CTA PRINCIPAL: ir al formulario */}
          <div className="space-y-2">
            <a
              href="#form"
              onClick={close}
              className="block w-full rounded-full bg-sky-600 hover:bg-sky-500 text-sm font-semibold text-white text-center py-2.5 shadow-[0_14px_30px_rgba(37,99,235,0.55)]"
            >
              Ir al formulario principal
            </a>

            <p className="text-[11px] text-slate-500 text-center">
              Es gratis, no compromete compra y no impacta tu scoring. Podés cerrarlo si preferís
              solo mirar la información de la página.
            </p>

            {/* OPCIÓN SECUNDARIA: solo cerrar */}
            <button
              type="button"
              onClick={close}
              className="block w-full rounded-full border border-slate-300 bg-white text-xs font-medium text-slate-700 py-2 mt-2"
            >
              Cerrar y seguir navegando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
