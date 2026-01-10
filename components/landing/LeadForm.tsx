"use client";

import { useState } from "react";

const ENTREGA_OPCIONES = [
  "A definir con el asesor",
  "3 meses",
  "6 meses",
  "8 meses",
  "12 meses",
  "18 meses",
  "24 meses",
];

const TIPO_PLAN_OPCIONES = [
  "Plan de ahorro (cuotas)",
  "0km adjudicado / entrega rápida",
  "Usado + plan (llave por llave)",
];

export default function LeadForm() {
  const [tipoPlan, setTipoPlan] = useState(TIPO_PLAN_OPCIONES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [entrega, setEntrega] = useState(ENTREGA_OPCIONES[0]);
  const [tieneUsado, setTieneUsado] = useState<"si" | "no" | "">("");
  const [autoUsado, setAutoUsado] = useState("");
  const [comentario, setComentario] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) {
      setStatus("error");
      setMessage("El WhatsApp es obligatorio para poder contactarte.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const ciudadCompuesta =
      provincia || localidad
        ? [provincia, localidad].filter(Boolean).join(" - ")
        : null;

    const partesNotas: string[] = [];

    partesNotas.push(`Tipo de plan: ${tipoPlan}`);
    partesNotas.push(`Entrega pactada deseada: ${entrega}`);

    if (tieneUsado) {
      partesNotas.push(`¿Tiene auto usado?: ${tieneUsado === "si" ? "Sí" : "No"}`);
    }

    if (autoUsado.trim()) {
      partesNotas.push(`Detalle auto usado: ${autoUsado.trim()}`);
    }

    if (comentario.trim()) {
      partesNotas.push(`Comentarios adicionales: ${comentario.trim()}`);
    }

    const notes = partesNotas.join(" | ");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          city: ciudadCompuesta,
          budget: `Entrega pactada: ${entrega}`,
          notes,
          source: "landing",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error || "No se pudo enviar el formulario.");
        return;
      }

      setStatus("ok");
      setMessage(
        "Perfecto, recibimos tu consulta. Un asesor te va a escribir por WhatsApp."
      );

      setTipoPlan(TIPO_PLAN_OPCIONES[0]);
      setName("");
      setPhone("");
      setProvincia("");
      setLocalidad("");
      setEntrega(ENTREGA_OPCIONES[0]);
      setTieneUsado("");
      setAutoUsado("");
      setComentario("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Hubo un problema al enviar el formulario.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="md:col-span-2 space-y-1">
        <label className="text-xs text-gray-300">¿Qué tipo de plan te interesa?</label>
        <select
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
          value={tipoPlan}
          onChange={(e) => setTipoPlan(e.target.value)}
        >
          {TIPO_PLAN_OPCIONES.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-300">Nombre y apellido</label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
          placeholder="Ej: Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-300">
          WhatsApp <span className="text-red-400">*</span>
        </label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
          placeholder="Ej: +54 11 0000 0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-300">Provincia</label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
          placeholder="Ej: Buenos Aires"
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-300">Localidad / Ciudad</label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
          placeholder="Ej: Avellaneda"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-300">
          Entrega pactada que te gustaría
        </label>
        <select
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
          value={entrega}
          onChange={(e) => setEntrega(e.target.value)}
        >
          {ENTREGA_OPCIONES.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
        <p className="text-[11px] text-gray-500">
          La entrega real se define según tu scoring y el cupo disponible (3, 6,
          8, 12 meses, etc.).
        </p>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-300">
          ¿Tenés auto usado para entregar?
        </label>
        <div className="flex gap-3 text-xs text-gray-300">
          <button
            type="button"
            onClick={() => setTieneUsado("si")}
            className={`px-3 py-1.5 rounded-full border ${
              tieneUsado === "si"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                : "border-white/15 bg-white/5 hover:bg-white/10"
            }`}
          >
            Sí, tengo usado
          </button>
          <button
            type="button"
            onClick={() => setTieneUsado("no")}
            className={`px-3 py-1.5 rounded-full border ${
              tieneUsado === "no"
                ? "border-gray-500 bg-gray-500/10 text-gray-200"
                : "border-white/15 bg-white/5 hover:bg-white/10"
            }`}
          >
            No tengo usado
          </button>
        </div>
      </div>

      <div className="md:col-span-2 space-y-1">
        <label className="text-xs text-gray-300">
          Si tenés auto usado, contanos cuál (marca, modelo, año, estado)
        </label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
          placeholder="Ej: Fiat Cronos 2020, 60.000km, titular al día"
          value={autoUsado}
          onChange={(e) => setAutoUsado(e.target.value)}
        />
      </div>

      <div className="md:col-span-2 space-y-1">
        <label className="text-xs text-gray-300">Comentarios adicionales</label>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition min-h-[90px]"
          placeholder="Ej: Marca preferida, uso que le vas a dar, si ya estás en algún plan, etc."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="md:col-span-2 mt-1 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-sm font-medium transition"
      >
        {status === "loading" ? "Enviando..." : "Quiero que me asesoren"}
      </button>

      {status !== "idle" && (
        <p
          className={`md:col-span-2 text-[12px] mt-1 ${
            status === "ok" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
