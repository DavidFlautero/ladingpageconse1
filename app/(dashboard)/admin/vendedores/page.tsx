export default function VendedoresPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold flex items-center gap-2">
        Vendedores{" "}
        <span className="text-[10px] px-2 py-1 border border-gray-700 rounded-full">
          Pro
        </span>
      </h1>

      <div className="bg-black/60 border border-gray-900 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/70 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Zona</th>
              <th className="px-4 py-3 text-left">WhatsApp</th>
              <th className="px-4 py-3 text-left">Leads asignados</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-900">
              <td className="px-4 py-3">Juan Demo</td>
              <td className="px-4 py-3">Zona Norte</td>
              <td className="px-4 py-3">+54 11</td>
              <td className="px-4 py-3">23</td>
            </tr>
            <tr className="border-t border-gray-900">
              <td className="px-4 py-3">María Demo</td>
              <td className="px-4 py-3">Zona Sur</td>
              <td className="px-4 py-3">+54 11</td>
              <td className="px-4 py-3">18</td>
            </tr>
            <tr>
              <td
                colSpan={4}
                className="px-4 py-6 text-center text-gray-600 text-xs"
              >
                Para habilitar este módulo con datos reales y asignación de
                leads, se requiere la siguiente etapa del proyecto.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
