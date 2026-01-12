import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    // visitas (eventos type = 'visit')
    const { count: visitsCount, error: visitsError } = await supabaseAdmin
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("type", "visit");

    // leads (cantidad total)
    const { count: leadsCount, error: leadsError } = await supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true });

    // clics a WhatsApp
    const { count: waCount, error: waError } = await supabaseAdmin
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("type", "whatsapp_click");

    if (visitsError || leadsError || waError) {
      console.error("Error en dashboard:", visitsError, leadsError, waError);
    }

    const visits = visitsCount ?? 0;
    const leads = leadsCount ?? 0;
    const conversion = visits > 0 ? (leads / visits) * 100 : 0;
    const whatsappClicks = waCount ?? 0;

    const { data: recentLeads, error: recentError } = await supabaseAdmin
      .from("leads")
      .select(
        `
        id,
        nombre,
        provincia,
        localidad,
        canal_contacto,
        created_at
      `
      )
      .order("created_at", { ascending: false })
      .limit(10);

    if (recentError) {
      console.error("Error obteniendo últimos leads:", recentError);
    }

    return NextResponse.json(
      {
        visits,
        leads,
        conversion,
        whatsappClicks,
        recentLeads: recentLeads ?? [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error en GET /api/dashboard:", err);
    return NextResponse.json(
      { error: "No se pudieron obtener las métricas." },
      { status: 500 }
    );
  }
}
