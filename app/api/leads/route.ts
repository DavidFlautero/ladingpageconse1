import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// POST: guardar lead en landing_leads
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("[/api/leads] Body recibido:", body);

    // NOMBRE: aceptamos varios nombres posibles
    const nombreRaw =
      body.nombre ??
      body.full_name ??
      body.nombre_completo ??
      body.name ??
      "";

    const nombre = nombreRaw?.toString().trim();

    // TELEFONO: aceptamos muchas variantes
    let telefono = "";

    const candidatosTelefono = [
      body.telefono,
      body.telefono_numero,
      body.telefonoNumero,
      body.celular,
      body.phone,
      body.whatsapp,
      body.telefono_whatsapp,
    ].filter((v: any) => !!v && String(v).trim() !== "");

    if (candidatosTelefono.length > 0) {
      telefono = String(candidatosTelefono[0]).trim();
    } else {
      const cod = body.telefono_codigo
        ? String(body.telefono_codigo).trim()
        : "";
      const num = body.telefono_numero
        ? String(body.telefono_numero).trim()
        : "";
      telefono = (cod + " " + num).trim();
    }

    console.log("[/api/leads] Normalizado:", { nombre, telefono });

    if (!nombre || !telefono) {
      console.warn(
        "[/api/leads] Falta nombre o teléfono después de normalizar",
        { nombre, telefono }
      );
      return NextResponse.json(
        { ok: false, message: "Nombre y teléfono son obligatorios." },
        { status: 400 }
      );
    }

    const email = body.email
      ? String(body.email).trim()
      : body.correo
      ? String(body.correo).trim()
      : null;

    const provincia = body.provincia
      ? String(body.provincia).trim()
      : body.province
      ? String(body.province).trim()
      : null;

    const localidad = body.localidad
      ? String(body.localidad).trim()
      : body.city
      ? String(body.city).trim()
      : null;

    const canal = body.canal_contacto
      ? String(body.canal_contacto).trim()
      : body.canal
      ? String(body.canal).trim()
      : null;

    const { error } = await supabaseAdmin.from("landing_leads").insert([
      {
        nombre,
        telefono,
        email,
        provincia,
        localidad,
        canal,
      },
    ]);

    if (error) {
      console.error("Insert error en landing_leads:", error);
      return NextResponse.json(
        {
          ok: false,
          message: "No se pudo guardar el formulario.",
          supabaseError: {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          },
        },
        { status: 500 }
      );
    }

    console.log("[/api/leads] Lead guardado OK en landing_leads");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error inesperado en POST /api/leads:", err);
    return NextResponse.json(
      { ok: false, message: "Error inesperado." },
      { status: 500 }
    );
  }
}

// GET: listar últimos leads para el panel
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("landing_leads")
      .select(
        "id, nombre, email, telefono, provincia, localidad, canal, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Error consultando landing_leads:", error);
      return NextResponse.json({ leads: [] }, { status: 500 });
    }

    const leads = (data ?? []).map((row: any) => ({
      id: row.id,
      nombre: row.nombre,
      email: row.email,
      telefono_codigo: null,
      telefono_numero: row.telefono,
      provincia: row.provincia,
      localidad: row.localidad,
      canal_contacto: row.canal,
      created_at: row.created_at,
    }));

    return NextResponse.json({ leads });
  } catch (err) {
    console.error("Error inesperado en GET /api/leads:", err);
    return NextResponse.json({ leads: [] }, { status: 500 });
  }
}
