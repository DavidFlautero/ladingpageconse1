export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#050505] border border-gray-900 rounded-3xl p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Ingresar al panel
        </h1>

        <form className="space-y-4">
          <input
            className="w-full bg-black border border-gray-800 rounded-lg p-3"
            placeholder="Email"
          />
          <input
            className="w-full bg-black border border-gray-800 rounded-lg p-3"
            placeholder="Contraseña"
            type="password"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-500 rounded-full py-3 text-sm transition">
            Entrar (dummy)
          </button>
        </form>
      </div>
    </main>
  );
}
