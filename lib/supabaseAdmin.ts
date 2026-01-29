import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Preferimos service_role. Si no, anon.
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let _client: SupabaseClient | null = null;

/**
 * No hacemos throw al importar (evita romper next build / vercel).
 * Si faltan envs, devolvemos null.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (_client) return _client;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  _client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _client;
}

/**
 * Mantiene compatibilidad con tu código actual:
 * import { supabaseAdmin } from "@/lib/supabaseAdmin";
 */
export const supabaseAdmin = getSupabaseAdmin();
