"use client";

import { useLocale } from "@/components/LocaleProvider";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

export default function Founder() {
  const { t } = useLocale();
  const f = t.founder;
  const isValid = (url: string) => Boolean(url) && !url.includes("{{");
  const links = [
    { href: GITHUB_URL, label: f.github },
    { href: LINKEDIN_URL, label: f.linkedin },
  ].filter((l) => isValid(l.href));
  links.push({ href: `mailto:${CONTACT_EMAIL}`, label: f.email });

  return (
    <section id="fundador" className="scroll-mt-20 py-16">
      <h2 className="text-3xl font-bold">{f.title}</h2>
      <article className="mt-8 flex flex-col items-center gap-6 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-start">
        <img
          src="/founder.webp"
          alt={f.name}
          width={160}
          height={160}
          loading="lazy"
          className="h-40 w-40 shrink-0 rounded-xl border border-border object-cover"
        />
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold">{f.name}</h3>
          <p className="mt-1 text-sm font-medium text-accent2">{f.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{f.bio.join(" ")}</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-accent hover:underline" rel="me noopener">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
