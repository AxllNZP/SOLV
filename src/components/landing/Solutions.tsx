"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function Solutions() {
  const { t } = useLocale();

  return (
    <section id="soluciones" className="scroll-mt-20 py-16">
      <h2 className="text-3xl font-bold">{t.solutions.title}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {t.solutions.items.map((s) => (
          <article key={s.title} className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent">
            <h3 className="text-lg font-semibold text-accent2">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
