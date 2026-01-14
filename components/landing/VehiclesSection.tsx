"use client";

import { useState } from "react";
import LeadForm from "@/components/landing/LeadForm";

type Vehicle = {
  id: number;
  title: string;
  cuota_desde: number | null;
  moneda: string | null;
  imagen_url: string | null;
  imagen_url_2: string | null;
  imagen_url_3: string | null;
};

type Section = {
  id: number;
  title: string;
  slug: string | null;
  order_index: number | null;
  visible: boolean | null;
  vehicles: Vehicle[];
};

type Props = {
  sections: Section[];
};

type SelectedVehicle = {
  sectionTitle: string;
  vehicle: Vehicle;
};

export default function VehiclesSection({ sections }: Props) {
  const [selected, setSelected] = useState<SelectedVehicle | null>(null);

  const handleReserve = (sectionTitle: string, vehicle: Vehicle) => {
    setSelected({ sectionTitle, vehicle });
  };

  const handleClose = () => {
    setSelected(null);
  };

  return (
    <>
      {/* Grilla de secciones + cards */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-base font-semibold text-slate-900 mb-3">
              {section.title}
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              {section.vehicles.map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col hover:shadow-[0_16px_40px_rgba(15,23,42,0.20)] hover:-translate-y-0.5 transition"
                >
                  {v.imagen_url && (
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={v.imagen_url}
                        alt={`${section.title} ${v.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4 flex flex-col gap-2 flex-1">
                    {/* título + badge tasa */}
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">
                        {section.title} {v.title}
                      </h4>
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        Tasa 0%*
                      </span>
                    </div>

                    {/* texto de cuotas */}
                    {v.cuota_desde != null && (
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Cuotas desde </span>
                        <span className="font-semibold">
                          {v.moneda === "ARS" ? "$" : ""}
                          {new Intl.NumberFormat("es-AR").format(
                            Number(v.cuota_desde)
                          )}
                        </span>
                      </p>
                    )}

                    {/* botón reserva */}
                    <button
                      type="button"
                      onClick={() => handleReserve(section.title, v)}
                      className="mt-3 inline-flex items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-3 py-2 text-xs md:text-sm font-semibold text-white hover:bg-blue-700 transition"
                    >
                      Reservá tu cupo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de reserva */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2 sm:px-4">
          <div
            className="
              w-full max-w-sm sm:max-w-md md:max-w-lg
              rounded-2xl bg-white shadow-xl relative
              p-4 sm:p-5
              max-h-[85vh] md:max-h-[70vh]
              overflow-y-auto
            "
          >
            {/* botón cerrar */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ×
            </button>

            {/* header */}
            <div className="mb-3 pr-7">
              <h2 className="text-lg font-semibold text-gray-900">
                Reservá tu cupo
              </h2>
              <p className="text-sm text-gray-600">
                {selected.sectionTitle} {selected.vehicle.title} · Cuotas desde{" "}
                {selected.vehicle.cuota_desde != null && (
                  <span className="font-semibold">
                    {selected.vehicle.moneda === "ARS" ? "$" : ""}
                    {new Intl.NumberFormat("es-AR").format(
                      Number(selected.vehicle.cuota_desde)
                    )}
                  </span>
                )}
              </p>
            </div>

            {/* mini foto + texto */}
            <div className="flex gap-3 mb-4">
              {selected.vehicle.imagen_url && (
                <img
                  src={selected.vehicle.imagen_url}
                  alt={`${selected.sectionTitle} ${selected.vehicle.title}`}
                  className="h-16 w-24 sm:h-20 sm:w-32 rounded-lg object-cover"
                />
              )}
              <p className="text-xs text-gray-500">
                Completá tus datos y un asesor te va a contactar, principalmente
                por WhatsApp, para confirmar la disponibilidad y condiciones del
                plan para este modelo.
              </p>
            </div>

            {/* formulario de lead existente */}
            <div className="border-t border-slate-200 pt-3">
              <LeadForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
