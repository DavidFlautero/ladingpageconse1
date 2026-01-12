import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * GET /api/dashboard
 *  - visits: placeholder (0 por ahora)
 *  - leads: cantidad total
 *  - conversion: placeholder (0)
 *  - recent: últimos leads desde landing_leads
 */
export async function GET() {
  const { data, error, count } = await supabaseAdmin
    .from("landing_leads")
    .select(
      "id, nombre, email, telefono, created_at, seguimiento, visto",
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

  const visits = 0; // más adelante conectamos visitas reales
  const leads = count ?? data?.length ?? 0;
  const conversion = 0;

  // Adaptamos telefono -> telefono_numero para el front
  const recent = (data ?? []).map((l: any) => ({
    id: l.id,
    nombre: l.nombre,
    email: l.email,
    telefono_numero: l.telefono ?? "",
    created_at: l.created_at ?? null,
    seguimiento: l.seguimiento ?? null,
    visto: l.visto ?? null,
  }));

  return NextResponse.json({
    visits,
    leads,
    conversion,
    recent,
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
      .from("landing_leads")
      .update(update)
      .eq("id", id)
      .select(
        "id, nombre, email, telefono, created_at, seguimiento, visto"
      )
      .single();

    if (error) {
      console.error("POST /api/dashboard (update_lead) error", error);
      return NextResponse.json(
        { message: "No se pudo actualizar el lead." },
        { status: 500 }
      );
    }

    // Volvemos a adaptar telefono -> telefono_numero para el front
    const leadAdaptado = {
      id: data.id,
      nombre: data.nombre,
      email: data.email,
      telefono_numero: data.telefono ?? "",
      created_at: data.created_at ?? null,
      seguimiento: data.seguimiento ?? null,
      visto: data.visto ?? null,
    };

    return NextResponse.json({ lead: leadAdaptado });
  }

  return NextResponse.json({ message: "Tipo no soportado." }, { status: 400 });
}
