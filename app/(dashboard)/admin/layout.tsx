import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Más adelante: protección con auth
  return <DashboardLayout>{children}</DashboardLayout>;
}
