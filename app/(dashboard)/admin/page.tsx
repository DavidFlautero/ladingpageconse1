"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  nombre: string;
  email: string;
  telefono_codigo: string | null;
  telefono_numero: string;
  provincia: string | null;
  localidad: string | null;
  canal_contacto: string | null;
  created_at: string;
};

type Metrics = {
  visits: number;
  leads: number;
  conversion: number;
  whatsappClicks: number;
  recentLeads: Lead[];
};

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    try {
      const [mRes, lRes] = await Promise.all([
        fetch("/api/dashboard"),
        fetch("/api/leads"),
      ]);

      const mData = await mRes.json();
      const lData = await lRes.json();

      setMetrics(mData);
      setLeads(lData.leads ?? []);
    } catch (err) {
      console.error("Error cargando dashboard:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 10_000); // refresca cada 10 segundos
    return () => clearInterval(id);
  }, []);

  if (loading && !metrics) {
    return (
      <div className="text-sm text-slate-400">
        Cargando métricas y leads...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* TARJETAS PRINCIPALES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Visitas a la landing"
          value={metrics?.visits ?? 0}
          description="Cantidad de veces que se registró una visita a la página."
        />
        <MetricCard
          title="Formularios completados"
          value={metrics?.leads ?? 0}
          description="Personas que dejaron sus datos para ser contactadas."
        />
        <MetricCard
          title="Tasa de conversión"
          value={`${(metrics?.conversion ?? 0).toFixed(1)}%`}
          description="Porcentaje de visitas que terminaron completando el formulario."
        />
      </section>

      {/* CLICS WHATSAPP */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Clics a WhatsApp"
          value={metrics?.whatsappClicks ?? 0}
          description="Veces que los usuarios hicieron clic en los CTA hacia WhatsApp."
        />
      </section>

      {/* LISTA DE LEADS */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">
          Últimos leads recibidos
        </h2>
        <div className="bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/80 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Contacto</th>
                <th className="px-4 py-2 text-left">Ubicación</th>
                <th className="px-4 py-2 text-left">Canal</th>
                <th className="px-4 py-2 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-slate-500"
                  >
                    Todavía no hay leads registrados.
                  </td>
                </tr>
              )}

              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-slate-800/70 hover:bg-slate-900/50"
                >
                  <td className="px-4 py-2">{lead.nombre}</td>
                  <td className="px-4 py-2 text-slate-300">
                    {lead.email}
                    <div className="text-[11px] text-slate-500">
                      {lead.telefono_codigo
                        ? \`(\${lead.telefono_codigo}) \${lead.telefono_numero}\`
                        : lead.telefono_numero}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-slate-300">
                    {lead.localidad || "-"}
                    {lead.provincia ? \` · \${lead.provincia}\` : ""}
                  </td>
                  <td className="px-4 py-2 text-slate-300">
                    {lead.canal_contacto || "-"}
                  </td>
                  <td className="px-4 py-2 text-slate-400 text-xs">
                    {new Date(lead.created_at).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: number | string;
  description: string;
}) {
  return (
    <div className="bg-slate-950/60 rounded-2xl border border-slate-800 px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-1">
        {title}
      </p>
      <p className="text-3xl font-semibold text-slate-50 mb-2">{value}</p>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}