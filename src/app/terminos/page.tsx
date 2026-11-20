import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: `Condiciones de uso del sitio ${SITE_URL} y de las herramientas web de ${SITE_NAME}.`,
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return <LegalPage page="terms" />;
}
