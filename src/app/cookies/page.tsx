import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: `Información sobre las cookies y tecnologías similares que utiliza ${SITE_URL}, incluida la publicidad de Google AdSense.`,
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return <LegalPage page="cookies" />;
}
