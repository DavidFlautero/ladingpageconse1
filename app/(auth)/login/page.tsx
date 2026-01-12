"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente público para login
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      console.log("SUPABASE LOGIN RESPONSE:", { data, error });

      if (error) {
        // Mostramos el mensaje completo para ver qué está pasando
        setErrorMsg(`Error al iniciar sesión: ${error.message}`);
        setLoading(false);
        return;
      }

      // Login OK → redirigimos al panel
      router.push("/admin");
    } catch (err: any) {
      console.error("Error login (catch):", err);
      setErrorMsg("Error inesperado al conectar con Supabase.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f1eb] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-6 md:p-8">
        <div className="mb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-2">
            Panel interior
          </p>
          <h1 className="text-xl font-semibold text-slate-900">
            Iniciar sesión
          </h1>
          <p className="text-[13px] text-slate-600 mt-1">
            Acceso exclusivo para concesionarios y administradores.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              placeholder="admin@tu0km.com"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-[12px] text-red-600">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-sky-700 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-sky-600 transition disabled:opacity-70"
          >
            {loading ? "Ingresando..." : "Para entrar"}
          </button>

          <p className="mt-3 text-[11px] text-slate-500 text-center">
            Si no tenés usuario, solicitá acceso al administrador del sistema.
          </p>
        </form>
      </div>
    </main>
  );
}
