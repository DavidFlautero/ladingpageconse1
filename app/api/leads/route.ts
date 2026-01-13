import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Payload inválido." },
      { status: 400 }
    );
  }

  // Aceptar distintos nombres según lo que mande el formulario
  const fullName = (
    body.full_name ??
    body.nombre ??
    body.name ??
    ""
  )
    .toString()
    .trim();

  const phone = (
    body.phone ??
    body.telefono_numero ??
    body.telefono ??
    ""
  )
    .toString()
    .trim();

  if (!fullName || !phone) {
    return NextResponse.json(
      { ok: false, message: "Nombre y teléfono son obligatorios." },
      { status: 400 }
    );
  }

  const email =
    (body.email ?? body.correo ?? body.mail ?? null) || null;

  const province =
    (body.province ?? body.provincia ?? null) || null;

  const city =
    (body.city ?? body.localidad ?? null) || null;

  const vehicleInterest =
    (body.vehicle_interest ?? body.auto_deseado ?? body.modelo_interes ?? null) || null;

  // Guardamos todo el payload también como extra_data
  const extraData = body;

  const { error } = await supabaseAdmin
    .from("leads")
    .insert({
      full_name: fullName,
      phone,
      email,
      province,
      city,
      vehicle_interest: vehicleInterest,
      extra_data: extraData,
      source: "landing",
      status: "new",
    });

  if (error) {
    console.error("Error insertando lead:", error);
    return NextResponse.json(
      { ok: false, message: "Error al guardar el lead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
