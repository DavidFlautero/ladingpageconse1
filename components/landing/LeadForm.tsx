"use client";
import { useState } from "react";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form className="space-y-4">
      {/* NOMBRE + EMAIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          className="input"
          placeholder="Nombre y apellido"
          required
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          required
        />
      </div>

      {/* CÓDIGO DE ÁREA + TEL */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          className="input"
          placeholder="Cód. área (Ej: 011)"
          required
        />
        <input
          type="text"
          className="input col-span-2"
          placeholder="Teléfono / WhatsApp"
          required
        />
      </div>

      {/* LOCALIDAD */}
      <input type="text" className="input" placeholder="Provincia / localidad" required />

      {/* HORARIOS */}
      <div className="grid grid-cols-2 gap-4">
        <select className="input" required>
          <option value="">Desde</option>
          <option>08 hs</option>
          <option>10 hs</option>
          <option>12 hs</option>
        </select>

        <select className="input" required>
          <option value="">Hasta</option>
          <option>15 hs</option>
          <option>18 hs</option>
          <option>21 hs</option>
        </select>
      </div>

      {/* CONSULTA */}
      <textarea
        className="input h-28 resize-none"
        placeholder="Dejanos un mensaje breve (opcional)"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-sky-700 py-3 text-white font-medium shadow-lg hover:bg-sky-600 transition"
      >
        {loading ? "Enviando..." : "Enviar consulta"}
      </button>
    </form>
  );
}
