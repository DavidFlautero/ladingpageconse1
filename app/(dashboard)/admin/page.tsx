"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  nombre: string;
  email: string;
  telefono_numero: string;
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
            (metrics.conversion ?? 0).toFixed
              ? `${metrics.conversion.toFixed(1)}%`
              : "0.0%"
          }
        />
      </section>

      {/* ÚLTIMOS LEADS */}
      <section>
        <h2 className="text-lg font-semibold text-slate-100 mb-3">
          Últimos leads
        </h2>

        <div className="bg-slate-950/60 rounded-xl p-4 text-sm space-y-2">
          {(!metrics.recent || metrics.recent.length === 0) && (
            <p className="text-slate-400">Todavía no hay leads.</p>
          )}

          {metrics.recent?.map((l) => (
            <div
              key={l.id}
              className="border-b border-slate-800 pb-2 last:border-b-0 last:pb-0"
            >
              <strong>{l.nombre}</strong> — {l.email} — {l.telefono_numero}
            </div>
          ))}
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
