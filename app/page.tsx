import Link from "next/link";
import Header from "@/components/layout/Header";
import LeadForm from "@/components/landing/LeadForm";
import AnnouncementBar from "@/components/landing/AnnouncementBar";
import EntryModal from "@/components/landing/EntryModal";
import FloatingActions from "@/components/landing/FloatingActions";
import { getWhatsappNumber } from "@/lib/config";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function buildWhatsAppUrl(rawNumber?: string | null) {
  const fallback = "5491112345678";
  const clean =
    rawNumber && rawNumber.trim().length > 5
      ? rawNumber.replace(/\D/g, "")
      : fallback;

  return `https://wa.me/${clean}`;
}

type Vehicle = {
  id: number;
  title: string;
  cuota_desde: number | null;
  moneda: string | null;
  imagen_url: string | null;
  imagen_url_2: string | null;
  imagen_url_3: string | null;
};

type Section = {
  id: number;
  title: string;
  slug: string | null;
  order_index: number | null;
  visible: boolean | null;
  vehicles: Vehicle[];
};

async function getVehicleSectionsForLanding(): Promise<Section[]> {
  const { data, error } = await supabaseAdmin
    .from("vehicle_sections")
    .select(
      `
      id,
      title,
      slug,
      order_index,
      visible,
      vehicles:vehicles (
        id,
        title,
        cuota_desde,
        moneda,
        imagen_url,
        imagen_url_2,
        imagen_url_3,
        orden
      )
    `
    )
    .order("order_index", { ascending: true })
    .order("orden", { foreignTable: "vehicles", ascending: true });

  if (error) {
    console.error("Error cargando vehicle_sections para landing:", error);
    return [];
  }

  return (data as Section[]) ?? [];
}

export default async function LandingPage() {
  const whatsappNumber = await getWhatsappNumber();
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber);

  const sections = await getVehicleSectionsForLanding();

  const sectionsVisibles = sections.filter(
    (s) => s.visible === true || s.visible === null || s.visible === undefined
  );

  const sectionsConAutos = sectionsVisibles.filter(
    (s) => s.vehicles && s.vehicles.length > 0
  );

  return (
    <main className="min-h-screen bg-[#f3f1eb] text-slate-900">
      <Header />
      <AnnouncementBar />
      <EntryModal />
      <FloatingActions whatsappUrl={whatsappUrl} />

      {/* HERO */}
      <section id="hero" className="px-4 md:px-6 lg:px-8 pt-8 pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_28px_80px_rgba(15,23,42,0.65)]">
            <div className="absolute inset-0 bg-[url('/hero-0km.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-slate-950/60" />

            <div className="relative px-6 py-10 md:px-10 md:py-14 text-white">
              <div className="max-w-3xl space-y-5">

                <p className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Consulta de acceso a tu 0km
                </p>

                <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-semibold leading-tight">
                  Consultá si podés acceder a tu{" "}
                  <span className="text-sky-300">0km en cuotas</span> según tu perfil.
                </h1>

                <p className="max-w-xl text-[15px] text-slate-200">
                  Dejá tus datos una sola vez y un asesor oficial te contacta con opciones
                  de concesionarios autorizados. Sin costo, sin venta directa desde este sitio
                  y sin compromiso de compra.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">

                  <a
                    href="#form"
                    className="px-7 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-sm font-medium text-white shadow-[0_18px_40px_rgba(56,189,248,0.55)] transition"
                  >
                    Enviar consulta
                  </a>

                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_38px_rgba(37,211,102,0.55)] hover:bg-[#20bd5a] transition"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                        <path d="M20.52 3.48A11.8 11.8 0 0 0 12.01 0C5.73 0 .61 5.12.61 11.4c0 2.01.53 3.97 1.55 5.7L0 24l7.09-2.19a11.37 11.37 0 0 0 4.92 1.13h.01c6.28 0 11.4-5.12 11.4-11.4 0-3.05-1.19-5.91-3.4-8.06Z" />
                      </svg>
                    </span>
                    Hablar por WhatsApp
                  </Link>

                  <p className="text-[11px] text-slate-200 max-w-xs">
                    Consulta sin costo. No impacta tu scoring. Te contactan solo por alternativas aplicables.
                  </p>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOS ALCANZADOS POR EL BENEFICIO */}
      <section id="marcas" className="px-6 md:px-10 lg:px-20 pb-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#f8f5ef] border border-slate-200/70 shadow-[0_16px_45px_rgba(15,23,42,0.15)] px-5 py-7 md:px-8 md:py-9">

          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
            Autos alcanzados por el beneficio
          </h2>

          <p className="text-sm text-slate-600 mb-6 max-w-2xl">
            Los modelos se cargan desde el panel interno y se muestran aquí automáticamente.
          </p>

          {sectionsConAutos.length === 0 ? (
            <p className="text-sm text-slate-500">
              Próximamente vas a ver aquí los modelos destacados.
            </p>
          ) : (
            <div className="space-y-8">

              {sectionsConAutos.map((section) => (
                <div key={section.id}>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">
                    {section.title}
                  </h3>

                  <div className="grid gap-4 md:grid-cols-3">
                    {section.vehicles.slice(0, 3).map((v) => (
                      <article
                        key={v.id}
                        className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col"
                      >
                        {v.imagen_url && (
                          <div className="aspect-[4/3] w-full overflow-hidden">
                            <img
                              src={v.imagen_url}
                              alt={v.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="p-4 flex flex-col gap-1">
                          <h4 className="text-sm font-semibold text-slate-900">
                            {v.title}
                          </h4>
                          {v.cuota_desde != null && (
                            <p className="text-xs text-slate-600">
                              Cuota estimada desde{" "}
                              <span className="font-semibold">
                                {v.moneda === "ARS" ? "$" : ""}
                                {new Intl.NumberFormat("es-AR").format(
                                  Number(v.cuota_desde)
                                )}
                              </span>
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* FORMULARIO */}
      <section id="form" className="px-6 md:px-10 lg:px-20 pb-14">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.18)] px-5 py-8 md:px-8 md:py-10">

          <div className="max-w-3xl mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
              Completá tu consulta para evaluar acceso a cuotas y beneficios.
            </h2>
            <p className="text-sm text-slate-600">
              Te contactará un asesor oficial según tu perfil, zona y vehículo disponible.
            </p>
          </div>

          <LeadForm />

          <div className="mt-4 space-y-1 text-[11px] text-slate-600 max-w-3xl">
            <p>
              La información puede variar según marca, modelo y concesionario. Las propuestas finales se acuerdan directamente con la concesionaria oficial.
            </p>
            <p className="text-[10px]">
              PlanNacionalTu0km.com.ar es una plataforma de asesoría privada. No es un organismo estatal.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
