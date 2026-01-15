import Link from "next/link";
import Header from "@/components/layout/Header";
import LeadForm from "@/components/landing/LeadForm";
import VehiclesGrid from "@/components/landing/VehiclesGrid";
import AnnouncementBar from "@/components/landing/AnnouncementBar";
import EntryModal from "@/components/landing/EntryModal";
import FloatingActions from "@/components/landing/FloatingActions";
import { getWhatsappNumber } from "@/lib/config";
import VisitTracker from "@/components/landing/VisitTracker"; // 👈 agrega esta línea

function buildWhatsAppUrl(rawNumber?: string | null) {
  const fallback = "5491112345678";
  const clean =
    rawNumber && rawNumber.trim().length > 5
      ? rawNumber.replace(/\D/g, "")
      : fallback;

  return `https://wa.me/${clean}`;
}

export default async function LandingPage() {
  const whatsappNumber = await getWhatsappNumber();
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber);

  // Más adelante vendrá desde Supabase
  const vehicles: any[] = [];

  return (
    <main className="min-h-screen bg-[#f3f1eb] text-slate-900">
      {/* 👇 registra la visita apenas se monta la página */}
      <VisitTracker />

      <Header />
      <AnnouncementBar />
      <EntryModal />
      <FloatingActions whatsappUrl={whatsappUrl} />

      {/* ... resto de tu código igual ... */}
    </main>
  );
}
