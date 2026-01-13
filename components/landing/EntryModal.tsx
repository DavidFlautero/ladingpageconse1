"use client";

import { useEffect, useState } from "react";
import LeadForm from "@/components/landing/LeadForm";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  // Mostrar solo una vez por sesión
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      {/* CARD centrada, con margen y scroll interno en mobile */}
      <div className="relative w-full max-w-md mx-auto rounded-3xl bg-white text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* BOTÓN CERRAR */}
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
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-500 mb-2 text-center">
            Consulta de acceso a tu 0km
          </p>
          <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-2 text-center">
            Completá una versión rápida del formulario para evaluar si podés acceder al 0km en cuotas.
          </h2>
          <p className="text-[12px] text-slate-600 mb-4 text-center">
            Los datos se usan igual que en el formulario principal. Si preferís verlo en grande,
            podés cerrar este cuadro y bajar hasta el formulario de la página.
          </p>

          {/* FORMULARIO REAL, PERO EN UN LAYOUT MÁS COMPACTO */}
          <div className="border border-slate-200 rounded-2xl bg-slate-50 px-3 py-3">
            <div className="text-[11px] text-slate-500 mb-2 text-center">
              Versión compacta para móvil
            </div>
            <div className="space-y-3">
              {/* Reutilizamos el LeadForm de la landing */}
              <LeadForm />
            </div>
          </div>

          {/* LINK AL FORM PRINCIPAL, POR SI QUIERE SALIR */}
          <button
            type="button"
            onClick={() => {
              close();
              if (typeof window !== "undefined") {
                const section = document.querySelector("#form");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="mt-4 w-full rounded-full border border-slate-300 bg-white text-xs font-medium text-slate-700 py-2"
          >
            Ver formulario en pantalla completa
          </button>
        </div>
      </div>
    </div>
  );
}
