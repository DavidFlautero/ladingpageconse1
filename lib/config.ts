import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server-side

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getWhatsappNumber(): Promise<string | null> {
  const { data, error } = await supabase
    .from("config")
    .select("value")
    .eq("key", "whatsapp_number")
    .maybeSingle();

  if (error) {
    console.error("Error fetching whatsapp_number", error);
    return null;
  }

  return (data?.value as string) ?? null;
}
