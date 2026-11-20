"use client";

import CopyEmailButton from "@/components/CopyEmailButton";
import { useLocale } from "@/components/LocaleProvider";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Contact() {
  const { t } = useLocale();

  return (
    <section id="contacto" className="scroll-mt-20 py-16 pb-24">
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-3xl font-bold">{t.contact.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t.contact.text}</p>
        <p className="mt-6 text-xl font-semibold text-accent2">{CONTACT_EMAIL}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t.contact.primary}
          </a>
          <CopyEmailButton email={CONTACT_EMAIL} />
        </div>
      </div>
    </section>
  );
}
