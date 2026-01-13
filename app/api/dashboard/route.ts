import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * GET /api/dashboard
 * Devuelve métricas básicas + últimos leads desde landing_leads.
 */
export async function GET() {
  const { data, error, count } = await supabaseAdmin
    .from("landing_leads")
    .select("*", { count: "exact" })
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

  const leads = (data ?? []) as any[];

  const adapted = leads.map((l) => ({
    ...l,
    telefono_numero: l.telefono_numero ?? l.telefono ?? "",
  }));

  const visits = 0;
  const leadsCount = count ?? adapted.length;
  const conversion =
    visits > 0 ? Number(((leadsCount / visits) * 100).toFixed(1)) : 0;

  return NextResponse.json({
    visits,
    leads: leadsCount,
    conversion,
    recent: adapted,
  });
}

/**
 * POST /api/dashboard
 *  - type = "update_lead": actualizar datos / seguimiento / estado / visto
 *  - type = "delete_lead": borrar lead
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.type === "update_lead") {
    const { id, nombre, email, telefono, seguimiento, visto, estado } = body;

    if (!id) {
      return NextResponse.json(
        { message: "id de lead requerido." },
        { status: 400 }
      );
    }

    const update: Record<string, any> = {};

    if (nombre !== undefined) update.nombre = nombre;
    if (email !== undefined) update.email = email;
    if (telefono !== undefined) {
      // en la tabla usamos "telefono"
      update.telefono = telefono;
    }
    if (seguimiento !== undefined) update.seguimiento = seguimiento;
    if (visto !== undefined) update.visto = visto;
    if (estado !== undefined) update.estado = estado;

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
      .select("*")
      .single();

    if (error) {
      console.error("POST /api/dashboard (update_lead) error", error);
      return NextResponse.json(
        { message: "No se pudo actualizar el lead." },
        { status: 500 }
      );
    }

    const adapted = {
      ...data,
      telefono_numero: data.telefono_numero ?? data.telefono ?? "",
    };

    return NextResponse.json({ lead: adapted });
  }

  if (body.type === "delete_lead") {
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "id de lead requerido." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("landing_leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("POST /api/dashboard (delete_lead) error", error);
      return NextResponse.json(
        { message: "No se pudo borrar el lead." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ message: "Tipo no soportado." }, { status: 400 });
}
