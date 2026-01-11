import Link from "next/link";
import Header from "@/components/layout/Header";
import LeadForm from "@/components/landing/LeadForm";
import VehiclesGrid from "@/components/landing/VehiclesGrid";
import AnnouncementBar from "@/components/landing/AnnouncementBar";
import EntryModal from "@/components/landing/EntryModal";
import FloatingActions from "@/components/landing/FloatingActions";
import { getWhatsappNumber } from "@/lib/config";

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

  // Más adelante vendrá desde Supabase
  const vehicles: any[] = [];

  return (
    <main className="min-h-screen bg-[#f3f1eb] text-slate-900">
      <Header />
      <AnnouncementBar />
      <EntryModal />
      <FloatingActions whatsappUrl={whatsappUrl} />

      {/* HERO PREMIUM SIMPLE Y ENFOCADO EN LEADS */}
      <section
        id="hero"
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-6 md:px-10 lg:px-20 py-16 md:py-20"
      >
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-semibold leading-tight">
            Consultá si podés acceder a tu{" "}
            <span className="text-sky-400">0km en cuotas</span> según tu perfil.
          </h1>

          <p className="max-w-xl text-[15px] text-slate-200">
            Dejás tus datos una sola vez y un asesor oficial te contacta con opciones
            de concesionarios autorizados. Sin costo, sin venta directa desde este
            sitio y sin compromiso de compra.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#form"
              className="px-7 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-sm font-medium text-white shadow-[0_18px_40px_rgba(56,189,248,0.45)] transition"
            >
              Enviar consulta
            </a>

            <Link
              href={whatsappUrl}
              target="_blank"
              className="px-7 py-3 rounded-full border border-sky-300/70 text-sm font-medium text-sky-200 hover:bg-sky-800/40 transition"
            >
              Hablar por WhatsApp
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-[13px] text-slate-300 pt-2">
            <span>• Consulta sin costo</span>
            <span>• Sin afectar tu scoring</span>
            <span>• Derivación a concesionarios oficiales</span>
          </div>
        </div>
      </section>

      {/* AUTOS ALCANZADOS POR EL BENEFICIO */}
      <section id="marcas" className="px-6 md:px-10 lg:px-20 py-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#f8f5ef] border border-slate-200/70 shadow-[0_16px_45px_rgba(15,23,42,0.15)] px-5 py-7 md:px-8 md:py-9">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
            Autos alcanzados por el beneficio
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-2xl">
            Desde el panel interno vas a poder cargar los modelos de referencia, las
            cuotas estimadas y hasta 4 fotos por vehículo. En la landing se muestran
            solo algunos ejemplos para motivar la consulta (hasta 9 vehículos
            destacados).
          </p>

          <VehiclesGrid vehicles={vehicles} />
        </div>
      </section>

      {/* FORMULARIO PRINCIPAL (PANTALLA CLAVE PARA EL LEAD) */}
      <section id="form" className="px-6 md:px-10 lg:px-20 pb-14">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.18)] px-5 py-8 md:px-8 md:py-10">
          <div className="max-w-3xl mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
              Completá tu consulta para evaluar acceso a cuotas y beneficios.
            </h2>
            <p className="text-sm text-slate-600">
              Un asesor oficial va a revisar tu perfil, zona y si tenés auto usado para
              tomar llave por llave. Después te va a contactar por WhatsApp o teléfono
              con las alternativas vigentes.
            </p>
          </div>

          <LeadForm />

          <div className="mt-4 space-y-1 text-[11px] text-slate-600 max-w-3xl">
            <p>
              La información que recibas puede variar según marca, modelo, concesionario
              y condiciones del momento. Las propuestas finales se acuerdan directamente
              con la concesionaria oficial.
            </p>
            <p className="text-[10px]">
              PlanNacionalTu0km.com.ar es una plataforma privada de asesoría. No
              pertenece al Estado Nacional, Gobierno ni organismos oficiales. No
              realizamos venta directa: solo derivamos consultas a concesionarios
              autorizados.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
