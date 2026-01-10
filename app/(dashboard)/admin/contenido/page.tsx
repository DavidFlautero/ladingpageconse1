export default function ContenidoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Contenido</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/60 border border-gray-900 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium">Hero principal</h2>
          <input
            className="bg-black border border-gray-800 rounded-lg p-2 text-sm"
            placeholder="Título"
          />
          <textarea
            className="bg-black border border-gray-800 rounded-lg p-2 text-sm min-h-[80px]"
            placeholder="Subtítulo"
          />
          <input
            className="bg-black border border-gray-800 rounded-lg p-2 text-sm"
            placeholder="Texto del botón"
          />
          <button className="bg-blue-600 hover:bg-blue-500 rounded-full py-2 text-sm w-max px-4">
            Guardar (dummy)
          </button>
        </div>

        <div className="bg-black/60 border border-gray-900 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium">Modelos / Cuotas</h2>
          <p className="text-xs text-gray-500">
            Acá vas a poder cargar las cuotas desde… de cada tipo de plan.
          </p>
          <div className="bg-black/40 border border-gray-800 rounded-lg p-3 text-sm">
            <p className="text-gray-300">SUV Familiares</p>
            <p className="text-gray-500 text-xs">Cuota desde $000.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
