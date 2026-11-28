"use client";

import Link from "next/link";
import GuideContent, { anchorId } from "@/components/guides/GuideContent";
import { useLocale } from "@/components/LocaleProvider";
import type { GuideText } from "@/data/guide-types";
import { AUTHOR_LINE, GUIDES_UI } from "@/data/ui-copy";
import type { Locale } from "@/lib/site";

interface Props {
  text: Record<Locale, GuideText>;
  meta: Record<Locale, { date: string; minutes: number }>;
  related: { slug: string; title: Record<Locale, string> }[];
}

export default function GuideArticleView({ text, meta, related }: Props) {
  const { locale } = useLocale();
  const ui = GUIDES_UI[locale];
  const guide = text[locale];
  const sections = guide.blocks.flatMap((b) => (b.type === "h2" ? [b.text] : []));

  return (
    <main lang={locale} className="mx-auto max-w-3xl px-6 py-16">
      <nav aria-label={ui.breadcrumbLabel} className="text-sm text-muted">
        <Link href="/" className="hover:text-foreground">{ui.home}</Link> /{" "}
        <Link href="/guias" className="hover:text-foreground">{ui.guides}</Link> / {guide.category}
      </nav>
      <article className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{guide.title}</h1>
        <p className="mt-3 text-sm text-muted">
          {ui.by} {AUTHOR_LINE} · {ui.updated} {meta[locale].date} · {meta[locale].minutes} {ui.readingTime}
        </p>
        <p className="mt-4 text-lg leading-8 text-muted">{guide.description}</p>
        <nav aria-label={ui.tocLabel} className="mt-8 rounded-xl border border-border bg-surface p-5">
          <p className="font-semibold">{ui.toc}</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
            {[...sections, ui.faq].map((s) => (
              <li key={s}>
                <a href={`#${anchorId(s)}`} className="hover:text-accent2">{s}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-4">
          <GuideContent blocks={guide.blocks} />
        </div>
        <section className="mt-12">
          <h2 id={anchorId(ui.faq)} className="scroll-mt-24 text-2xl font-bold">{ui.faq}</h2>
          <div className="mt-4 space-y-3">
            {guide.faqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-border bg-surface p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 leading-7 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-lg font-bold">{ui.related}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {related.map((g) => (
            <li key={g.slug}>
              <Link href={`/guias/${g.slug}`} className="text-accent2 hover:underline">{g.title[locale]}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
