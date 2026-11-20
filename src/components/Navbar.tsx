"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { CONTACT_EMAIL, SITE_NAME, type Locale } from "@/lib/site";

const LOCALES: Locale[] = ["es", "en"];

export default function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const links = [
    { href: "/#soluciones", label: t.nav.solutions },
    { href: "/#productos", label: t.nav.products },
    { href: "/#metodologia", label: t.nav.methodology },
    { href: "/#contacto", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            {SITE_NAME}
          </span>
        </Link>
        <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div role="group" aria-label={t.nav.switchLabel} className="flex overflow-hidden rounded-lg border border-border text-xs font-semibold">
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                className={`px-2.5 py-1.5 transition-colors ${
                  locale === l ? "bg-accent text-white" : "text-muted hover:text-foreground"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent2"
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
