import { createClient } from "@/utils/supabase/client";

export async function sendResetPasswordEmail(email: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });

  if (error) {
    console.error("Error resetPasswordForEmail:", error);
    throw error;
  }
}
