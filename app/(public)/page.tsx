export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-16 lg:px-24 gap-10">
        <div className="max-w-xl space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
            Plan Nacional 0km
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Accedé a tu <span className="text-blue-500">0km</span> con cuotas
            oficiales.
          </h1>
          <p className="text-gray-400">
            Asesoría personalizada. Sin compromiso. Planes oficiales a nivel
            nacional.
          </p>
          <a
            href="#form"
            className="block w-max px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium transition"
          >
            Quiero mi plan ahora
          </a>
        </div>

        <div className="w-full max-w-md aspect-video rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          <span className="text-gray-500 text-xs uppercase tracking-[0.3em]">
            Imagen premium aquí
          </span>
        </div>
      </section>

      <section
        id="form"
        className="px-6 md:px-16 lg:px-24 py-10 bg-[#070707]"
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-3">
          Completá tus datos
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="bg-black border border-gray-800 rounded-lg p-3"
            placeholder="Nombre"
          />
          <input
            className="bg-black border border-gray-800 rounded-lg p-3"
            placeholder="WhatsApp"
          />
          <input
            className="bg-black border border-gray-800 rounded-lg p-3"
            placeholder="Ciudad"
          />
          <input
            className="bg-black border border-gray-800 rounded-lg p-3"
            placeholder="Presupuesto"
          />
          <textarea
            className="md:col-span-2 bg-black border border-gray-800 rounded-lg p-3 min-h-[120px]"
            placeholder="Contanos qué auto buscás"
          />
        </form>
      </section>
    </main>
  );
}
