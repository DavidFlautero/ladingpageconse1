"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    // Registramos una visita al cargar el cliente
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit" }),
    }).catch(() => {
      // No rompemos la UI si falla
    });
  }, []);

  // No renderiza nada, solo dispara el evento
  return null;
}
