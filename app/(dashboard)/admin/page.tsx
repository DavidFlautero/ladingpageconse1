export default function AdminDashboardPage() {
  const stats = [
    { label: "Visitas hoy", value: "0", hint: "Luego vendrá de Supabase" },
    { label: "Visitas nuevas", value: "0", hint: "Usuarios únicos del día" },
    { label: "Leads hoy", value: "0", hint: "Formularios recibidos hoy" },
    { label: "Leads totales", value: "128", hint: "Dato demo para la vista" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Resumen general</h1>
          <p className="text-xs text-gray-500">
            Cuando conectemos Supabase, acá vas a ver cómo rinden tus campañas
            de captación en tiempo real.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Demo conectada · Datos de prueba
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="border border-white/10 bg-gradient-to-br from-white/5 via-black to-black rounded-2xl p-4 shadow-[0_0_40px_rgba(15,23,42,0.85)]"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
              {item.label}
            </p>
            <p className="text-2xl md:text-3xl font-semibold mt-2">
              {item.value}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">{item.hint}</p>
          </div>
        ))}
      </section>

      <section className="border border-white/10 bg-black/70 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium">Actividad reciente</h2>
            <p className="text-[11px] text-gray-500">
              Acá después va un gráfico con visitas vs leads de los últimos
              días.
            </p>
          </div>
          <span className="text-[11px] text-gray-500">
            Datos demo · Sin conexión aún
          </span>
        </div>
        <div className="h-40 border border-dashed border-white/15 rounded-xl flex items-center justify-center text-[11px] text-gray-600">
          Placeholder gráfico · Métricas en construcción
        </div>
      </section>
    </div>
  );
}
