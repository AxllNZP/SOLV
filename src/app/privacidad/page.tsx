import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Cómo ${SITE_NAME} trata los datos personales y la información de quienes visitan ${SITE_URL}.`,
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return <LegalPage page="privacy" />;
}
