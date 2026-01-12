import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Usamos service_role si existe, si no, anon key.
// Para este proyecto, con anon key alcanza para signInWithPassword.
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL o key no configuradas en el entorno.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
