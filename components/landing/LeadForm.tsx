"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function LeadForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telCodigo, setTelCodigo] = useState("");
  const [telNumero, setTelNumero] = useState("");
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [horarioDesde, setHorarioDesde] = useState("");
  const [horarioHasta, setHorarioHasta] = useState("");
  const [canal, setCanal] = useState("WhatsApp");
  const [comentario, setComentario] = useState("");
  const [marcaInteres, setMarcaInteres] = useState("");
  const [modeloInteres, setModeloInteres] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          telefonoCodigo: telCodigo,
          telefonoNumero: telNumero,
          provincia,
          localidad,
          horarioDesde,
          horarioHasta,
          canalContacto: canal,
          comentario,
          marcaInteres,
          modeloInteres,
        }),
      });

      if (!res.ok) {
        let detail = "";
        try {
          const data = await res.json();
          detail = data?.error || JSON.stringify(data);
        } catch {
          detail = await res.text();
        }
        setStatus("error");
        setErrorMsg(
          detail || "No se pudo enviar la consulta. Intentá de nuevo."
        );
        return;
      }

      const { lead } = await res.json();

      // Registrar evento de formulario enviado
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "form_submit", leadId: lead?.id }),
      }).catch(() => {});

      setStatus("ok");
      setNombre("");
      setEmail("");
      setTelCodigo("");
      setTelNumero("");
      setProvincia("");
      setLocalidad("");
      setHorarioDesde("");
      setHorarioHasta("");
      setCanal("WhatsApp");
      setComentario("");
      setMarcaInteres("");
      setModeloInteres("");
    } catch (err: any) {
      console.error("Error enviando lead:", err);
      setStatus("error");
      setErrorMsg(
        err?.message || "No se pudo enviar la consulta. Intentá de nuevo."
      );
    } finally {
      setStatus((prev) => (prev === "loading" ? "idle" : prev));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-slate-700 mb-1">
            Nombre y apellido *
          </label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-[12px] font-medium text-slate-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            placeholder="Ej: nombre@correo.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-[0.7fr,1.3fr] md:grid-cols-[0.6fr,1.4fr] gap-3">
        <div>
          <label className="block text-[12px] font-medium text-slate-700 mb-1">
            Cód. de área
          </label>
          <input
            type="text"
            value={telCodigo}
            onChange={(e) => setTelCodigo(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            placeholder="Ej: 011"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-slate-700 mb-1">
            Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            required
            value={telNumero}
            onChange={(e) => setTelNumero(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
            placeholder="Ej: 1234 5678"
          />
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-slate-700 mb-1">
          Provincia / localidad
        </label>
        <input
          type="text"
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          placeholder="Ej: CABA, GBA Oeste, Córdoba capital..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-slate-700 mb-1">
            Horario desde
          </label>
          <input
            type="time"
            value={horarioDesde}
            onChange={(e) => setHorarioDesde(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-slate-700 mb-1">
            Horario hasta
          </label>
          <input
            type="time"
            value={horarioHasta}
            onChange={(e) => setHorarioHasta(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-slate-700 mb-1">
            Preferís que te contacten por
          </label>
          <select
            value={canal}
            onChange={(e) => setCanal(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          >
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telefono">Teléfono</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1">
              Marca de interés
            </label>
            <input
              type="text"
              value={marcaInteres}
              onChange={(e) => setMarcaInteres(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              placeholder="Ej: Volkswagen"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1">
              Modelo de interés
            </label>
            <input
              type="text"
              value={modeloInteres}
              onChange={(e) => setModeloInteres(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              placeholder="Ej: Polo, T-Cross..."
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-slate-700 mb-1">
          Tu consulta
        </label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 min-h-[70px]"
          placeholder="Contanos brevemente qué estás buscando (0km, financiación, entrega estimada, etc.)."
        />
      </div>

      {status === "ok" && (
        <p className="text-[12px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
          Listo. Recibimos tu consulta. Un asesor te va a contactar a la
          brevedad según el horario indicado.
        </p>
      )}

      {status === "error" && (
        <p className="text-[12px] text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-sky-700 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-sky-600 transition disabled:opacity-70"
      >
        {status === "loading" ? "Enviando..." : "Enviar consulta"}
      </button>
    </form>
  );
}
