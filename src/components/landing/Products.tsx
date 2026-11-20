"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function Products() {
  const { t } = useLocale();

  return (
    <section id="productos" className="scroll-mt-20 py-16">
      <h2 className="text-3xl font-bold">{t.productsSection.title}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {t.products.map((p) => (
          <article key={p.id} className="flex flex-col rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent">
            <span className="self-start rounded-full border border-accent/50 px-3 py-1 text-xs font-semibold text-accent">
              {p.badge}
            </span>
            <h3 className="mt-4 text-2xl font-bold text-accent2">{p.name}</h3>
            <p className="mt-1 font-medium">{p.tagline}</p>
            <p className="mt-4 flex-1 leading-relaxed text-muted">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <li key={tag} className="rounded-md bg-background/60 px-2.5 py-1 text-xs text-muted">
                  {tag}
                </li>
              ))}
            </ul>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block self-start rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t.productsSection.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
