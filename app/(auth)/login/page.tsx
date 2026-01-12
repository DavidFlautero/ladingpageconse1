"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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
      const endpoint = `${supabaseUrl.replace(/\/$/, "")}/auth/v1/token?grant_type=password`;

      console.log("AUTH_ENDPOINT:", endpoint);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      console.log("AUTH_STATUS:", res.status);

      if (!res.ok) {
        let detail = "";
        try {
          const data = await res.json();
          detail = data?.error_description || data?.message || JSON.stringify(data);
        } catch {
          detail = await res.text();
        }

        setErrorMsg(
          `Error al iniciar sesión (status ${res.status}): ${
            detail || "credenciales inválidas o error en el servidor"
          }`
        );
        setLoading(false);
        return;
      }

      // Si llega aquí, Supabase devolvió un token válido
      const data = await res.json();
      console.log("AUTH_SUCCESS_PAYLOAD:", data);

      // TODO: acá podrías guardar el access_token en cookies/localStorage
      // por ahora, simplemente redirigimos al panel
      router.push("/admin");
    } catch (err: any) {
      console.error("Error login (catch):", err);
      setErrorMsg(`Error de red: ${err?.message || "No se pudo conectar con Supabase"}`);
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

          {/* DEBUG TEMPORAL: podés borrar esto después */}
          <div className="mt-4 border-t border-slate-200 pt-2">
            <p className="text-[10px] text-slate-500">
              DEBUG URL: <span className="font-mono">{supabaseUrl}</span>
            </p>
            <p className="text-[10px] text-slate-500">
              DEBUG KEY prefix:{" "}
              <span className="font-mono">
                {typeof supabaseAnonKey === "string"
                  ? supabaseAnonKey.slice(0, 15)
                  : "no-key"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
