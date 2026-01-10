"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  label: string;
  href: string;
  pro?: boolean;
};

const items: Item[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Contenido", href: "/admin/contenido" },
  { label: "Vendedores", href: "/admin/vendedores", pro: true },
  { label: "Campañas", href: "/admin/campañas", pro: true },
  { label: "Configuración", href: "/admin/configuracion" },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-60 border-r border-gray-900 bg-black">
      <div className="h-16 flex items-center px-5 border-b border-gray-900">
        <span className="tracking-[0.2em] text-xs text-gray-500">
          PLAN 0KM
        </span>
      </div>

      <nav className="mt-4">
        {items.map((i) => {
          const active = path === i.href;
          return (
            <Link
              key={i.href}
              href={i.href}
              className={`flex justify-between px-5 py-2 text-sm ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-900"
              }`}
            >
              {i.label}
              {i.pro && (
                <span className="text-[10px] px-2 py-0.5 border border-gray-700 rounded-full">
                  Pro
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
