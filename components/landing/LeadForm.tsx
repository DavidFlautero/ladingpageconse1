"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function LeadForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [codArea, setCodArea] = useState("");
  const [telefono, setTelefono] = useState("");
  const [provinciaLocalidad, setProvinciaLocalidad] = useState("");
  const [horarioDesde, setHorarioDesde] = useState("");
  const [horarioHasta, setHorarioHasta] = useState("");
  const [canal, setCanal] = useState("WhatsApp");
  const [marcaInteres, setMarcaInteres] = useState("Volkswagen");
  const [modeloInteres, setModeloInteres] = useState("");
  const [consulta, setConsulta] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          telefono_codigo: codArea || null,
          telefono_numero: telefono,
          provincia: provinciaLocalidad || null,
          localidad: null,
          horario_desde: horarioDesde || null,
          horario_hasta: horarioHasta || null,
          canal_contacto: canal,
          marca_interes: marcaInteres || null,
          modelo_interes: modeloInteres || null,
          mensaje: consulta || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo enviar la consulta.");
      }

      setStatus("ok");

      // Limpio algunos campos importantes
      setNombre("");
      setEmail("");
      setCodArea("");
      setTelefono("");
      setConsulta("");
    } catch (err: any) {
      console.error("Error al enviar lead:", err);
      setStatus("error");
      setErrorMsg(err?.message ?? "Ocurrió un error al enviar tu consulta.");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-sm text-slate-900"
    >
      {/* Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Nombre y apellido *
          </label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ej: nombre@correo.com"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Cód. área + Teléfono */}
      <div className="grid grid-cols-[0.7fr_1.3fr] gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Cód. de área *
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            required
            value={codArea}
            onChange={(e) => setCodArea(e.target.value)}
            placeholder="Ej: 011"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 1234 5678"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Provincia / localidad */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Provincia / localidad *
        </label>
        <input
          type="text"
          required
          value={provinciaLocalidad}
          onChange={(e) => setProvinciaLocalidad(e.target.value)}
          placeholder="Ej: CABA, GBA Oeste, Córdoba capital..."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Horarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Horario desde
          </label>
          <select
            value={horarioDesde}
            onChange={(e) => setHorarioDesde(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Seleccionar</option>
            <option value="09:00">09 hs</option>
            <option value="10:00">10 hs</option>
            <option value="11:00">11 hs</option>
            <option value="12:00">12 hs</option>
            <option value="15:00">15 hs</option>
            <option value="16:00">16 hs</option>
            <option value="17:00">17 hs</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Horario hasta
          </label>
          <select
            value={horarioHasta}
            onChange={(e) => setHorarioHasta(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Seleccionar</option>
            <option value="13:00">13 hs</option>
            <option value="14:00">14 hs</option>
            <option value="18:00">18 hs</option>
            <option value="19:00">19 hs</option>
            <option value="20:00">20 hs</option>
          </select>
        </div>
      </div>

      {/* Canal + Marca + Modelo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Preferís que te contacten por
          </label>
          <select
            value={canal}
            onChange={(e) => setCanal(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="WhatsApp">WhatsApp</option>
            <option value="Teléfono">Teléfono</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Marca de interés
          </label>
          <select
            value={marcaInteres}
            onChange={(e) => setMarcaInteres(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Volkswagen">Volkswagen</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Fiat">Fiat</option>
            <option value="Peugeot">Peugeot</option>
            <option value="Renault">Renault</option>
            <option value="Otra">Otra</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Modelo de interés
          </label>
          <input
            type="text"
            value={modeloInteres}
            onChange={(e) => setModeloInteres(e.target.value)}
            placeholder="Ej: Polo, T-Cross, Nivus..."
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Consulta */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Tu consulta
        </label>
        <textarea
          rows={3}
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          placeholder="Contanos brevemente qué estás buscando (0km, financiación, entrega estimada, etc.)."
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Mensajes de estado */}
      {status === "ok" && (
        <p className="text-xs text-emerald-600">
          ¡Gracias! Recibimos tu consulta. Un asesor te va a contactar a la
          brevedad.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-600">
          {errorMsg || "No se pudo enviar la consulta. Intentá nuevamente."}
        </p>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)] hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-400"
      >
        {status === "loading" ? "Enviando..." : "Enviar consulta"}
      </button>
    </form>
  );
}
