"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export default function Footer() {
  const { t } = useLocale();
  const links = [
    { href: "/", label: t.footer.home },
    { href: "/guias", label: t.footer.guides },
    { href: "/herramientas/calculadora-roi", label: t.footer.roi },
    { href: "/privacidad", label: t.footer.privacy },
    { href: "/terminos", label: t.footer.terms },
    { href: "/cookies", label: t.footer.cookies },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-2">
        <div>
          <img src="/logo-horizontal.webp" alt="SOLV QUEST" width={160} height={80} loading="lazy" className="h-auto w-40" />
          <p className="mt-2 max-w-sm text-sm text-muted">{t.footer.description}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-block text-sm text-accent2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <ul className="grid gap-2 text-sm text-muted md:justify-items-end">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-foreground">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-border py-4 text-center text-xs text-muted">
        © {SITE_NAME}. {t.footer.rights}
      </p>
    </footer>
  );
}
