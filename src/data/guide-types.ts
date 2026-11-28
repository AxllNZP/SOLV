/** Texto en línea: admite **negrita**, `código` y [enlaces](url). */
export type Inline = string;

export type GuideBlock =
  | { type: "p"; text: Inline }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: Inline[] }
  | { type: "table"; caption: string; head: string[]; rows: Inline[][] }
  | { type: "code"; label: string; code: string }
  | { type: "note"; title: string; text: Inline };

export interface Faq {
  q: string;
  a: string;
}

/** Contenido traducible de una guía. */
export interface GuideText {
  title: string;
  description: string;
  category: string;
  blocks: GuideBlock[];
  faqs: Faq[];
}

/** Guía base en español. */
export interface Guide extends GuideText {
  slug: string;
  /** Fecha ISO (AAAA-MM-DD). */
  published: string;
  updated: string;
}

export interface LocalizedGuide extends Guide {
  en: GuideText;
}
