"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const r = await fetch("/api/dashboard", { cache: "no-store" });
      const data = await r.json();
      setMetrics(data);
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

  if (!metrics) return <p className="text-slate-400">Cargando…</p>;

  return (
    <div className="space-y-6">
      {/* TARJETAS */}
      <section className="grid grid-cols-3 gap-4">
        <Card title="Visitas" value={metrics.visits} />
        <Card title="Leads" value={metrics.leads} />
        <Card
          title="Tasa de conversión"
          value={metrics.conversion.toFixed(1) + "%"}
        />
      </section>

      {/* ULTIMOS LEADS */}
      <section>
        <h2 className="text-lg font-semibold text-slate-100 mb-3">
          Últimos leads
        </h2>

        <div className="bg-slate-950/60 rounded-xl p-4 text-sm space-y-2">
          {metrics.recent?.length === 0 && (
            <p className="text-slate-400">Todavía no hay leads.</p>
          )}

          {metrics.recent?.map((l: any) => (
            <div key={l.id} className="border-b border-slate-800 pb-2">
              <strong>{l.nombre}</strong> — {l.email} — {l.telefono_numero}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="text-3xl font-semibold text-slate-50">{value}</p>
    </div>
  );
}