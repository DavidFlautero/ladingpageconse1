import Link from "next/link";
import Header from "@/components/layout/Header";
import LeadForm from "@/components/landing/LeadForm";
import VehiclesGrid from "@/components/landing/VehiclesGrid";
import { getWhatsappNumber } from "@/lib/config";
import AnnouncementBar from "@/components/landing/AnnouncementBar";
import EntryModal from "@/components/landing/EntryModal";
import FloatingActions from "@/components/landing/FloatingActions";

function buildWhatsAppUrl(rawNumber?: string | null) {
  const fallback = "5491112345678";
  const clean =
    rawNumber && rawNumber.trim().length > 5
      ? rawNumber.replace(/\D/g, "")
      : fallback;

  return `https://wa.me/${clean}`;
}

export default async function LandingPage() {
  const whatsappNumber = await getWhatsappNumber();
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber);

  // Más adelante esto vendrá desde Supabase
  const vehicles: any[] = [];

  return (
    <main className="min-h-screen flex flex-col bg-[#f6f3ec] text-slate-900">
      <Header />

      <AnnouncementBar />
      <EntryModal />
      <FloatingActions whatsappUrl={whatsappUrl} />

      {/* HERO SIMPLE */}
      <section
        id="hero"
        className="px-6 md:px-10 lg:px-20 pt-8 pb-6 flex flex-col items-center justify-center"
      >
        <div className="max-w-4xl w-full space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-sky-700">
              Consulta para planes 0km
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl leading-tight font-semibold text-slate-900">
              Conocé el{" "}
              <span className="text-sky-700">Plan Nacional tu 0km</span> y consultá si
              podés acceder a cuotas y beneficios especiales.
            </h1>

            <p className="text-sm md:text-[15px] text-slate-700 max-w-2xl">
              Dejá tus datos en un solo paso y un asesor oficial te va a contactar con
              opciones de planes 0km en cuotas, según tu perfil y el cupo disponible en
              cada concesionario. Página pensada sólo para recibir consultas, sin venta
              directa.
            </p>
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

            <p className="text-[11px] text-slate-600 max-w-xs">
              Consulta sin costo ni obligación de compra. Las propuestas dependen de tu
              perfil crediticio y de los cupos vigentes en cada marca.
            </p>
          </div>
        </div>
      </section>

      {/* AUTOS */}
      <section
        id="marcas"
        className="px-6 md:px-10 lg:px-20 pt-2 pb-10 border-t border-slate-200 bg-[#f6f3ec]"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
            Autos alcanzados por el beneficio
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Desde el panel interno vas a cargar los modelos y cuotas de referencia. En la
            landing el usuario sólo ve ejemplos de unidades en promoción (3 filas de 3
            autos como máximo) para motivar la consulta.
          </p>

          <VehiclesGrid vehicles={vehicles} />
        </div>
      </section>

      {/* FORMULARIO PRINCIPAL (UNA COLUMNA) */}
      <section
        id="form"
        className="border-t border-slate-200 bg-[#fdfaf5] px-6 md:px-10 lg:px-20 py-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.06)] p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
              Enviá tu consulta para acceder a cuotas y beneficios en tu 0km.
            </h2>
            <p className="text-sm text-slate-600 mb-5">
              Un asesor oficial va a revisar tu perfil, zona y si tenés auto usado para
              tomar como parte de pago, y se comunicará con vos por WhatsApp o teléfono
              con las alternativas vigentes.
            </p>

            <LeadForm />
          </div>

          <div className="mt-4 space-y-1 text-[11px] text-slate-600">
            <p>
              La información mostrada es orientativa y puede variar según marca, modelo y
              concesionario. Las condiciones finales se acuerdan directamente con la
              concesionaria oficial.
            </p>
            <p className="text-[10px]">
              PlanNacionalTu0km.com.ar es una plataforma privada de asesoría. No pertenece
              al Estado Nacional, Gobierno ni organismos oficiales. No realizamos venta
              directa: sólo derivamos consultas a concesionarios oficiales.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
