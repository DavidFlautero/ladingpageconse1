import Header from "@/components/layout/Header";
import LeadForm from "@/components/landing/LeadForm";
import VehiclesGrid from "@/components/landing/VehiclesGrid";

export default function LandingPage() {
  // Más adelante esto vendrá desde una API / Supabase
  const vehicles: any[] = [];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#05070B] via-[#020308] to-black">
      <Header />

      {/* BANDA DE AVISO */}
      <section className="border-b border-cyan-400/40 bg-cyan-600/90 text-center text-[11px] text-white py-2">
        <p>
          No dejes pasar tu evaluación sin costo. Las condiciones dependen del
          mes y del cupo disponible en cada plan.
        </p>
      </section>

      {/* HERO */}
      <section
        id="hero"
        className="px-6 md:px-16 lg:px-24 pt-10 pb-12 flex flex-col lg:flex-row items-center justify-center gap-10"
      >
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-300">
              Evaluación de acceso a tu 0km
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Conocé el{" "}
            <span className="text-blue-400">Plan Nacional tu 0km</span> y
            enterate si podés acceder a un{" "}
            <span className="text-gray-100">beneficio en cuotas</span>.
          </h1>

          <p className="text-sm md:text-base text-gray-400">
            Es un programa privado de asesoría inspirado en los planes
            nacionales de ahorro, pensado para que más personas puedan llegar a
            su 0km en cuotas previsibles. No es para todo el mundo: primero
            evaluamos tu perfil, tu scoring y si tenés auto usado para tomar
            llave por llave.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <a
              href="#form"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium transition shadow-[0_0_40px_rgba(37,99,235,0.30)]"
            >
              Evaluar mi caso ahora
            </a>
            <div className="space-y-1">
              <p className="text-[11px] text-gray-400">
                3 pasos simples: dejás tus datos, analizamos tu perfil y te
                derivamos a un asesor para explicarte a qué tipo de plan podrías
                acceder y en qué plazos.
              </p>
              <p className="text-[10px] text-gray-500">
                PlanNacionalTu0km.com.ar es una plataforma privada de asesoría.{" "}
                <span className="underline underline-offset-2">
                  No pertenece al Gobierno ni a organismos oficiales.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* CARD DEMO AUTO */}
        <div className="w-full max-w-md">
          <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-blue-900/30 p-5 overflow-hidden shadow-[0_0_80px_rgba(15,23,42,0.8)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-gray-300">
                  Simulación referencial
                </p>
                <p className="text-sm text-gray-400">
                  Plan Nacional tu 0km · Demo
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/10 text-emerald-300 text-[10px] px-3 py-1 border border-emerald-500/40">
                Aprobación sujeta a scoring
              </span>
            </div>

            <div className="aspect-[16/9] rounded-2xl border border-white/10 bg-gradient-to-br from-blue-900 via-slate-900 to-black flex items-center justify-center text-[11px] text-gray-400">
              Aquí va la imagen principal del modelo destacado
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
                <p>La cuota final depende del modelo y del plan elegido.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section
        id="como-funciona"
        className="px-6 md:px-16 lg:px-24 py-10 border-t border-white/5 bg-black/60"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            ¿Cómo funciona el Plan Nacional tu 0km?
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            El objetivo es que entiendas el proceso antes de avanzar. No vendemos
            humo ni promesas imposibles: trabajamos en base a tu perfil real y a
            las condiciones vigentes en cada concesionario oficial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="border border-white/10 rounded-2xl p-4 bg-white/5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-300 mb-1">
                Paso 1 · Formulario
              </p>
              <p className="text-gray-300">
                Completás tus datos de contacto, provincia, entrega pactada
                deseada y si tenés auto usado para entregar llave por llave.
              </p>
            </div>
            <div className="border border-white/10 rounded-2xl p-4 bg-white/5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-300 mb-1">
                Paso 2 · Evaluación
              </p>
              <p className="text-gray-300">
                Nuestro sistema analiza tu perfil (scoring, ingresos, zona) y
                define qué tipo de esquema podría aplicar: 3, 6, 8 o 12 meses de
                entrega pactada, según cupo y condiciones.
              </p>
            </div>
            <div className="border border-white/10 rounded-2xl p-4 bg-white/5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-gray-300 mb-1">
                Paso 3 · Asesoría
              </p>
              <p className="text-gray-300">
                Un asesor se comunica con vos por WhatsApp o teléfono para
                explicarte opciones concretas y derivarte al concesionario
                oficial que pueda tomar tu caso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOS AMPARADOS (GRID DINÁMICO DESDE PANEL) */}
      <section
        id="marcas"
        className="px-6 md:px-16 lg:px-24 py-10 border-t border-white/5 bg-black/70"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Autos amparados por el Plan Nacional tu 0km
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Desde el panel interno vas a poder cargar modelos por marca,
            definir la cuota estimada, el texto comercial y hasta 4 fotos por
            vehículo. Acá se mostrarán automáticamente hasta 9 vehículos
            destacados (3 filas de 3 autos) para que el usuario vea ejemplos de
            unidades alcanzadas por el beneficio.
          </p>

          <VehiclesGrid vehicles={vehicles} />
        </div>
      </section>

      {/* FORMULARIO + BENEFICIOS */}
      <section
        id="form"
        className="border-t border-white/5 bg-black/80 backdrop-blur-sm px-6 md:px-16 lg:px-24 py-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Completá tu evaluación sin costo y vemos si podés acceder a un plan.
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Este formulario llega directo al panel interno. Un asesor revisa tu
              scoring, la entrega que te interesa (3, 6, 8, 12 meses, etc.) y si
              tenés auto usado para tomar llave por llave.
            </p>
            <LeadForm />
          </div>

          <div
            id="beneficios"
            className="space-y-4 text-sm text-gray-400"
          >
            <div className="border border-white/5 rounded-2xl p-4 bg-white/5">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-300 mb-1">
                Entrega pactada y perfil
              </p>
              <p className="text-[13px] mb-2">
                No todos los casos son iguales. En base a tu historial y al cupo
                del momento, podemos trabajar entregas pactadas a:
              </p>
              <p className="text-[13px] mb-2">
                <strong>3, 6, 8 o 12 meses</strong>, y en algunos casos plazos
                más largos. La idea es que tengas una hoja de ruta clara desde el
                inicio, sin promesas imposibles.
              </p>
              <p className="text-[11px] text-gray-400">
                Analizamos tu caso de forma individual, según scoring, ingresos,
                zona y disponibilidad de cada concesionario.
              </p>
            </div>

            <div className="border border-white/5 rounded-2xl p-4 bg-white/5">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-300 mb-1">
                Auto usado como parte de pago
              </p>
              <p className="text-[13px] mb-1">
                Si ya tenés un auto, podés usarlo como parte de pago:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[13px]">
                <li>
                  Tomamos tu usado y se descuenta del plan o del valor del 0km.
                </li>
                <li>
                  Podemos trabajar esquemas <strong>llave por llave</strong>:
                  entregás tu auto actual cuando retirás el nuevo.
                </li>
                <li>
                  Cuanto más claro nos expliques tu auto (marca, modelo, año,
                  estado), mejor propuesta te vamos a poder armar.
                </li>
              </ul>
            </div>

            <div
              id="preguntas"
              className="border border-white/5 rounded-2xl p-4 bg-black/70"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-gray-300 mb-1">
                Aclaración importante
              </p>
              <p className="text-[11px] text-gray-400">
                PlanNacionalTu0km.com.ar es un{" "}
                <strong>programa privado de asesoría y gestión</strong>. No es un
                plan del Gobierno, ni un programa oficial del Estado, ni depende
                de ningún organismo público. Trabajamos de forma independiente,
                conectándote con distintas alternativas del mercado y con
                concesionarios oficiales autorizados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
