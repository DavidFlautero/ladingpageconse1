import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.plannacionaltu0km.online";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Si en el futuro querés indexar otras rutas públicas, las agregás acá:
    // {
    //   url: `${baseUrl}/otra-ruta`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.6,
    // },
  ];
}
