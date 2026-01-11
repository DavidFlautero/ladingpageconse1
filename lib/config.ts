import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// NO tirar error en build: solo avisar
if (!supabaseUrl) {
  console.warn(
    "NEXT_PUBLIC_SUPABASE_URL no está definida. El cliente de Supabase quedará deshabilitado."
  );
}

if (!supabaseKey) {
  console.warn(
    "SUPABASE_SERVICE_ROLE_KEY no está definida. El cliente de Supabase quedará deshabilitado."
  );
}

// Si tenemos todo, creamos el cliente; si no, exportamos null
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * Obtiene el número de WhatsApp configurado en la base de datos.
 * Devuelve:
 *  - string con el número (sin + ni guiones, tipo 54911...)
 *  - o null si no está configurado o hay error.
 *
 * IMPORTANTE: no lanza errores, para no romper el build ni el SSR.
 */
export async function getWhatsappNumber(): Promise<string | null> {
  if (!supabase) {
    // Sin Supabase configurado, devolvemos null y que la llamada use el fallback
    return null;
  }

  try {
    // Ajustá el nombre de tabla y columna a lo que tengas realmente en Supabase
    const { data, error } = await supabase
      .from("config_whatsapp")
      .select("number")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error al obtener número de WhatsApp desde Supabase:", error);
      return null;
    }

    // @ts-ignore – dependemos del esquema real
    const number = data?.number as string | undefined;

    if (!number) return null;

    return number;
  } catch (err) {
    console.error("Error inesperado en getWhatsappNumber:", err);
    return null;
  }
}
