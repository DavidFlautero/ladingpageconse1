import Link from "next/link";
import Header from "@/components/layout/Header";
import LeadForm from "@/components/landing/LeadForm";
import VehiclesGrid from "@/components/landing/VehiclesGrid";
import { getWhatsappNumber } from "@/lib/config";
import AnnouncementBar from "@/components/landing/AnnouncementBar";
import EntryModal from "@/components/landing/EntryModal";
import FloatingActions from "@/components/landing/FloatingActions";

function buildWhatsAppUrl(rawNumber?: string | null) {
  const fallback = "5491112345678"; // número por defecto si no está configurado
  const clean =
    rawNumber && rawNumber.trim().length > 5
      ? rawNumber.replace(/\D/g, "")
      : fallback;

  return `https://wa.me/${clean}`;
}

export default async function LandingPage() {
  const whatsappNumber = await getWhatsappNumber();
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber);

  // Más adelante esto vendrá desde una API / Supabase
  const vehicles: any[] = [];

  return (
    <main className="min-h-screen flex flex-col bg-[#f6f3ec] text-slate-900">
      <Header />

      <AnnouncementBar />
      <EntryModal />
      <FloatingActions whatsappUrl={whatsappUrl} />

      {/* HERO LIMPIO SIN TARJETA */}
      <section
        id="hero"
        className="px-6 md:px-10 lg:px-20 pt-8 pb-6 flex flex-col items-center justify-center"
      >
        <div className="max-w-5xl w-full space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-sky-700">
              Consulta para planes 0km
            </span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-[2.7rem] leading-tight font-semibold text-slate-900">
              Conocé el{" "}
              <span className="text-sky-700">Plan Nacional tu 0km</span> y enterate si
              podés acceder a{" "}
              <span className="underline decoration-sky-300 decoration-[5px] underline-offset-[6px]">
                cuotas y beneficios especiales
              </span>
              .
            </h1>

            <div className="space-y-2 text-sm md:text-[15px]">
              <p className="text-slate-800">
                Dejá tu consulta y un asesor oficial te va a contactar con opciones de planes
                0km en cuotas, según tu perfil y el cupo disponible en cada concesionario.
              </p>
              <p className="text-slate-600">
                No es un plan del Gobierno ni una página oficial del Estado: es una plataforma
                privada de asesoría que te conecta con distintas alternativas del mercado.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <a
              href="#form"
              className="px-7 py-3 rounded-full bg-sky-700 hover:bg-sky-600 text-sm font-medium text-white shadow-[0_14px_40px_rgba(15,118,110,0.28)] transition transform hover:-translate-y-[1px]"
            >
              Enviar mi consulta
            </a>

            <Link
              href={whatsappUrl}
              target="_blank"
              className="px-6 py-3 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-sm font-medium text-emerald-800 flex items-center gap-2 transition"
            >
              Hablar por WhatsApp
              <span className="text-[13px]">💬</span>
            </Link>

            <div className="space-y-1 max-w-xs">
              <p className="text-[11px] text-slate-600">
                La consulta no tiene costo ni compromiso de compra. Las propuestas dependen de
                tu perfil crediticio y de los cupos disponibles en cada marca.
              </p>
              <p className="text-[10px] text-slate-500">
                PlanNacionalTu0km.com.ar es una plataforma privada de asesoría.{" "}
                <span className="underline underline-offset-2">
                  No pertenece al Gobierno ni a organismos oficiales.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOS INMEDIATAMENTE DESPUÉS DEL HERO */}
      <section
        id="marcas"
        className="px-6 md:px-10 lg:px-20 pt-2 pb-10 border-t border-slate-200 bg-[#f6f3ec]"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
            Autos disponibles con beneficios del Plan Nacional tu 0km
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Desde el panel interno vas a poder cargar modelos por marca, definir la cuota
            estimada, el texto comercial y hasta 4 fotos por vehículo. Acá se mostrarán
            automáticamente hasta 9 vehículos destacados (3 filas de 3 autos) para que el
            usuario vea ejemplos de unidades alcanzadas por el beneficio.
          </p>

          <VehiclesGrid vehicles={vehicles} />
        </div>
      </section>

      {/* CÓMO FUNCIONA (DETALLE) */}
      <section
        id="como-funciona"
        className="px-6 md:px-10 lg:px-20 pb-10 border-t border-slate-200/80 bg-[#f9f6f0]"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
            ¿Cómo funciona?
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            El proceso es simple: dejás tus datos, un asesor revisa las alternativas para tu
            perfil y te explica opciones de planes 0km en cuotas, sin obligación de compra.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-1">
                Paso 1 · Consulta
              </p>
              <p className="text-slate-800">
                Completás tus datos de contacto, provincia, localidad, entrega pactada deseada y
                si tenés auto usado para entregar llave por llave.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-1">
                Paso 2 · Análisis
              </p>
              <p className="text-slate-800">
                El asesor revisa tu perfil (scoring, ingresos, zona) y qué opciones de planes 0km
                podrían aplicar según los cupos del momento.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-1">
                Paso 3 · Propuesta
              </p>
              <p className="text-slate-800">
                Te contactan por WhatsApp o teléfono para explicarte propuestas concretas y, si te
                interesa, derivarte al concesionario oficial que pueda tomar tu caso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO + BENEFICIOS */}
      <section
        id="form"
        className="border-t border-slate-200 bg-[#fdfaf5] px-6 md:px-10 lg:px-20 py-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.06)] p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
              Completá el formulario y recibí propuestas de planes 0km en cuotas.
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Este formulario llega directo al panel interno. Un asesor revisa tu scoring, la
              entrega que te interesa, tu horario preferido y si tenés auto usado para tomar llave
              por llave.
            </p>
            <LeadForm />
          </div>

          <div
            id="beneficios"
            className="space-y-4 text-sm text-slate-700"
          >
            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-1">
                Entrega pactada y perfil
              </p>
              <p className="text-[13px] mb-2 text-slate-700">
                En base a tu historial y al cupo del momento, se pueden trabajar diferentes
                esquemas de entrega (3, 6, 8, 12 meses, etc.). La idea es que tengas una hoja de
                ruta clara desde el inicio.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500 mb-1">
                Auto usado como parte de pago
              </p>
              <p className="text-[13px] mb-1 text-slate-700">
                Si ya tenés un auto, podés usarlo como parte de pago:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[13px] text-slate-700">
                <li>Tomamos tu usado y se descuenta del plan o del valor del 0km.</li>
                <li>
                  Podemos trabajar esquemas <strong>llave por llave</strong>: entregás tu auto
                  actual cuando retirás el nuevo.
                </li>
              </ul>
            </div>

            <div
              id="preguntas"
              className="border border-slate-200 rounded-2xl p-4 bg-[#f6f3ec]"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-slate-600 mb-1">
                Aclaración importante
              </p>
              <p className="text-[11px] text-slate-700">
                PlanNacionalTu0km.com.ar es un{" "}
                <strong>programa privado de asesoría y gestión</strong>. No es un plan del
                Gobierno, ni un programa oficial del Estado, ni depende de ningún organismo
                público. Trabajamos de forma independiente, conectándote con distintas
                alternativas del mercado y con concesionarios oficiales autorizados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}