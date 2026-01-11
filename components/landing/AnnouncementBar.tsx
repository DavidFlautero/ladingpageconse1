
"use client";

import { useEffect, useState } from "react";

function getNextWeeklyReset(): number {
  const now = new Date();
  const day = now.getDay(); // 0 = domingo
  // Queremos el próximo domingo a las 00:00 (reinicio semanal)
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

export default function AnnouncementBar() {
  const [remainingMs, setRemainingMs] = useState<number>(
    getNextWeeklyReset() - Date.now()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs(getNextWeeklyReset() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = String(Math.floor((totalSeconds % (60 * 60 * 24)) / 3600)).padStart(
    2,
    "0"
  );
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const days = String(Math.floor(totalSeconds / (60 * 60 * 24))).padStart(2, "0");

  return (
    <section className="border-b border-amber-300/70 bg-amber-100 text-[11px] text-amber-900 py-2">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="font-medium text-center md:text-left">
          ¡Consultá hoy! Los cupos de <span className="font-semibold">consulta sin costo</span>{" "}
          son limitados y se actualizan cada 7 días (reinicio los domingos). Dependen del
          mes y del cupo disponible en cada plan.
        </p>
        <div className="flex items-center gap-1 text-[10px] md:text-[11px] font-semibold text-amber-900">
          <span className="px-2 py-1 rounded-full bg-amber-200/80 border border-amber-300">
            ÚLTIMOS {days} DÍAS {hours}:{minutes}:{seconds} HS
          </span>
        </div>
      </div>
    </section>
  );
}