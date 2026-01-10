export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Visitas hoy", "Visitas nuevas", "Leads hoy", "Leads totales"].map(
          (item) => (
            <div
              key={item}
              className="border border-gray-900 bg-black/60 rounded-xl p-4"
            >
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {item}
              </p>
              <h2 className="text-3xl font-semibold mt-2">0</h2>
              <p className="text-[11px] text-gray-600 mt-1">
                Luego vendrá de Supabase
              </p>
            </div>
          )
        )}
      </div>

      <div className="border border-gray-900 bg-black/60 rounded-xl h-40 flex items-center justify-center text-gray-500 text-sm">
        Aquí irá el gráfico de actividad
      </div>
    </div>
  );
}
