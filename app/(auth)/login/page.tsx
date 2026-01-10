export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-black via-[#050815] to-black">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
            Panel interno · Demo
          </p>
          <h1 className="mt-2 text-2xl font-semibold">
            Ingresar al panel de planes
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Pronto vamos a conectar este acceso con Supabase Auth.
          </p>
        </div>

        <div className="relative rounded-[26px] border border-white/10 bg-black/70 backdrop-blur-sm p-7 shadow-[0_0_60px_rgba(15,23,42,0.85)]">
          <div className="absolute -inset-px rounded-[26px] border border-white/5 opacity-30 pointer-events-none" />
          <form className="space-y-4 relative z-10">
            <div className="space-y-1">
              <label className="text-xs text-gray-300">Email</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
                placeholder="admin@tusitio.com"
                type="email"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-300">Contraseña</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-500 rounded-full py-2.5 text-sm font-medium transition mt-2"
            >
              Entrar (demo)
            </button>
          </form>
          <p className="mt-4 text-[11px] text-center text-gray-500">
            En la versión final solo vos vas a poder entrar a este panel con tu
            usuario.
          </p>
        </div>
      </div>
    </main>
  );
}
