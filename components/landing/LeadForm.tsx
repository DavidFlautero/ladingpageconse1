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
  "Usado + 0km (llave por llave)",
];

const HORARIO_OPCIONES = [
  "Mañana (9 a 13 hs)",
  "Tarde (13 a 18 hs)",
  "Noche (18 a 21 hs)",
];

const PREFERENCIA_CONTACTO = [
  "WhatsApp",
  "Llamado telefónico",
  "Indistinto",
];

export default function LeadForm() {
  const [tipoPlan, setTipoPlan] = useState(TIPO_PLAN_OPCIONES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [entrega, setEntrega] = useState(ENTREGA_OPCIONES[0]);
  const [horario, setHorario] = useState<string | null>(HORARIO_OPCIONES[0]);
  const [preferencia, setPreferencia] = useState<string | null>(
    PREFERENCIA_CONTACTO[0]
  );
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

    if (horario) {
      partesNotas.push(`Horario preferido de contacto: ${horario}`);
    }

    if (preferencia) {
      partesNotas.push(`Medio de contacto preferido: ${preferencia}`);
    }

    if (tieneUsado) {
      partesNotas.push(
        `¿Tiene auto usado?: ${tieneUsado === "si" ? "Sí" : "No"}`
      );
    }

    if (autoUsado.trim()) {
      partesNotas.push(`Detalle auto usado: ${autoUsado.trim()}`);
    }

    if (comentario.trim()) {
      partesNotas.push(`Comentarios adicionales: ${comentario.trim()}`);
    }

    if (email.trim()) {
      partesNotas.push(`Email: ${email.trim()}`);
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
        "Perfecto, recibimos tu consulta. Un asesor te va a escribir según el horario que indicaste."
      );

      setTipoPlan(TIPO_PLAN_OPCIONES[0]);
      setName("");
      setPhone("");
      setEmail("");
      setProvincia("");
      setLocalidad("");
      setEntrega(ENTREGA_OPCIONES[0]);
      setHorario(HORARIO_OPCIONES[0]);
      setPreferencia(PREFERENCIA_CONTACTO[0]);
      setTieneUsado("");
      setAutoUsado("");
      setComentario("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Hubo un problema al enviar el formulario.");
    }
  }

  const inputClass =
    "w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 bg-white transition";

  const selectClass =
    "w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 bg-white transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Bloque: Qué estás buscando */}
      <div className="md:col-span-2 space-y-1">
        <label className="text-xs text-slate-700">
          ¿Qué tipo de plan te interesa?
        </label>
        <select
          className={selectClass}
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

      {/* Tus datos */}
      <div className="space-y-1">
        <label className="text-xs text-slate-700">Nombre y apellido</label>
        <input
          className={inputClass}
          placeholder="Ej: Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-700">
          WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
          className={inputClass}
          placeholder="Ej: +54 11 0000 0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-700">Email (opcional)</label>
        <input
          type="email"
          className={inputClass}
          placeholder="Ej: tucorreo@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Dónde vivís */}
      <div className="space-y-1">
        <label className="text-xs text-slate-700">Provincia</label>
        <input
          className={inputClass}
          placeholder="Ej: Buenos Aires"
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-700">Localidad / Ciudad</label>
        <input
          className={inputClass}
          placeholder="Ej: Avellaneda"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
        />
      </div>

      {/* Entrega pactada */}
      <div className="space-y-1">
        <label className="text-xs text-slate-700">
          Entrega pactada que te gustaría
        </label>
        <select
          className={selectClass}
          value={entrega}
          onChange={(e) => setEntrega(e.target.value)}
        >
          {ENTREGA_OPCIONES.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
        <p className="text-[11px] text-slate-500">
          La entrega real se define según tu scoring y el cupo disponible (3, 6,
          8, 12 meses, etc.).
        </p>
      </div>

      {/* Horario y preferencia de contacto */}
      <div className="space-y-1">
        <label className="text-xs text-slate-700">
          Horario preferido de contacto
        </label>
        <select
          className={selectClass}
          value={horario ?? ""}
          onChange={(e) => setHorario(e.target.value || null)}
        >
          {HORARIO_OPCIONES.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-700">
          ¿Cómo preferís que te contacten?
        </label>
        <select
          className={selectClass}
          value={preferencia ?? ""}
          onChange={(e) => setPreferencia(e.target.value || null)}
        >
          {PREFERENCIA_CONTACTO.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>

      {/* Auto usado */}
      <div className="space-y-1">
        <label className="text-xs text-slate-700">
          ¿Tenés auto usado para entregar?
        </label>
        <div className="flex gap-3 text-xs text-slate-700">
          <button
            type="button"
            onClick={() => setTieneUsado("si")}
            className={`px-3 py-1.5 rounded-full border text-xs ${
              tieneUsado === "si"
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-300 bg-white hover:bg-slate-50"
            }`}
          >
            Sí, tengo usado
          </button>
          <button
            type="button"
            onClick={() => setTieneUsado("no")}
            className={`px-3 py-1.5 rounded-full border text-xs ${
              tieneUsado === "no"
                ? "border-slate-500 bg-slate-100 text-slate-800"
                : "border-slate-300 bg-white hover:bg-slate-50"
            }`}
          >
            No tengo usado
          </button>
        </div>
      </div>

      <div className="md:col-span-2 space-y-1">
        <label className="text-xs text-slate-700">
          Si tenés auto usado, contanos cuál (marca, modelo, año, estado)
        </label>
        <input
          className={inputClass}
          placeholder="Ej: Fiat Cronos 2020, 60.000km, titular al día"
          value={autoUsado}
          onChange={(e) => setAutoUsado(e.target.value)}
        />
      </div>

      {/* Comentarios */}
      <div className="md:col-span-2 space-y-1">
        <label className="text-xs text-slate-700">Comentarios adicionales</label>
        <textarea
          className={`${inputClass} min-h-[90px]`}
          placeholder="Ej: Marca preferida, uso que le vas a dar, si ya estás en algún plan, etc."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="md:col-span-2 mt-1 px-6 py-3 rounded-full bg-sky-700 hover:bg-sky-600 disabled:opacity-60 text-sm font-medium text-white transition"
      >
        {status === "loading" ? "Enviando..." : "Quiero que me asesoren"}
      </button>

      {status !== "idle" && (
        <p
          className={`md:col-span-2 text-[12px] mt-1 ${
            status === "ok" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
