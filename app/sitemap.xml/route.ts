import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.plannacionaltu0km.online";

  const urls = [
    "",
    "/#marcas",
    "/#form",
  ];

  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>daily</changefreq>
      <priority>${path === "" ? "1.0" : "0.7"}</priority>
    </url>`
    )
    .join("\n")}
</urlset>
  `.trim();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
