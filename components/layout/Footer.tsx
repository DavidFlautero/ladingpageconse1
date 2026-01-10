"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/90 px-6 md:px-16 lg:px-24 py-8 text-[11px] text-gray-400">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="space-y-1">
          <p>
            Las imágenes y descripciones exhibidas en este sitio tienen fines
            publicitarios y son meramente ilustrativas, no contractuales. Los
            valores indicados son orientativos y no representan una oferta
            comercial directa. Los precios, bonificaciones y condiciones pueden
            variar según fabricante, disponibilidad o concesionario.
          </p>
          <p className="text-gray-500">
            Última actualización: <span className="font-medium">07/01/2026</span>.
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-gray-300">
            PlanNacionalTu0km.com.ar – Naturaleza del servicio
          </p>
          <p>
            PlanNacionalTu0km.com.ar es una plataforma privada de asesoría y
            derivación de consultas.{" "}
            <span className="font-semibold text-gray-200">
              NO pertenece ni está afiliada al Estado Nacional, Gobierno,
              ministerios, secretarías ni a ningún organismo oficial de la
              República Argentina.
            </span>
          </p>
        </div>

        <div className="space-y-1">
          <p>
            PlanNacionalTu0km.com.ar{" "}
            <span className="font-semibold text-gray-200">
              NO cuenta con vendedores, representantes ni oficinas de atención
              al público
            </span>{" "}
            en ninguna parte del país. No poseemos otros sitios web, sucursales,
            cuentas de WhatsApp ni dominios adicionales fuera del presente.
          </p>
          <p>
            PlanNacionalTu0km.com.ar{" "}
            <span className="font-semibold text-gray-200">
              NO realiza venta directa, no administra grupos de ahorro, no
              suscribe contratos, no gestiona cobranzas, no adjudica unidades
              y no garantiza bonificaciones ni tiempos de entrega.
            </span>
          </p>
        </div>

        <div className="space-y-1">
          <p>
            Los planes de ahorro y operaciones comerciales son realizados
            exclusivamente por Concesionarios Oficiales de cada marca, quienes
            poseen la autorización para la comercialización, publicación y
            suscripción de los planes correspondientes. Toda transacción final
            se realiza directamente entre el usuario y el concesionario. Al
            completar el formulario, el usuario autoriza el uso de sus datos
            para contacto y pre-evaluación por parte de dichos concesionarios.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-2 border-t border-white/10 mt-4">
          <div className="flex flex-wrap gap-3">
            <a href="#" className="hover:text-gray-200 transition">
              Privacidad
            </a>
            <span className="text-gray-600">/</span>
            <a href="#" className="hover:text-gray-200 transition">
              Políticas de uso
            </a>
            <span className="text-gray-600">/</span>
            <a href="#" className="hover:text-gray-200 transition">
              Preguntas frecuentes
            </a>
            <span className="text-gray-600">/</span>
            <a href="#" className="hover:text-gray-200 transition">
              Opiniones y comentarios
            </a>
          </div>

          <div className="text-gray-500">
            ¿Sos concesionario oficial?{" "}
            <a href="#" className="text-gray-200 underline underline-offset-2">
              Publicá tu oferta en el sitio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
