import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Plataforma Plan Nacional 0km",
  description: "Landing premium + panel administrativo para planes nacionales",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-b from-[#05070B] via-[#020308] to-black text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
