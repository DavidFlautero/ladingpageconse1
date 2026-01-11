"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      brand: formData.get("brand")?.toString().trim() || "",
      model: formData.get("model")?.toString().trim() || "",
      fullName: formData.get("fullName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      areaCode: formData.get("areaCode")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      location: formData.get("location")?.toString().trim() || "",
      contactFrom: formData.get("contactFrom")?.toString().trim() || "",
      contactTo: formData.get("contactTo")?.toString().trim() || "",
      channel: formData.get("channel")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "No se pudo registrar la consulta.");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err?.message || "Ocurrió un error, intentá nuevamente.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-sm"
    >
      {/* Marca / Modelo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Marca
          </label>
          <input
            name="brand"
            placeholder="Ej: Volkswagen"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Modelo
          </label>
          <input
            name="model"
            placeholder="Ej: Polo, T-Cross, Nivus..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
      </div>

      {/* Nombre / Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Nombre y apellido *
          </label>
          <input
            name="fullName"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
      </div>

      {/* Teléfono */}
      <div className="grid grid-cols-[0.8fr,1.6fr] md:grid-cols-[0.6fr,1.4fr] gap-3">
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Cód. de área *
          </label>
          <input
            name="areaCode"
            required
            placeholder="Ej: 011"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Teléfono / WhatsApp *
          </label>
          <input
            name="phone"
            required
            placeholder="Ej: 1234 5678"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
      </div>

      {/* Provincia / Localidad */}
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-slate-700">
          Provincia / localidad *
        </label>
        <input
          name="location"
          required
          placeholder="Ej: CABA, GBA Oeste, Córdoba capital..."
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
        />
      </div>

      {/* Horario de contacto + Canal */}
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr,1.1fr,1.1fr] gap-3">
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Horario desde
          </label>
          <select
            name="contactFrom"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            defaultValue=""
          >
            <option value="">Seleccionar</option>
            <option value="09:00">09 hs</option>
            <option value="12:00">12 hs</option>
            <option value="15:00">15 hs</option>
            <option value="18:00">18 hs</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Horario hasta
          </label>
          <select
            name="contactTo"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            defaultValue=""
          >
            <option value="">Seleccionar</option>
            <option value="13:00">13 hs</option>
            <option value="17:00">17 hs</option>
            <option value="20:00">20 hs</option>
            <option value="22:00">22 hs</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-slate-700">
            Preferís que te contacten por
          </label>
          <select
            name="channel"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            defaultValue="whatsapp"
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="telefono">Teléfono</option>
            <option value="cualquiera">Cualquiera</option>
          </select>
        </div>
      </div>

      {/* Consulta */}
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-slate-700">
          Tu consulta
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Contanos brevemente qué estás buscando (0km, financiación, entrega estimada, etc.)."
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 resize-none"
        />
      </div>

      {/* Botón + estados */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-sky-700 px-7 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,118,110,0.35)] hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed transition"
        >
          {status === "loading" ? "Enviando consulta..." : "Enviar consulta"}
        </button>

        {status === "success" && (
          <p className="text-[11px] text-emerald-600">
            ¡Gracias! Registramos tu consulta, un asesor te va a contactar a la brevedad.
          </p>
        )}
        {status === "error" && (
          <p className="text-[11px] text-red-600">
            {errorMessage || "Ocurrió un error, intentá de nuevo en unos minutos."}
          </p>
        )}
      </div>
    </form>
  );
}
