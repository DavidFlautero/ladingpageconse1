"use client";

import { useState } from "react";
import { sendResetPasswordEmail } from "@/utils/auth/resetPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    try {
      await sendResetPasswordEmail(email);
      setStatus("ok");
    } catch (err: any) {
      console.error("Error al enviar resetPassword:", err);
      setStatus("error");
      setErrorMsg(err?.message ?? "No se pudo enviar el correo.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f1eb] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-6 md:p-8">
        <div className="mb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-2">
            Recuperar acceso
          </p>
          <h1 className="text-xl font-semibold text-slate-900">
            Olvidé mi contraseña
          </h1>
          <p className="text-[13px] text-slate-600 mt-1">
            Ingresá el correo con el que accedés al panel interno. Te vamos a
            enviar un link para restablecer tu contraseña.
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

          {status === "ok" && (
            <p className="text-[12px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
              Te enviamos un correo para restablecer tu contraseña. Revisá
              también la carpeta de spam o promociones.
            </p>
          )}

          {status === "error" && (
            <p className="text-[12px] text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              Error: {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-sky-700 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-sky-600 transition disabled:opacity-70"
          >
            {status === "loading"
              ? "Enviando link..."
              : "Enviar link de recuperación"}
          </button>

          <p className="mt-3 text-[11px] text-slate-500 text-center">
            Si no recibís el correo en unos minutos, verificá que el email sea
            correcto o consultá con el administrador del sistema.
          </p>
        </form>
      </div>
    </main>
  );
}
