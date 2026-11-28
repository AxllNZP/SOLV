import type { Metadata } from "next";
import GuidesIndexView, { type GuideSummary } from "@/components/guides/GuidesIndexView";
import { formatDate, GUIDES, readingMinutes, ROI_PATH, type GuideText } from "@/data/guides";
import { GUIDES_UI } from "@/data/ui-copy";
import type { Locale } from "@/lib/site";

const { title, metaDescription: description } = GUIDES_UI.es;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guias" },
  openGraph: { title, description, url: "/guias", locale: "es_ES", images: ["/og-image.webp"] },
};

const summary = (g: GuideText, updated: string, locale: Locale) => ({
  title: g.title,
  description: g.description,
  category: g.category,
  minutes: readingMinutes(g),
  date: formatDate(updated, locale),
});

export default function GuiasPage() {
  const guides: GuideSummary[] = GUIDES.map((g) => ({
    slug: g.slug,
    es: summary(g, g.updated, "es"),
    en: summary(g.en, g.updated, "en"),
  }));
  return <GuidesIndexView guides={guides} roiPath={ROI_PATH} />;
}
