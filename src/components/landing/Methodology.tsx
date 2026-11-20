"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function Methodology() {
  const { t } = useLocale();

  return (
    <section id="metodologia" className="scroll-mt-20 py-16">
      <h2 className="text-3xl font-bold">{t.methodology.title}</h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-2">
        {t.methodology.steps.map((s, i) => (
          <li key={s.title} className="flex gap-4 rounded-xl border border-border bg-surface p-6">
            <span className="text-2xl font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <h3 className="mt-14 text-2xl font-bold">{t.methodology.faqTitle}</h3>
      <div className="mt-6 space-y-3">
        {t.faq.map((f) => (
          <details key={f.q} className="group rounded-xl border border-border bg-surface p-5">
            <summary className="cursor-pointer font-semibold marker:text-accent2">{f.q}</summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
