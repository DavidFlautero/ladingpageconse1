import Header from "@/components/layout/Header";

export default function AdminDashboardPage() {
  // TODO: estos valores luego se van a traer desde Supabase / API
  const stats = {
    visits: 0,
    leads: 0,
    conversion: 0, // porcentaje
  };

  const recentLeads: {
    id: string;
    name: string;
    phone: string;
    createdAt: string;
    provincia?: string;
  }[] = [];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#05070B] via-[#020308] to-black">
      <Header />

      <section className="px-6 md:px-16 lg:px-24 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
              Panel interno
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-50">
              Dashboard · Plan Nacional tu 0km
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Acá vas a poder ver un resumen rápido del rendimiento de la
              landing: visitas, formularios completados y tasa de conversión.
              Más adelante sumamos filtros por fecha, provincia y marca.
            </p>
          </header>

          {/* MÉTRICAS PRINCIPALES */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <article className="border border-white/10 rounded-2xl bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-300 mb-1">
                Visitas a la página
              </p>
              <p className="text-3xl font-semibold text-gray-50">
                {stats.visits.toLocaleString("es-AR")}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Total de veces que la landing fue vista. Este dato se va a
                alimentar con los eventos de visita que registremos.
              </p>
            </article>

            <article className="border border-white/10 rounded-2xl bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-300 mb-1">
                Formularios completados
              </p>
              <p className="text-3xl font-semibold text-gray-50">
                {stats.leads.toLocaleString("es-AR")}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Cantidad de personas que dejaron sus datos para ser contactadas.
              </p>
            </article>

            <article className="border border-white/10 rounded-2xl bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-300 mb-1">
                Tasa de conversión
              </p>
              <p className="text-3xl font-semibold text-gray-50">
                {stats.conversion.toFixed(1)}%
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Porcentaje de visitas que terminaron completando el formulario.
                Es uno de los indicadores más importantes de rendimiento.
              </p>
            </article>
          </section>

          {/* ACTIVIDAD RECIENTE */}
          <section className="border border-white/10 rounded-2xl bg-black/70 p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-gray-300">
                  Actividad reciente
                </p>
                <p className="text-sm text-gray-400">
                  Últimos formularios recibidos desde la landing.
                </p>
              </div>
              {/* Más adelante: filtro por rango de fechas */}
            </div>

            {recentLeads.length === 0 ? (
              <p className="text-[12px] text-gray-500">
                Todavía no hay registros para mostrar en el dashboard. Cuando la
                landing empiece a recibir tráfico y formularios, acá vas a ver
                los últimos leads con nombre, provincia y fecha de alta.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-[12px] text-left border-separate border-spacing-y-2">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="px-2 py-1">Nombre</th>
                      <th className="px-2 py-1">WhatsApp</th>
                      <th className="px-2 py-1">Provincia</th>
                      <th className="px-2 py-1">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="bg-white/5 hover:bg-white/10 transition"
                      >
                        <td className="px-2 py-2 rounded-l-lg text-gray-100">
                          {lead.name || "Sin nombre"}
                        </td>
                        <td className="px-2 py-2 text-gray-300">
                          {lead.phone}
                        </td>
                        <td className="px-2 py-2 text-gray-300">
                          {lead.provincia || "-"}
                        </td>
                        <td className="px-2 py-2 rounded-r-lg text-gray-400">
                          {lead.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
