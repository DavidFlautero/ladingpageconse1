"use client";

import { FormEvent, useEffect, useState } from "react";

type Lead = {
  id: number;
  nombre: string;
  email: string;
  telefono_numero: string;
  created_at: string;
  seguimiento: string | null;
  visto: boolean | null;
};

type Metrics = {
  visits: number;
  leads: number;
  conversion: number;
  recent: Lead[];
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [seguimientoDraft, setSeguimientoDraft] = useState("");
  const [editingSeguimiento, setEditingSeguimiento] = useState(false);
  const [savingSeguimiento, setSavingSeguimiento] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  async function load() {
    try {
      const r = await fetch("/api/dashboard", { cache: "no-store" });
      const data = (await r.json()) as Metrics;
      setMetrics({
        visits: data.visits ?? 0,
        leads: data.leads ?? 0,
        conversion: data.conversion ?? 0,
        recent: data.recent ?? [],
      });
    } catch (e) {
      console.error("Error cargando métricas:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, []);

  async function markLeadAsSeen(id: number) {
    try {
      await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "update_lead", id, visto: true }),
      });

      setMetrics((prev) =>
        prev
          ? {
              ...prev,
              recent: prev.recent.map((l) =>
                l.id === id ? { ...l, visto: true } : l
              ),
            }
          : prev
      );
    } catch (e) {
      console.error("Error marcando lead como visto:", e);
    }
  }

  function handleSelectLead(lead: Lead) {
    setSelectedLead(lead);
    setSeguimientoDraft(lead.seguimiento ?? "");
    setEditingSeguimiento(false);
    setStatusError(null);
    setStatusMessage(null);

    if (!lead.visto) {
      markLeadAsSeen(lead.id);
      setMetrics((prev) =>
        prev
          ? {
              ...prev,
              recent: prev.recent.map((l) =>
                l.id === lead.id ? { ...l, visto: true } : l
              ),
            }
          : prev
      );
      setSelectedLead({ ...lead, visto: true });
    }
  }

  async function handleSaveSeguimiento(e: FormEvent) {
    e.preventDefault();
    if (!selectedLead) return;

    setSavingSeguimiento(true);
    setStatusError(null);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "update_lead",
          id: selectedLead.id,
          seguimiento: seguimientoDraft,
          visto: true,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Error guardando seguimiento:", res.status, text);
        setStatusError("No se pudo guardar el seguimiento.");
        return;
      }

      const json = await res.json();
      const updated: Lead = json.lead;

      setMetrics((prev) =>
        prev
          ? {
              ...prev,
              recent: prev.recent.map((l) =>
                l.id === updated.id ? updated : l
              ),
            }
          : prev
      );
      setSelectedLead(updated);
      setEditingSeguimiento(false);
      setStatusMessage("Seguimiento guardado correctamente.");
    } catch (err) {
      console.error("Error llamando a /api/dashboard (update_lead):", err);
      setStatusError("Ocurrió un error al guardar el seguimiento.");
    } finally {
      setSavingSeguimiento(false);
    }
  }

  if (loading && !metrics) {
    return <p className="text-slate-400">Cargando…</p>;
  }

  if (!metrics) {
    return (
      <p className="text-slate-400">
        No se pudieron cargar las métricas por el momento.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* TARJETAS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Visitas" value={metrics.visits ?? 0} />
        <Card title="Leads" value={metrics.leads ?? 0} />
        <Card
          title="Tasa de conversión"
          value={
            typeof metrics.conversion === "number"
              ? `${metrics.conversion.toFixed(1)}%`
              : "0.0%"
          }
        />
      </section>

      {/* ULTIMOS LEADS */}
      <section>
        <h2 className="text-lg font-semibold text-slate-100 mb-3">
          Últimos leads
        </h2>

        <div className="bg-slate-950/60 rounded-xl p-4 text-sm">
          {(!metrics.recent || metrics.recent.length === 0) && (
            <p className="text-slate-400">Todavía no hay leads.</p>
          )}

          {metrics.recent && metrics.recent.length > 0 && (
            <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
              {/* Lista de leads */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {metrics.recent.map((l) => {
                  const isSelected = selectedLead?.id === l.id;
                  const isNew = !l.visto;

                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => handleSelectLead(l)}
                      className={`w-full text-left rounded-lg border px-3 py-2 transition ${
                        isSelected
                          ? "border-sky-500 bg-slate-900"
                          : isNew
                          ? "border-emerald-500/70 bg-emerald-900/20"
                          : "border-slate-800 bg-slate-950/60 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-100 flex items-center gap-2">
                            {l.nombre}
                            {isNew && (
                              <span className="text-[10px] font-semibold text-emerald-400">
                                Nuevo
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {l.email} — {l.telefono_numero}
                          </p>
                        </div>
                        <p className="text-[10px] text-slate-500 whitespace-nowrap">
                          {l.created_at
                            ? new Date(l.created_at).toLocaleString("es-AR", {
                                day: "2-digit",
                                month: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detalle / seguimiento */}
              <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
                {!selectedLead ? (
                  <p className="text-xs text-slate-400">
                    Seleccioná un lead de la lista para ver el detalle y cargar
                    seguimiento.
                  </p>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-300">
                        Detalle del lead
                      </p>
                      <p className="text-sm text-slate-100">
                        {selectedLead.nombre}
                      </p>
                      <p className="text-xs text-slate-400">
                        {selectedLead.email} — {selectedLead.telefono_numero}
                      </p>
                      {selectedLead.created_at && (
                        <p className="text-[10px] text-slate-500 mt-1">
                          Recibido el{" "}
                          {new Date(
                            selectedLead.created_at
                          ).toLocaleString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-300">
                          Seguimiento
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingSeguimiento((prev) => !prev)
                          }
                          className="text-[11px] px-2 py-1 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-100"
                        >
                          Seguimiento
                        </button>
                      </div>

                      {!editingSeguimiento && (
                        <div className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-2 min-h-[52px]">
                          {selectedLead.seguimiento &&
                          selectedLead.seguimiento.trim() !== "" ? (
                            <p className="text-xs text-slate-100 whitespace-pre-line">
                              {selectedLead.seguimiento}
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-500">
                              Sin notas de seguimiento todavía.
                            </p>
                          )}
                        </div>
                      )}

                      {editingSeguimiento && (
                        <form
                          onSubmit={handleSaveSeguimiento}
                          className="space-y-2"
                        >
                          <textarea
                            value={seguimientoDraft}
                            onChange={(e) =>
                              setSeguimientoDraft(e.target.value)
                            }
                            className="w-full rounded-md border border-slate-700 bg-slate-950/80 px-2 py-2 text-xs text-slate-50 min-h-[80px]"
                            placeholder="Escribí aquí el seguimiento de este lead (llamadas, WhatsApp, estado, etc.)"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              disabled={savingSeguimiento}
                              className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-[11px] font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              {savingSeguimiento
                                ? "Guardando…"
                                : "Guardar seguimiento"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingSeguimiento(false)}
                              className="px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-[11px] font-medium text-slate-50"
                            >
                              Cancelar
                            </button>
                          </div>
                        </form>
                      )}

                      {statusMessage && (
                        <p className="text-[11px] text-emerald-400">
                          {statusMessage}
                        </p>
                      )}
                      {statusError && (
                        <p className="text-[11px] text-red-400">
                          {statusError}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="text-3xl font-semibold text-slate-50">{value}</p>
    </div>
  );
}
