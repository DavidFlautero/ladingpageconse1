"use client";

import { useState } from "react";

export default function ConfigPage() {
  const [file, setFile] = useState<File | null>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  async function subirFoto() {
    if (!file) return alert("Seleccione una imagen");

    const form = new FormData();
    form.append("file", file);

    const r = await fetch("/api/admin/upload", {
      method: "POST",
      body: form,
    });

    const data = await r.json();
    if (!data.url) return alert("Error subiendo imagen");
    return data.url;
  }

  async function guardarPerfil() {
    let fotoUrl = null;
    if (file) fotoUrl = await subirFoto();

    const res = await fetch("/api/admin/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foto: fotoUrl,
        nombre,
        email,
        telefono,
      }),
    });

    if (!res.ok) alert("Error guardando");
  }

  async function guardarWhatsapp() {
    const res = await fetch("/api/settings/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: whatsapp }),
    });

    if (!res.ok) alert("Error guardando número");
  }

  return (
    <div className="space-y-10">
      {/* PERFIL */}
      <section className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl">
        <h2 className="text-lg font-semibold text-slate-100 mb-2">
          Perfil del administrador
        </h2>

        <div className="flex items-center gap-6">
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-slate-300"
          />

          <div className="flex-1">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="bg-slate-900 text-slate-200 px-3 py-2 rounded mb-2 w-full"
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900 text-slate-200 px-3 py-2 rounded mb-2 w-full"
            />

            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="bg-slate-900 text-slate-200 px-3 py-2 rounded mb-2 w-full"
            />
          </div>
        </div>

        <button
          onClick={guardarPerfil}
          className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded"
        >
          Guardar perfil
        </button>
      </section>

      {/* WHATSAPP */}
      <section className="bg-slate-950/50 border border-slate-800 p-5 rounded-xl">
        <h2 className="text-lg font-semibold text-slate-100 mb-2">
          WhatsApp principal
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="54911XXXXXXX"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="bg-slate-900 text-slate-200 px-3 py-2 rounded w-full"
          />

          <button
            onClick={guardarWhatsapp}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </section>
    </div>
  );
}