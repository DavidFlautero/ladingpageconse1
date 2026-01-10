export function Topbar() {
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/60 backdrop-blur">
      <div>
        <p className="text-[11px] text-gray-500 uppercase tracking-[0.22em]">
          Panel interno · Planes 0km
        </p>
        <h2 className="text-sm text-gray-100">
          Visión general de leads y rendimiento
        </h2>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <div className="text-right">
          <p className="text-[11px] text-gray-300">Admin demo</p>
          <p className="text-[10px] text-gray-500">Versión previa · Solo lectura</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-slate-700 border border-white/20" />
      </div>
    </header>
  );
}
