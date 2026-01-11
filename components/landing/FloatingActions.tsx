"use client";

type Props = {
  whatsappUrl: string;
};

export default function FloatingActions({ whatsappUrl }: Props) {
  function scrollToForm() {
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Botón flotante WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        className="fixed z-30 bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full bg-emerald-500 shadow-[0_18px_45px_rgba(22,163,74,0.50)] flex items-center justify-center text-white text-2xl hover:bg-emerald-600"
        aria-label="Hablar por WhatsApp"
      >
        💬
      </a>

      {/* Botón flotante Evaluar */}
      <button
        onClick={scrollToForm}
        className="fixed z-30 bottom-4 left-4 md:bottom-6 md:left-6 px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-sky-700 hover:bg-sky-600 text-xs md:text-sm font-medium text-white shadow-[0_16px_40px_rgba(37,99,235,0.45)]"
      >
        Evaluar mi caso
      </button>
    </>
  );
}
