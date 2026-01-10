export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* HERO */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-16 lg:px-24 gap-12 pt-10 pb-12">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-300">
              Planes oficiales · Argentina
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Accedé a tu{" "}
            <span className="text-blue-400">0km</span> con cuotas{" "}
            <span className="text-gray-300">oficiales</span> y asesoría real.
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-md">
            Te conectamos con los mejores planes de financiación del país. Sin
            vueltas, sin letra chica, con un asesor que te acompaña en todo el
            proceso.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#form"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium transition shadow-[0_0_40px_rgba(37,99,235,0.30)]"
            >
              Quiero que me asesoren
            </a>
            <span className="text-[11px] text-gray-500 flex items-center gap-2">
              <span className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-500/60 to-transparent" />
              Respuesta en menos de 24 hs hábiles.
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md pt-4">
            <div className="border border-white/5 rounded-2xl px-3 py-3 bg-white/5">
              <p className="text-xs text-gray-400">Planes gestionados</p>
              <p className="text-lg font-semibold">+250</p>
            </div>
            <div className="border border-white/5 rounded-2xl px-3 py-3 bg-white/5">
              <p className="text-xs text-gray-400">Ahorro promedio</p>
              <p className="text-lg font-semibold">15%</p>
            </div>
            <div className="border border-white/5 rounded-2xl px-3 py-3 bg-white/5">
              <p className="text-xs text-gray-400">Clientes felices</p>
              <p className="text-lg font-semibold">4.9★</p>
            </div>
          </div>
        </div>

        {/* “CARD” DEL AUTO */}
        <div className="w-full max-w-md">
          <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-blue-900/30 p-5 overflow-hidden shadow-[0_0_80px_rgba(15,23,42,0.7)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-gray-300">
                  Simulación
                </p>
                <p className="text-sm text-gray-400">
                  Plan nacional 0km · Demo
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/10 text-emerald-300 text-[10px] px-3 py-1 border border-emerald-500/40">
                Aprobación sujeta a crédito
              </span>
            </div>

            <div className="aspect-[16/9] rounded-2xl border border-white/10 bg-gradient-to-br from-blue-900 via-slate-900 to-black flex items-center justify-center text-[11px] text-gray-400">
              Aquí va la imagen premium del auto
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">
                  Cuota estimada desde
                </p>
                <p className="text-2xl font-semibold">
                  $000.000{" "}
                  <span className="text-xs font-normal text-gray-400">
                    / mes
                  </span>
                </p>
              </div>
              <div className="text-right text-[11px] text-gray-500">
                <p>Valores ilustrativos.</p>
                <p>Se ajustan según marca y modelo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section
        id="form"
        className="border-t border-white/5 bg-black/70 backdrop-blur-sm px-6 md:px-16 lg:px-24 py-10"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Completá tus datos y te llamamos con una propuesta concreta.
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Este formulario luego va a guardar en Supabase y disparar una
              notificación a tu asesor. Por ahora es solo estructura visual para
              la demo.
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
                placeholder="Nombre completo"
              />
              <input
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
                placeholder="WhatsApp"
              />
              <input
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
                placeholder="Ciudad / Provincia"
              />
              <input
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition"
                placeholder="Presupuesto estimado"
              />
              <textarea
                className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition min-h-[110px]"
                placeholder="Qué auto buscás, marca preferida, uso, año estimado, etc."
              />
              <button
                type="button"
                className="md:col-span-2 mt-1 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium transition"
              >
                Enviar consulta (demo)
              </button>
            </form>
          </div>

          <div className="space-y-4 text-sm text-gray-400">
            <div className="border border-white/5 rounded-2xl p-4 bg-white/5">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-300 mb-1">
                ¿Qué pasa después?
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[13px]">
                <li>Recibimos tu consulta en el panel interno.</li>
                <li>Un asesor revisa tu perfil y opciones reales.</li>
                <li>Te contactamos por WhatsApp para avanzar.</li>
              </ol>
            </div>
            <div className="border border-white/5 rounded-2xl p-4 bg-gradient-to-br from-emerald-500/10 to-blue-500/5">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-300 mb-1">
                Importante
              </p>
              <p className="text-[13px]">
                No somos una concesionaria específica: buscamos el mejor plan
                oficial disponible para vos, aunque la operación se termine
                cerrando en otra agencia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
