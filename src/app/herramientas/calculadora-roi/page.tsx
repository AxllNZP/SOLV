import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import RoiView from "@/components/tools/RoiView";
import { ROI_PATH } from "@/data/guides";
import { ROI_COPY } from "@/data/roi-copy";
import { SITE_URL } from "@/lib/site";

const { title, description } = ROI_COPY.es;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: ROI_PATH },
  openGraph: { title, description, url: ROI_PATH, locale: "es_ES", images: ["/og-image.webp"] },
};

export default function CalculadoraRoiPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: title,
          description,
          url: `${SITE_URL}${ROI_PATH}`,
          inLanguage: ["es", "en"],
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <RoiView />
    </>
  );
}
