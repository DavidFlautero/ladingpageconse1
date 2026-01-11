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
      {/* HERO PREMIUM */}
      <section
        id="hero"
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 md:px-10 lg:px-20 py-20"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-start gap-6">

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Accedé a tu <span className="text-sky-400">0km</span> en cuotas según tu perfil.
          </h1>

          <p className="text-slate-300 max-w-xl text-[15px]">
            Dejás tus datos y un asesor oficial te contacta con las alternativas vigentes de concesionarios autorizados. Sin costo, sin venta directa, sin compromiso.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#form"
              className="px-7 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg"
            >
              Enviar consulta
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              className="px-7 py-3 rounded-full border border-sky-300 text-sky-300 hover:bg-sky-700/30 transition"
            >
              Hablar por WhatsApp
            </a>
          </div>

          <div className="flex gap-6 text-[13px] text-slate-400 mt-4">
            <span>• Consulta sin costo</span>
            <span>• Sin afectar tu scoring</span>
            <span>• Asesores certificados</span>
          </div>
        </div>
      </section>
      <section id="form" className="bg-[#faf8f2] py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Completá tu consulta
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            Un asesor oficial te contactará con las alternativas vigentes.
          </p>

          <LeadForm />
        </div>
      </section>
