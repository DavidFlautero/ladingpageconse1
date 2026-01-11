"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/config/whatsapp");
        if (!res.ok) return;
        const data = await res.json();
        setWhatsappNumber(data.whatsappNumber || "");
      } catch (e) {
        console.error(e);
      }
    };
    fetchConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/config/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber }),
      });
      if (!res.ok) throw new Error("Error guardando configuración");
      setMessage("Número de WhatsApp actualizado correctamente.");
    } catch (err: any) {
      setMessage(err.message || "Error al guardar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Configuración general
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Número de WhatsApp para la landing
          </label>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="Ej: 5491112345678"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <p className="mt-1 text-xs text-slate-400">
            Usar solo números, con código de país. Ejemplo: 54 (AR) + 9 + número.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>

        {message && (
          <p className="text-xs mt-2 text-slate-300">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
