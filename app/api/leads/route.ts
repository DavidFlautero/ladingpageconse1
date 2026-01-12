import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Aceptamos distintas formas de venir los datos
    const nombre: string = (
      body.nombre ??
      body.full_name ??
      ""
    )
      .toString()
      .trim();

    let telefono = "";

    if (body.telefono) {
      telefono = String(body.telefono).trim();
    } else {
      const cod = body.telefono_codigo
        ? String(body.telefono_codigo).trim()
        : "";
      const num = body.telefono_numero
        ? String(body.telefono_numero).trim()
        : "";
      telefono = (cod + " " + num).trim();
    }

    if (!nombre || !telefono) {
      return NextResponse.json(
        { ok: false, message: "Nombre y teléfono son obligatorios." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("landing_leads").insert([
      {
        nombre,
        telefono,
        email: body.email ? String(body.email).trim() : null,
        provincia: body.provincia ? String(body.provincia).trim() : null,
        localidad: body.localidad ? String(body.localidad).trim() : null,
        canal: body.canal_contacto
          ? String(body.canal_contacto).trim()
          : null,
      },
    ]);

    if (error) {
      console.error("Insert error en landing_leads:", error);
      return NextResponse.json(
        { ok: false, message: "No se pudo guardar el formulario." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error inesperado en POST /api/leads:", err);
    return NextResponse.json(
      { ok: false, message: "Error inesperado." },
      { status: 500 }
    );
  }
}

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

    // Normalizamos la respuesta a lo que espera tu dashboard
    const leads = (data ?? []).map((row) => ({
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
