import type { GuideBlock, GuideText, LocalizedGuide } from "@/data/guide-types";
import type { Locale } from "@/lib/site";
import compararContratos from "@/data/content/comparar-contratos";
import extraccionFacturas from "@/data/content/extraccion-facturas";
import seguridadIa from "@/data/content/seguridad-ia";
import arquitecturaBorde from "@/data/content/arquitectura-borde";
import margenAmazonFba from "@/data/content/margen-amazon-fba";
import compararContratosEn from "@/data/content/en/comparar-contratos";
import extraccionFacturasEn from "@/data/content/en/extraccion-facturas";
import seguridadIaEn from "@/data/content/en/seguridad-ia";
import arquitecturaBordeEn from "@/data/content/en/arquitectura-borde";
import margenAmazonFbaEn from "@/data/content/en/margen-amazon-fba";

export type { Faq, Guide, GuideBlock, GuideText, LocalizedGuide } from "@/data/guide-types";

export const GUIDES: LocalizedGuide[] = [
  { ...compararContratos, en: compararContratosEn },
  { ...extraccionFacturas, en: extraccionFacturasEn },
  { ...seguridadIa, en: seguridadIaEn },
  { ...arquitecturaBorde, en: arquitecturaBordeEn },
  { ...margenAmazonFba, en: margenAmazonFbaEn },
];

export const ROI_PATH = "/herramientas/calculadora-roi";

export function getGuide(slug: string): LocalizedGuide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function localize({ title, description, category, blocks, faqs, en }: LocalizedGuide): Record<Locale, GuideText> {
  return { es: { title, description, category, blocks, faqs }, en };
}

function blockText(block: GuideBlock): string {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "table":
      return [block.caption, ...block.head, ...block.rows.flat()].join(" ");
    case "code":
      return `${block.label} ${block.code}`;
    case "note":
      return `${block.title} ${block.text}`;
    default:
      return block.text;
  }
}

export function wordCount(guide: GuideText): number {
  const text = [...guide.blocks.map(blockText), ...guide.faqs.flatMap((f) => [f.q, f.a])].join(" ");
  return text.replace(/\]\([^)]*\)/g, "]").split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

export function readingMinutes(guide: GuideText): number {
  return Math.ceil(wordCount(guide) / 200);
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(iso),
  );
}
