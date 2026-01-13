import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    console.error("[/api/leads] Error parseando JSON del body");
    return NextResponse.json(
      { ok: false, message: "Payload inválido." },
      { status: 400 }
    );
  }

  console.log("[/api/leads] Body recibido:", body);

  // Normalizamos nombres posibles de campos que puede mandar el form
  const fullNameRaw =
    body.full_name ??
    body.nombre ??
    body.name ??
    "";

  const phoneRaw =
    body.phone ??
    body.telefono_numero ??
    body.telefono ??
    "";

  const fullName = fullNameRaw?.toString().trim();
  const phone = phoneRaw?.toString().trim();

  console.log("[/api/leads] Campos normalizados:", { fullName, phone });

  if (!fullName || !phone) {
    console.warn("[/api/leads] Falta nombre o teléfono", { fullName, phone });
    return NextResponse.json(
      {
        ok: false,
        message: "Nombre y teléfono son obligatorios.",
        debug: { fullName, phone },
      },
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

  // Guardamos también todo el payload original para análisis
  const extraData = body;

  try {
    const { data, error } = await supabaseAdmin
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
      })
      .select()
      .single();

    if (error) {
      console.error("[/api/leads] Error insertando lead en Supabase:", error);
      return NextResponse.json(
        {
          ok: false,
          message: "Error al guardar el lead.",
          debug: {
            supabase: {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code,
            },
          },
        },
        { status: 500 }
      );
    }

    console.log("[/api/leads] Lead guardado correctamente:", data);

    return NextResponse.json(
      { ok: true, leadId: (data as any)?.id ?? null },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[/api/leads] Excepción no controlada:", err);
    return NextResponse.json(
      {
        ok: false,
        message: "Error inesperado al guardar el lead.",
        debug: { error: String(err?.message ?? err) },
      },
      { status: 500 }
    );
  }
}
