"use server";

import { supabaseAdmin } from "./supabaseAdmin";

// Ajustá estos valores si tu tabla/columnas tienen otros nombres
const TABLE = "config";
const KEY_COLUMN = "key";
const VALUE_COLUMN = "value";
const KEY = "whatsapp_number";

export async function getWhatsappNumber(): Promise<string | null> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select(`${VALUE_COLUMN}`)
    .eq(KEY_COLUMN, KEY)
    .maybeSingle();

  if (error) {
    console.error("getWhatsappNumber error", error);
    return null;
  }

  // @ts-ignore: acceso dinámico por nombre de columna
  const raw = data ? (data[VALUE_COLUMN] as string | null) : null;
  return raw ?? null;
}
