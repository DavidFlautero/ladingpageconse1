import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * GET /api/dashboard
 * Devuelve:
 *  - visits: por ahora 0 (placeholder)
 *  - leads: cantidad total de leads
 *  - conversion: por ahora 0 (podemos ajustarlo después)
 *  - recent: últimos leads con campos para el panel
 */
export async function GET() {
  const { data, error, count } = await supabaseAdmin
    .from("leads")
    .select(
      "id, nombre, email, telefono_numero, created_at, seguimiento, visto",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("GET /api/dashboard error", error);
    return NextResponse.json(
      {
        visits: 0,
        leads: 0,
        conversion: 0,
        recent: [],
      },
      { status: 500 }
    );
  }

  const visits = 0; // placeholder, luego lo conectamos a métricas reales
  const leads = count ?? data?.length ?? 0;
  const conversion = 0;

  return NextResponse.json({
    visits,
    leads,
    conversion,
    recent: data ?? [],
  });
}

/**
 * POST /api/dashboard
 * type = "update_lead"
 *    body: { id, seguimiento?, visto? }
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.type === "update_lead") {
    const { id, seguimiento, visto } = body;

    if (!id) {
      return NextResponse.json(
        { message: "id de lead requerido." },
        { status: 400 }
      );
    }

    const update: Record<string, any> = {};
    if (seguimiento !== undefined) update.seguimiento = seguimiento;
    if (visto !== undefined) update.visto = visto;

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { message: "Nada para actualizar." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .update(update)
      .eq("id", id)
      .select(
        "id, nombre, email, telefono_numero, created_at, seguimiento, visto"
      )
      .single();

    if (error) {
      console.error("POST /api/dashboard (update_lead) error", error);
      return NextResponse.json(
        { message: "No se pudo actualizar el lead." },
        { status: 500 }
      );
    }

    return NextResponse.json({ lead: data });
  }

  return NextResponse.json({ message: "Tipo no soportado." }, { status: 400 });
}
