export default function CampaniasPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold flex items-center gap-2">
        Campañas{" "}
        <span className="text-[10px] px-2 py-1 border border-gray-700 rounded-full">
          Pro
        </span>
      </h1>
      <p className="text-xs text-gray-500">
        Módulo demo para mostrar cómo se vería la gestión de campañas de
        marketing (Facebook, Google Ads, etc.).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Facebook Ads", "Google Ads", "Instagram"].map((name) => (
          <div
            key={name}
            className="bg-black/60 border border-gray-900 rounded-xl p-4"
          >
            <p className="text-sm font-medium text-gray-200">{name}</p>
            <p className="text-xs text-gray-500 mt-1">
              Leads demo · Costo por lead demo
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
