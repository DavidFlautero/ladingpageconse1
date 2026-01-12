"use client";

import { useEffect, useState } from "react";

type Section = {
  id: number;
  title: string;
  visible?: boolean;
};

export default function AdminConfigPage() {
  // PERFIL ADMIN
  const [adminNombre, setAdminNombre] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminTelefono, setAdminTelefono] = useState("");
  const [adminAvatar, setAdminAvatar] = useState("");
  const [savingAdmin, setSavingAdmin] = useState(false);

  // WHATSAPP
  const [whats, setWhats] = useState("");
  const [savingWhats, setSavingWhats] = useState(false);

  // SECCIONES Y AUTOS
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<number | "">("");
  const [vehicleTitle, setVehicleTitle] = useState("");
  const [vehicleCuota, setVehicleCuota] = useState("");
  const [vehicleImg1, setVehicleImg1] = useState("");
  const [vehicleImg2, setVehicleImg2] = useState("");
  const [vehicleImg3, setVehicleImg3] = useState("");
  const [savingVehicle, setSavingVehicle] = useState(false);

  async function loadAdminProfile() {
    try {
      const res = await fetch("/api/settings/admin-profile", {
        cache: "no-store",
      });
      if (!res.ok) return;
      const json = await res.json();
      const p = json.profile;
      if (p) {
        setAdminNombre(p.nombre || "");
        setAdminEmail(p.email || "");
        setAdminTelefono(p.telefono || "");
        setAdminAvatar(p.avatar_url || "");
      }
    } catch (e) {
      console.error("Error cargando admin profile:", e);
    }
  }

  async function loadWhats() {
    try {
      const res = await fetch("/api/settings/whatsapp", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json().catch(() => ({}));
      if (data?.value) setWhats(String(data.value));
    } catch (e) {
      console.error("Error cargando WhatsApp:", e);
    }
  }

  async function loadSections() {
    try {
      const res = await fetch("/api/vehicles", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json().catch(() => ({}));
      setSections(
        json.sections?.map((s: any) => ({
          id: s.id,
          title: s.title,
          visible: s.visible ?? true,
        })) ?? []
      );
    } catch (e) {
      console.error("Error cargando secciones:", e);
    }
  }

  useEffect(() => {
    loadAdminProfile();
    loadWhats();
    loadSections();
  }, []);

  async function saveAdmin() {
    setSavingAdmin(true);
    try {
      await fetch("/api/settings/admin-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: adminNombre,
          email: adminEmail,
          telefono: adminTelefono,
          avatar_url: adminAvatar,
        }),
      });
    } catch (e) {
      console.error("Error guardando admin:", e);
    } finally {
      setSavingAdmin(false);
    }
  }

  async function saveWhats() {
    if (!whats.trim()) return;
    setSavingWhats(true);
    try {
      await fetch("/api/settings/whatsapp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: whats }),
      });
    } catch (e) {
      console.error("Error guardando WhatsApp:", e);
    } finally {
      setSavingWhats(false);
    }
  }

  async function handleCreateSection(e: React.FormEvent) {
    e.preventDefault();
    const title = newSectionTitle.trim();
    if (!title) return;

    try {
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
    } catch (e) {
      console.error("Error creando sección:", e);
    }
  }

  async function toggleSectionVisibility(sectionId: number, visible: boolean) {
    try {
      await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "toggle_section_visibility",
          sectionId,
          visible,
        }),
      });
      await loadSections();
    } catch (e) {
      console.error("Error cambiando visibilidad sección:", e);
    }
  }

  async function handleCreateVehicle(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedSectionId || !vehicleTitle.trim()) return;
    if (!vehicleImg1 && !vehicleImg2 && !vehicleImg3) return; // mínimo 1 imagen

    setSavingVehicle(true);
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "vehicle",
          sectionId: selectedSectionId,
          title: vehicleTitle.trim(),
          cuotaDesde: vehicleCuota
            ? Number(vehicleCuota.replace(/\./g, "").replace(",", "."))
            : null,
          moneda: "ARS",
          imagen1: vehicleImg1 || null,
          imagen2: vehicleImg2 || null,
          imagen3: vehicleImg3 || null,
        }),
      });

      if (!res.ok) {
        console.error("Error creando vehículo");
        return;
      }

      setVehicleTitle("");
      setVehicleCuota("");
      setVehicleImg1("");
      setVehicleImg2("");
      setVehicleImg3("");
    } catch (e) {
      console.error("Error creando vehículo:", e);
    } finally {
      setSavingVehicle(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* PERFIL ADMIN */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <h1 className="text-lg font-semibold text-slate-50 mb-2">
          Perfil del administrador
        </h1>
        <p className="text-xs text-slate-400 mb-4">
          Datos básicos y foto del responsable del concesionario.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-20 w-20 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center">
              {adminAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={adminAvatar}
                  alt="Avatar admin"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl text-slate-500">👤</span>
              )}
            </div>
            <input
              type="text"
              value={adminAvatar}
              onChange={(e) => setAdminAvatar(e.target.value)}
              placeholder="URL de foto de perfil"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={adminNombre}
                onChange={(e) => setAdminNombre(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                value={adminTelefono}
                onChange={(e) => setAdminTelefono(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={saveAdmin}
            disabled={savingAdmin}
            className="rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-2 text-sm font-semibold text-white disabled:bg-emerald-500"
          >
            {savingAdmin ? "Guardando..." : "Guardar perfil"}
          </button>
        </div>
      </section>

      {/* WHATSAPP */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <h2 className="text-md font-semibold text-slate-50 mb-2">
          WhatsApp principal
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Número que se usa en los botones de contacto (landing, botón flotante,
          etc.).
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-end max-w-xl">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              WhatsApp (sin espacios, con país)
            </label>
            <input
              type="text"
              value={whats}
              onChange={(e) => setWhats(e.target.value)}
              placeholder="Ej: 5491122334455"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>
          <button
            type="button"
            onClick={saveWhats}
            disabled={savingWhats}
            className="rounded-full bg-sky-600 hover:bg-sky-500 px-5 py-2 text-sm font-semibold text-white disabled:bg-sky-500"
          >
            {savingWhats ? "Guardando..." : "Guardar número"}
          </button>
        </div>
      </section>

      {/* SECCIONES Y AUTOS */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <h2 className="text-md font-semibold text-slate-50 mb-2">
          Marcas / secciones y autos en la landing
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Creá secciones por marca (Volkswagen, Chevrolet, etc.) y autos de
          ejemplo que se muestran de a tres por fila. Podés prender o apagar
          secciones.
        </p>

        {/* Crear sección */}
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
              placeholder="Ej: Volkswagen, Chevrolet..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium text-white"
          >
            Crear sección
          </button>
        </form>

        {/* Listado secciones con toggle */}
        {sections.length > 0 && (
          <div className="mb-6 text-xs text-slate-300">
            <p className="mb-2">Secciones creadas:</p>
            <div className="flex flex-wrap gap-3">
              {sections.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1"
                >
                  <span>{s.title}</span>
                  <button
                    type="button"
                    onClick={() =>
                      toggleSectionVisibility(s.id, !(s.visible ?? true))
                    }
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      s.visible
                        ? "bg-emerald-600/70 border-emerald-500 text-white"
                        : "bg-slate-700 border-slate-500 text-slate-100"
                    }`}
                  >
                    {s.visible ? "Visible" : "Oculta"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crear auto */}
        <form
          onSubmit={handleCreateVehicle}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end max-w-4xl"
        >
          <div>
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
              <option value="">Elegí sección</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nombre del auto
            </label>
            <input
              type="text"
              value={vehicleTitle}
              onChange={(e) => setVehicleTitle(e.target.value)}
              placeholder="Ej: Polo Track"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>

          <div>
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

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Imagen principal (URL)
            </label>
            <input
              type="text"
              value={vehicleImg1}
              onChange={(e) => setVehicleImg1(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Imagen extra 2 (opcional)
            </label>
            <input
              type="text"
              value={vehicleImg2}
              onChange={(e) => setVehicleImg2(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Imagen extra 3 (opcional)
            </label>
            <input
              type="text"
              value={vehicleImg3}
              onChange={(e) => setVehicleImg3(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-50"
            />
          </div>

          <div className="md:col-span-4">
            <button
              type="submit"
              disabled={savingVehicle}
              className="mt-1 inline-flex px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-sm font-medium text-white disabled:bg-sky-500"
            >
              {savingVehicle ? "Guardando..." : "Agregar auto"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
