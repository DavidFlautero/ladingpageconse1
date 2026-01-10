import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Plan Nacional tu 0km",
  description:
    "PlanNacionalTu0km.com.ar es una plataforma privada de asesoría y captación de leads para acceso a vehículos 0km y usados llave por llave. No pertenece al Gobierno ni a organismos oficiales.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-b from-[#05070B] via-[#020308] to-black text-white min-h-screen antialiased">
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
