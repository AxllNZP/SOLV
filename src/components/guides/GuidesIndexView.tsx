"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { GUIDES_UI } from "@/data/ui-copy";
import type { Locale } from "@/lib/site";

type SummaryText = { title: string; description: string; category: string; minutes: number; date: string };
export type GuideSummary = { slug: string } & Record<Locale, SummaryText>;

export default function GuidesIndexView({ guides, roiPath }: { guides: GuideSummary[]; roiPath: string }) {
  const { locale } = useLocale();
  const ui = GUIDES_UI[locale];

  return (
    <main lang={locale} className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{ui.title}</h1>
      <p className="mt-4 leading-7 text-muted">{ui.intro}</p>
      <ul className="mt-10 grid gap-4">
        {guides.map((g) => (
          <li key={g.slug} className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent">
            <p className="text-xs font-semibold text-accent2">
              {g[locale].category} · {g[locale].minutes} {ui.readingTime} · {g[locale].date}
            </p>
            <h2 className="mt-2 text-xl font-bold">
              <Link href={`/guias/${g.slug}`} className="hover:text-accent2">
                {g[locale].title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{g[locale].description}</p>
          </li>
        ))}
      </ul>
      <section className="mt-10 rounded-xl border border-accent/40 p-6">
        <h2 className="text-xl font-bold">{ui.roiTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{ui.roiText}</p>
        <Link href={roiPath} className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent2">
          {ui.roiButton}
        </Link>
      </section>
    </main>
  );
}
