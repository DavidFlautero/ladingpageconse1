"use client";

type VehicleCardData = {
  id: string;
  brand: string;
  modelName: string;
  title?: string;
  quotaLabel?: string;
  quotaAmount?: number;
  currency?: string;
  description?: string;
  images?: string[]; // hasta 4 urls
};

interface VehiclesGridProps {
  vehicles: VehicleCardData[];
}

export default function VehiclesGrid({ vehicles }: VehiclesGridProps) {
  const visibleVehicles = vehicles.slice(0, 9); // máx 3 filas x 3 columnas

  if (visibleVehicles.length === 0) {
    return (
      <div className="border border-dashed border-slate-300 rounded-2xl px-4 py-6 text-[12px] text-slate-600 bg-white/70">
        <p className="font-medium text-slate-800 mb-1">
          Próximamente vas a ver acá los modelos amparados por el Plan Nacional tu 0km.
        </p>
        <p>
          Desde el panel interno vas a poder cargar autos por marca, definir la cuota
          estimada, el texto comercial y hasta 4 fotos por vehículo. Una vez que estén
          cargados y activos, se mostrarán automáticamente en esta sección en filas de
          3 autos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      {visibleVehicles.map((auto) => {
        const mainImage = auto.images?.[0];

        return (
          <article
            key={auto.id}
            className="border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[4/3] border-b border-slate-200 bg-slate-50 flex items-center justify-center text-[11px] text-slate-500">
              {mainImage ? (
                // Cuando conectemos Storage, acá va el <Image /> de Next
                <span className="px-3 text-center">
                  Imagen del modelo (se cargará desde el panel)
                </span>
              ) : (
                <span className="px-3 text-center">
                  Aquí se mostrará la foto principal del vehículo cargado desde el panel.
                </span>
              )}
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="space-y-1 mb-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  {auto.brand}
                </p>
                <p className="font-medium text-slate-900">{auto.modelName}</p>
                {auto.title && (
                  <p className="text-[12px] text-slate-600">{auto.title}</p>
                )}
              </div>

              {auto.quotaAmount != null && (
                <div className="mb-2">
                  <p className="text-[11px] text-slate-500">
                    {auto.quotaLabel || "Cuota estimada desde"}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {auto.currency || "ARS"}{" "}
                    {auto.quotaAmount.toLocaleString("es-AR")}
                    <span className="text-[11px] font-normal text-slate-500">
                      {" "}
                      / mes
                    </span>
                  </p>
                </div>
              )}

              {auto.description && (
                <p className="text-[12px] text-slate-600 flex-1">
                  {auto.description}
                </p>
              )}

              <a
                href="#form"
                className="mt-3 inline-flex text-[11px] text-sky-700 hover:text-sky-600 underline underline-offset-2"
              >
                Quiero que me asesoren sobre este tipo de plan
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
