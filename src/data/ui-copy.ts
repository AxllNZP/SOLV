import { FOUNDER_NAME, SITE_NAME, type Locale } from "@/lib/site";

export const AUTHOR_LINE = `${FOUNDER_NAME} · ${SITE_NAME}`;

const es = {
  title: "Guías técnicas de automatización, privacidad y web",
  metaDescription:
    "Guías prácticas de SOLV sobre comparación de contratos, extracción de facturas, seguridad en el uso de IA, arquitectura en el borde y márgenes en Amazon FBA.",
  intro:
    "Material de trabajo para equipos que quieren dejar de hacer a mano lo que una máquina hace mejor, sin perder el control de sus datos. Cada guía incluye tablas comparativas, ejemplos que puedes reproducir, diagramas de arquitectura y preguntas frecuentes.",
  readingTime: "min de lectura",
  roiTitle: "Calculadora de ahorro y ROI por automatización",
  roiText:
    "Estima cuánto cuesta hoy un proceso manual y en cuántos meses se recupera la inversión en automatizarlo. Los cálculos se hacen en tu navegador.",
  roiButton: "Abrir calculadora",
  breadcrumbLabel: "Ruta de navegación",
  home: "Inicio",
  guides: "Guías",
  by: "Por",
  updated: "Actualizado el",
  tocLabel: "Contenido",
  toc: "En esta guía",
  faq: "Preguntas frecuentes",
  related: "Sigue leyendo",
};

export const GUIDES_UI: Record<Locale, typeof es> = {
  es,
  en: {
    title: "Technical guides on automation, privacy and the web",
    metaDescription:
      "Practical SOLV guides on contract comparison, invoice extraction, safe use of AI, edge architecture and Amazon FBA margins.",
    intro:
      "Working material for teams that want to stop doing by hand what a machine does better, without losing control of their data. Each guide includes comparison tables, examples you can reproduce, architecture diagrams and frequently asked questions.",
    readingTime: "min read",
    roiTitle: "Automation savings and ROI calculator",
    roiText:
      "Estimate what a manual process costs today and how many months it takes to recover the investment in automating it. All calculations happen in your browser.",
    roiButton: "Open calculator",
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    guides: "Guides",
    by: "By",
    updated: "Updated on",
    tocLabel: "Contents",
    toc: "In this guide",
    faq: "Frequently asked questions",
    related: "Keep reading",
  },
};
