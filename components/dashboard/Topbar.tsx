export function Topbar() {
  return (
    <header className="h-16 border-b border-gray-900 flex items-center justify-between px-6 bg-black/60 backdrop-blur">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">
          Panel interno
        </p>
        <h2 className="text-sm text-gray-100">
          Administrá tus planes y leads
        </h2>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>Admin Demo</span>
        <div className="w-8 h-8 rounded-full bg-gray-700" />
      </div>
    </header>
  );
}
