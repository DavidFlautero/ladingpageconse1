import Link from "next/link";
import { getWhatsappNumber } from "@/lib/config";

function buildWhatsAppUrl(rawNumber?: string | null) {
  const fallback = "5491112345678"; // número por defecto si no está configurado
  const number = (rawNumber || fallback).replace(/\D/g, "");
  const message =
    "Hola, quiero que evalúen mi caso para acceder a un 0km por Plan Nacional Tu 0km.";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export default async function HomePage() {
  const whatsappNumber = await getWhatsappNumber();
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050915] via-[#070b18] to-[#05060b] text-slate-100">
      {/* Barra de aviso superior */}
      <div className="w-full bg-sky-600 text-center text-xs md:text-sm py-2">
        <span className="font-medium">Atención:</span>{" "}
        los cupos de evaluación sin costo se actualizan cada 24 hs y dependen
        del mes y del cupo disponible en cada plan.
      </div>

      {/* Contenido principal */}
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-5 py-16 md:flex-row md:items-center md:justify-between md:py-24">
        {/* Columna texto */}
        <div className="max-w-xl space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2" />
            Evaluación de acceso a tu 0km
          </div>

          {/* Título principal */}
          <h1 className="text-3xl leading-tight font-semibold md:text-4xl lg:text-5xl">
            Conocé el{" "}
            <span className="text-sky-400">Plan Nacional Tu 0km</span>{" "}
            y enterate si podés acceder a un{" "}
            <span className="text-white font-bold">beneficio en cuotas.</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-sm md:text-base text-slate-300 max-w-lg">
            Plataforma privada de pre-evaluación según scoring y cupo disponible.
            Si calificás, vas a poder acceder a opciones para tu 0km con
            beneficios exclusivos. Completá tus datos y un asesor autorizado te
            contactará con las alternativas vigentes según tu perfil.
          </p>

          {/* Botones */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#form-evaluacion"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-sky-500 hover:bg-sky-400 transition shadow-lg shadow-sky-500/25"
            >
              Evaluar mi caso
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-emerald-400/60 text-emerald-300 hover:bg-emerald-500/10 transition"
            >
              Hablar por WhatsApp
              <span className="ml-2 text-lg">💬</span>
            </a>
          </div>

          {/* Aviso legal corto */}
          <p className="text-[11px] md:text-xs text-slate-400 max-w-md">
            Evaluación sin costo. No garantiza adjudicación ni entrega; todo
            queda sujeto a scoring, cupo y condiciones vigentes del concesionario
            o plan asociado.
          </p>
        </div>

        {/* Columna decorativa */}
        <div className="mt-10 md:mt-0 md:flex-1 flex justify-center">
          <div className="relative h-56 w-56 md:h-64 md:w-64 rounded-3xl bg-gradient-to-br from-sky-500/20 via-sky-400/10 to-transparent border border-sky-500/30 shadow-[0_0_80px_rgba(56,189,248,0.35)] flex items-center justify-center">
            <div className="absolute inset-6 rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur">
              <div className="h-full w-full flex flex-col items-center justify-center px-6 text-center">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 mb-2">
                  Pre-evaluación online
                </p>
                <p className="text-sm font-semibold text-sky-100">
                  Simulamos tu acceso según scoring
                  <span className="block text-slate-400 text-xs mt-1">
                    Sin afectar tu historial crediticio.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* resto de secciones de la landing debajo */}
    </main>
  );
}
