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
