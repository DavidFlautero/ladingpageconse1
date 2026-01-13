import { redirect } from "next/navigation";

export default function ContenidoPage() {
  // Este módulo se desactiva: siempre mandamos al dashboard principal
  redirect("/admin");
}
