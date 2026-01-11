"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

export default function EntryModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-xl relative">

        {/* BOTÓN CERRAR */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold text-slate-900 mb-2 text-center">
          Enviá tu consulta
        </h3>

        <p className="text-center text-slate-600 text-sm mb-6">
          Un asesor oficial revisará tu información y te contactará en breve.
        </p>

        <LeadForm />
      </div>
    </div>
  );
}
