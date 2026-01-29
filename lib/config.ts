"use server";

import { supabaseAdmin } from "./supabaseAdmin";

// Ajustá estos valores si tu tabla/columnas tienen otros nombres
const TABLE = "config";
const KEY_COLUMN = "key";
const VALUE_COLUMN = "value";
const KEY = "whatsapp_number";

function supabaseGuard() {
  if (!supabaseAdmin) {
    console.error(
      "[lib/config] Supabase envs faltantes. Configurá NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (o NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
    return null;
  }
  return supabaseAdmin;
}

export async function getWhatsappNumber(): Promise<string | null> {
  const sb = supabaseGuard();
  if (!sb) return null;

  const { data, error } = await sb
    .from(TABLE)
    .select(`${VALUE_COLUMN}`)
    .eq(KEY_COLUMN, KEY)
    .maybeSingle();

  if (error) {
    console.error("getWhatsappNumber error", error);
    return null;
  }

  // acceso dinámico por nombre de columna
  const raw = data ? ((data as any)[VALUE_COLUMN] as string | null) : null;
  return raw ?? null;
}
