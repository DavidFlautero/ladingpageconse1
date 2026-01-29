import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

function daysAgo(n: number): Date {
  const now = new Date();
  return new Date(now.getTime() - n * 24 * 60 * 60 * 1000);
}

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        message:
          "Supabase envs faltantes. Configurá NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (o NEXT_PUBLIC_SUPABASE_ANON_KEY).",
        today: 0,
        last7d: 0,
        last30d: 0,
      },
      { status: 500 }
    );
  }

  const supabase = supabaseAdmin!;

  const todayStart = startOfToday();
  const last7dStart = daysAgo(7);
  const last30dStart = daysAgo(30);

  async function countVisitsSince(since: Date) {
    const { count, error } = await supabase
      .from("landing_events")
      .select("id", { count: "exact", head: true })
      .eq("event_type", "visit")
      .gte("created_at", since.toISOString());

    if (error) {
      console.error("[/api/visits-metrics] Error contando visitas:", error);
      throw error;
    }

    return count ?? 0;
  }

  try {
    const [today, last7d, last30d] = await Promise.all([
      countVisitsSince(todayStart),
      countVisitsSince(last7dStart),
      countVisitsSince(last30dStart),
    ]);

    return NextResponse.json({
      today,
      last7d,
      last30d,
    });
  } catch (err) {
    console.error("[/api/visits-metrics] Error general:", err);
    return NextResponse.json(
      { error: "No se pudieron obtener las métricas de visitas" },
      { status: 500 }
    );
  }
}
