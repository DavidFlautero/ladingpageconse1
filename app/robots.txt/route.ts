import { NextResponse } from "next/server";

export async function GET() {
  const body = `
User-agent: *
Allow: /

Sitemap: https://www.plannacionaltu0km.online/sitemap.xml
  `.trim();

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
