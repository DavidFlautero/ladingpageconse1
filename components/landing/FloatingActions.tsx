"use client";

import Link from "next/link";

interface Props {
  whatsappUrl: string;
}

export default function FloatingActions({ whatsappUrl }: Props) {
  if (!whatsappUrl) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      <Link
        href={whatsappUrl}
        target="_blank"
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] shadow-[0_18px_40px_rgba(37,211,102,0.6)] hover:bg-[#20bd5a] transition"
        aria-label="Hablar por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-white"
        >
          <path d="M20.52 3.48A11.8 11.8 0 0 0 12.01 0C5.73 0 .61 5.12.61 11.4c0 2.01.53 3.97 1.55 5.7L0 24l7.09-2.19a11.37 11.37 0 0 0 4.92 1.13h.01c6.28 0 11.4-5.12 11.4-11.4 0-3.05-1.19-5.91-3.4-8.06ZM12.01 21.3c-1.57 0-3.1-.42-4.44-1.21l-.32-.19-4.21 1.3 1.37-4.09-.21-.33A9.3 9.3 0 0 1 2.3 11.4c0-5.35 4.35-9.7 9.71-9.7 2.59 0 5.02 1.01 6.85 2.85a9.58 9.58 0 0 1 2.84 6.86c0 5.35-4.35 9.7-9.69 9.7Zm5.32-7.04c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.2-.63.05-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.73-1.61-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.51.07-.78.36-.26.29-1.02.99-1.02 2.42 0 1.43 1.04 2.81 1.19 3 .15.19 2.06 3.15 4.99 4.42.7.3 1.25.48 1.68.62.71.23 1.35.2 1.86.12.57-.08 1.7-.7 1.94-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
        </svg>
      </Link>
    </div>
  );
}
