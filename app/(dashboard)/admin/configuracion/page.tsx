"use client";

import {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
} from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = "vehicle-images";

type Vehicle = {
  id: number;
  title: string;
  cuota_desde: number | null;
  moneda: string | null;
  imagen_url: string | null;
};

type Section = {
  id: number;
  title: string;
  visible: boolean;
  vehicles: Vehicle[];
};

function formatCuota(cuota: number | null | undefined) {
  if (cuota == null) return "-";
  return new Intl.NumberFormat("es-AR").format(Number(cuota));
}

export default function ConfiguracionPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<number | "">("");
  const [vehicleTitle, setVehicleTitle] = useState("");
  const [vehicleCuota, setVehicleCuota] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingVehicle, setSavingVehicle] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  const [editingVehicleId, setEditingVehicleId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCuota, setEditCuota] = useState("");

  async function loadSections() {
    try {
      const res = await fetch("/api/vehicles");
      const json = await res.json();

      const mapped: Section[] =
        json.sections?.map((s: any) => ({
          id: s.id,
          title: s.title,
          visible: !!s.visible,
          vehicles:
            s.vehicles?.map((v: any) => ({
              id: v.id,
              title: v.title,
              cuota_desde: v.cuota_desde,
              moneda: v.moneda,
              imagen_url: v.imagen_url,
            })) ?? [],
        })) ?? [];

      setSections(mapped);
    } catch (e) {
      console.error("Error cargando secciones", e);
    }
  }

  useEffect(() => {
    loadSections();
  }, []);

  async function handleCreateSection(e: FormEvent) {
    e.preventDefault();
    const title = newSectionTitle.trim();
    if (!title) return;

    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "section", title }),
    });

    if (!res.ok) {
      console.error("Error creando sección", await res.text().catch(() => ""));
      return;
    }

    setNewSectionTitle("");
    await loadSections();
  }

  async function handleToggleSection(section: Section) {
    const newVisible = !section.visible;

    setSections((prev) =>
      prev.map((s) =>
        s.id === section.id ? { ...s, visible: newVisible } : s
      )
    );

    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "toggle-section",
        id: section.id,
        visible: newVisible,
      }),
    });

    if (!res.ok) {
      console.error(
        "Error cambiando visibilidad",
        await res.text().catch(() => "")
      );
      setSections((prev) =>
        prev.map((s) =>
          s.id === section.id ? { ...s, visible: section.visible } : s
        )
      );
    }
  }

  async function handleVehicleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setStatusMessage(null);
      setStatusError(null);
      setUploadingImage(true);

      const ext = file.name.split(".").pop() ?? "jpg";
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;
      const filePath = `autos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error subiendo imagen a Supabase:", uploadError);
        setStatusError(
          `Error al subir la imagen: ${uploadError.message ?? ""}`
        );
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

      setVehicleImage(publicUrl);
      setStatusMessage("Imagen cargada correctamente.");
    } catch (err) {
      console.error("Error inesperado al subir imagen:", err);
      setStatusError("Error inesperado al subir la imagen.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleCreateVehicle(e: FormEvent) {
    e.preventDefault();
    setStatusMessage(null);
    setStatusError(null);

    if (!selectedSectionId || !vehicleTitle.trim()) {
      setStatusError("Elegí una sección y escribí el nombre del auto.");
      return;
    }

    setSavingVehicle(true);

    try {
      const cuotaNumber = vehicleCuota
        ? Number(vehicleCuota.replace(/\./g, "").replace(",", "."))
        : null;

      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "vehicle",
          sectionId: Number(selectedSectionId),
          title: vehicleTitle.trim(),
          cuotaDesde: cuotaNumber,
          moneda: "ARS",
          imagenUrl: vehicleImage || null,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Error creando vehículo:", res.status, text);
        setStatusError(
          "No se pudo guardar el auto. Revisá la consola (F12 → Console) para ver el detalle."
        );
        return;
      }

      setStatusMessage("Auto guardado correctamente.");
      setVehicleTitle("");
      setVehicleCuota("");
      setVehicleImage("");
      await loadSections();
    } catch (err) {
      console.error("Error llamando a /api/vehicles:", err);
      setStatusError("Ocurrió un error de red al guardar el auto.");
    } finally {
      setSavingVehicle(false);
    }
  }

  function startEditVehicle(v: Vehicle) {
    setEditingVehicleId(v.id);
    setEditTitle(v.title);
    setEditCuota(
      v.cuota_desde != null
        ? new Intl.NumberFormat("es-AR").format(Number(v.cuota_desde))
        : ""
    );
  }

  function cancelEditVehicle() {
    setEditingVehicleId(null);
    setEditTitle("");
    setEditCuota("");
  }

  async function handleSaveVehicleEdit(id: number) {
    setStatusError(null);
    setStatusMessage(null);

    try {
      const cuotaNumber = editCuota
        ? Number(editCuota.replace(/\./g, "").replace(",", "."))
        : null;

      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "update_vehicle",
          id,
          title: editTitle.trim(),
          cuotaDesde: cuotaNumber,
          moneda: "ARS",
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Error actualizando vehículo:", res.status, text);
        setStatusError("No se pudo actualizar el vehículo.");
        return;
      }

      setStatusMessage("Vehículo actualizado correctamente.");
      cancelEditVehicle();
      await loadSections();
    } catch (err) {
      console.error("Error llamando a /api/vehicles (update_vehicle):", err);
      setStatusError("Ocurrió un error al actualizar el vehículo.");
    }
  }

  async function handleDeleteVehicle(id: number) {
    const confirmDelete = window.confirm(
      "¿Seguro que querés eliminar este auto de la landing?"
    );
    if (!confirmDelete) return;

    setStatusError(null);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "delete_vehicle",
          id,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Error eliminando vehículo:", res.status, text);
        setStatusError("No se pudo eliminar el vehículo.");
        return;
      }

      setStatusMessage("Vehículo eliminado correctamente.");
      await loadSections();
    } catch (err) {
      console.error("Error llamando a /api/vehicles (delete_vehicle):", err);
      setStatusError("Ocurrió un error al eliminar el vehículo.");
    }
  }

  const selectedSection =
    typeof selectedSectionId === "number"
      ? sections.find((s) => s.id === selectedSectionId) || null
      : null;

  const selectedVehicles = selectedSection?.vehicles ?? [];

  return (
    <div className="space-y-8">
      <section className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
        <h1 className="text-lg font-semibold text-slate-50 mb-1">
          Configuración de autos en la landing
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          Creá secciones por marca (Chevrolet, Volkswagen, etc.) y cargá los
          autos que se van a mostrar de a tres por fila en la landing. Podés
          decidir qué marcas se muestran u ocultan y administrar los modelos ya
          cargados.
        </p>

        {/* Secciones creadas + toggle Visible */}
        {sections.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-medium text-slate-300 mb-1">
              Secciones creadas:
            </p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleToggleSection(s)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs border ${
                    s.visible
                      ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-200"
                      : "bg-slate-900/60 border-slate-700 text-slate-300"
                  }`}
                >
                  <span>{s.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      s.visible
                        ? "bg-emerald-500 text-slate-900"
                        : "bg-slate-700 text-slate-100"
                    }`}
                  >
                    {s.visible ? "Visible" : "Oculta"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

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
              placeholder="Ej: T-Cross 200 TSI AT"
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
              Imagen principal
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleVehicleImageChange}
              className="w-full text-sm text-slate-50"
            />
            {uploadingImage && (
              <p className="text-xs text-slate-400 mt-1">Subiendo imagen...</p>
            )}
            {!uploadingImage && vehicleImage && (
              <p className="text-xs text-emerald-400 mt-1">
                Imagen cargada correctamente.
              </p>
            )}
          </div>

          <div className="md:col-span-4">
            <button
              type="submit"
              disabled={uploadingImage || savingVehicle}
              className="mt-1 inline-flex px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {savingVehicle ? "Guardando..." : "Agregar auto"}
            </button>
          </div>
        </form>

        {/* Listado de autos de la sección seleccionada */}
        {selectedSection && (
          <div className="mt-8 border-t border-slate-800 pt-6">
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              Autos cargados en {selectedSection.title}
            </h3>

            {selectedVehicles.length === 0 ? (
              <p className="text-xs text-slate-400">
                Todavía no cargaste autos para esta sección.
              </p>
            ) : (
              <div className="space-y-3">
                {selectedVehicles.map((v) => {
                  const isEditing = editingVehicleId === v.id;
                  return (
                    <div
                      key={v.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2"
                    >
                      <div className="flex items-center gap-3">
                        {v.imagen_url && (
                          <img
                            src={v.imagen_url}
                            alt={v.title}
                            className="h-10 w-16 rounded-lg object-cover border border-slate-700"
                          />
                        )}
                        <div className="space-y-0.5">
                          {isEditing ? (
                            <>
                              <input
                                className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-50"
                                value={editTitle}
                                onChange={(e) =>
                                  setEditTitle(e.target.value)
                                }
                              />
                              <input
                                className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-50"
                                value={editCuota}
                                onChange={(e) =>
                                  setEditCuota(e.target.value)
                                }
                                placeholder="Cuota desde (ej: 250.000)"
                              />
                            </>
                          ) : (
                            <>
                              <p className="text-xs font-semibold text-slate-100">
                                {v.title}
                              </p>
                              <p className="text-[11px] text-slate-400">
                                Cuota desde{" "}
                                <span className="font-semibold">
                                  {v.moneda === "ARS" ? "$" : ""}
                                  {formatCuota(v.cuota_desde)}
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSaveVehicleEdit(v.id)}
                              className="px-2 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-[11px] font-medium text-white"
                            >
                              Guardar
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditVehicle}
                              className="px-2 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-[11px] font-medium text-slate-50"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => startEditVehicle(v)}
                              className="px-2 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-[11px] font-medium text-slate-50"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteVehicle(v.id)}
                              className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-500 text-[11px] font-medium text-white"
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Mensajes de estado */}
        {statusMessage && (
          <p className="mt-2 text-xs text-emerald-400">{statusMessage}</p>
        )}
        {statusError && (
          <p className="mt-2 text-xs text-red-400">{statusError}</p>
        )}
      </section>
    </div>
  );
}
