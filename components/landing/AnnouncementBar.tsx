"use client";

import { useEffect, useState } from "react";

function getNextWeeklyReset(): number {
  const now = new Date();
  const day = now.getDay(); // 0 = domingo
  // Próximo domingo a las 00:00 (reinicio semanal)
  const daysUntilSunday = (7 - day) % 7 || 7; // si hoy es domingo, 7 días
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilSunday,
    0,
    0,
    0,
    0
  );
  return target.getTime();
}

function getRemainingParts(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return {
    days,
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

export default function AnnouncementBar() {
  const [target, setTarget] = useState<number>(() => getNextWeeklyReset());
  const [remainingMs, setRemainingMs] = useState<number>(
    () => getNextWeeklyReset() - Date.now()
  );

  useEffect(() => {
    const id = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) {
        // Reiniciar ciclo semanal
        const next = getNextWeeklyReset();
        setTarget(next);
        setRemainingMs(next - Date.now());
      } else {
        setRemainingMs(diff);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  const { days, hours, minutes, seconds } = getRemainingParts(remainingMs);

  return (
    <div className="w-full bg-amber-50 border-b border-amber-200 text-amber-900 text-xs sm:text-sm">
      <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
        <p className="font-medium">
          ¡Consultá hoy!{" "}
          <span className="hidden sm:inline">
            Cupos limitados por semana para acceder al beneficio.
          </span>
        </p>
        <p className="text-[11px] sm:text-xs font-semibold tracking-wide">
          ÚLTIMOS{" "}
          <span className="font-bold">
            {days.toString().padStart(2, "0")} DÍAS {hours}:{minutes}:{seconds} HS
          </span>
        </p>
      </div>
    </div>
  );
}
