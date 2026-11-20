"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export default function Hero() {
  const { t } = useLocale();
  const h = t.hero;

  return (
    <section className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
      <div>
        <span className="inline-block rounded-full border border-border bg-surface px-4 py-1 text-xs font-medium text-accent2">
          {h.badge}
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
          {h.titleStart}
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            {h.titleHighlight}
          </span>
          {h.titleEnd}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{h.text}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/#contacto"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {h.ctaPrimary}
          </Link>
          <Link
            href="/#productos"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent"
          >
            {h.ctaSecondary}
          </Link>
        </div>
      </div>
      <div aria-label={h.pillarsLabel} className="rounded-2xl border border-border bg-surface p-6 shadow-lg">
        <ul className="space-y-4">
          {h.pillars.map((p, i) => (
            <li key={p.title} className="flex gap-4 rounded-xl border border-border bg-background/40 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent2 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
