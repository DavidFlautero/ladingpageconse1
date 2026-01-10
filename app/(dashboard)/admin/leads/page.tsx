export default function LeadsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Leads</h1>

      <input
        className="bg-black border border-gray-800 rounded-lg p-2 text-sm"
        placeholder="Buscar lead..."
      />

      <div className="overflow-auto border border-gray-900 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-black/70 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">WhatsApp</th>
              <th className="px-4 py-3 text-left">Ciudad</th>
              <th className="px-4 py-3 text-left">Presupuesto</th>
              <th className="px-4 py-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-800">
              <td className="px-4 py-3">Lead demo</td>
              <td className="px-4 py-3">+54 11</td>
              <td className="px-4 py-3">CABA</td>
              <td className="px-4 py-3">$500.000</td>
              <td className="px-4 py-3">10/01/2026</td>
            </tr>
            <tr>
              <td
                colSpan={5}
                className="px-4 py-3 text-center text-gray-600 text-xs"
              >
                Luego acá van los datos reales de Supabase
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
