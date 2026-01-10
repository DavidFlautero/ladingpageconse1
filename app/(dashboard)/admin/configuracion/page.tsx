export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Configuración</h1>

      <section className="bg-black/60 border border-gray-900 rounded-xl p-6 space-y-3">
        <h2 className="text-sm font-medium">Datos básicos</h2>
        <input
          className="bg-black border border-gray-800 rounded-lg p-2 text-sm"
          placeholder="Nombre comercial"
        />
        <input
          className="bg-black border border-gray-800 rounded-lg p-2 text-sm"
          placeholder="Email de contacto"
        />
        <button className="bg-blue-600 hover:bg-blue-500 rounded-full py-2 text-sm w-max px-4 mt-2">
          Guardar (dummy)
        </button>
      </section>

      <section className="bg-black/60 border border-gray-900 rounded-xl p-6 space-y-3">
        <h2 className="text-sm font-medium flex items-center gap-2">
          Integraciones avanzadas
          <span className="text-[10px] px-2 py-1 border border-gray-700 rounded-full">
            Pro
          </span>
        </h2>
        <p className="text-xs text-gray-500">
          Integración con CRM externo, cuentas publicitarias y usuarios
          adicionales del equipo. Disponible en la siguiente fase del sistema.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-500">
          <div className="border border-gray-800 rounded-lg p-3">
            CRM externo (bloqueado)
          </div>
          <div className="border border-gray-800 rounded-lg p-3">
            Cuentas de publicidad (bloqueado)
          </div>
          <div className="border border-gray-800 rounded-lg p-3">
            Usuarios adicionales (bloqueado)
          </div>
        </div>
      </section>
    </div>
  );
}
