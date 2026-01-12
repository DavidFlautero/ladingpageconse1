import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET: listar últimos leads para el dashboard
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select(
      `
      id,
      nombre,
      email,
      telefono_codigo,
      telefono_numero,
      provincia,
      localidad,
      canal_contacto,
      created_at
    `
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error leyendo leads:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener los leads" },
      { status: 500 }
    );
  }

  return NextResponse.json({ leads: data ?? [] }, { status: 200 });
}

// POST: guardar un nuevo lead
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      email,
      telefonoCodigo,
      telefonoNumero,
      provincia,
      localidad,
      horarioDesde,
      horarioHasta,
      canalContacto,
      comentario,
      marcaInteres,
      modeloInteres,
    } = body || {};

    if (!nombre || !email || !telefonoNumero) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios." },
        { status: 400 }
      );
    }

    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        nombre,
        email,
        telefono_codigo: telefonoCodigo,
        telefono_numero: telefonoNumero,
        provincia,
        localidad,
        horario_desde: horarioDesde,
        horario_hasta: horarioHasta,
        canal_contacto: canalContacto,
        comentario,
        marca_interes: marcaInteres,
        modelo_interes: modeloInteres,
      })
      .select()
      .single();

    if (error) {
      console.error("Error insertando lead:", error);
      return NextResponse.json(
        { error: "No se pudo guardar el lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch (err) {
    console.error("Error en POST /api/leads:", err);
    return NextResponse.json(
      { error: "Error interno al procesar el lead." },
      { status: 500 }
    );
  }
}
