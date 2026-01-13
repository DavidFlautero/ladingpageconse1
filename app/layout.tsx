import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plan Nacional Tu 0km | Consulta de acceso a tu 0km en cuotas",
  description:
    "Dejá tus datos una sola vez y un asesor oficial te contacta con opciones de concesionarios autorizados para acceder a tu 0km en cuotas, según tu perfil.",
  metadataBase: new URL("https://www.plannacionaltu0km.online"),
  alternates: {
    canonical: "https://www.plannacionaltu0km.online",
  },
  openGraph: {
    title: "Plan Nacional Tu 0km",
    description:
      "Consulta sin costo para evaluar acceso a planes de 0km en cuotas con concesionarios oficiales.",
    url: "https://www.plannacionaltu0km.online",
    siteName: "Plan Nacional Tu 0km",
    type: "website",
    images: [
      {
        url: "/hero-0km.png",
        width: 1200,
        height: 630,
        alt: "Planes de 0km en cuotas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Nacional Tu 0km",
    description:
      "Consulta sin costo para evaluar acceso a planes de 0km en cuotas con concesionarios oficiales.",
    images: ["/hero-0km.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
