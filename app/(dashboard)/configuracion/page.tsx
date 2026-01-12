"use client";

import { useEffect, useState } from "react";

type Section = {
  id: number;
  title: string;
};

export default function ConfiguracionPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<number | "">("");
  const [vehicleTitle, setVehicleTitle] = useState("");
  const [vehicleCuota, setVehicleCuota] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");

  async function loadSections() {
    try {
      const res = await fetch("/api/vehicles");
      const json = await res.json();
      setSections(
        json.sections?.map((s: any) => ({ id: s.id, title: s.title })) ?? []
      );
    } catch (e) {
      console.error("Error cargando secciones", e);
    }
  }

  useEffect(() => {
    loadSections();
  }, []);

  async function handleCreateSection(e: React.FormEvent) {
    e.preventDefault();
    const title = newSectionTitle.trim();
    if (!title) return;

    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "section", title }),
    });

    if (!res.ok) {
      console.error("Error creando sección");
      return;
    }

    setNewSectionTitle("");
    await loadSections();
  }

  async function handleCreateVehicle(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedSectionId || !vehicleTitle.trim()) return;

    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "vehicle",
        sectionId: selectedSectionId,
        title: vehicleTitle.trim(),
        cuotaDesde: vehicleCuota
          ? Number(vehicleCuota.replace(".", "").replace(",", "."))
          : null,
        moneda: "ARS",
        imagenUrl: vehicleImage || null,
      }),
    });

    if (!res.ok) {
      console.error("Error creando vehículo");
      return;
    }

    setVehicleTitle("");
    setVehicleCuota("");
    setVehicleImage("");
  }

  return (
    <div className="space-y-8">
      <section className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
        <h1 className="text-lg font-semibold text-slate-50 mb-1">
          Configuración de autos en la landing
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          Creá secciones por marca (Chevrolet, Volkswagen, etc.) y cargá los
          autos que se van a mostrar de a tres por fila en la landing.
        </p>

        {/* Crear sección / marca */}
        <form
          onSubmit={handleCreateSection}
          className="flex flex-col md:flex-row gap-3 items-start md:items-end mb-6"
        >
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nombre de la sección / marca
            </label>
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Ej: Chevrolet, Volkswagen, Fiat..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-sm font-medium text-white"
          >
            Crear sección
          </button>
        </form>

        {/* Crear vehículo */}
        <form
          onSubmit={handleCreateVehicle}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
        >
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Sección
            </label>
            <select
              value={selectedSectionId}
              onChange={(e) =>
                setSelectedSectionId(
                  e.target.value ? Number(e.target.value) : ""
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            >
              <option value="">Elegí una sección</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nombre del auto
            </label>
            <input
              type="text"
              value={vehicleTitle}
              onChange={(e) => setVehicleTitle(e.target.value)}
              placeholder="Ej: Tracker 1.2T AT"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Cuota desde (opcional)
            </label>
            <input
              type="text"
              value={vehicleCuota}
              onChange={(e) => setVehicleCuota(e.target.value)}
              placeholder="Ej: 250.000"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              URL de imagen (opcional)
            </label>
            <input
              type="text"
              value={vehicleImage}
              onChange={(e) => setVehicleImage(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>

          <div className="md:col-span-4">
            <button
              type="submit"
              className="mt-1 inline-flex px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium text-white"
            >
              Agregar auto
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
