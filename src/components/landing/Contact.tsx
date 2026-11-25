"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import CopyEmailButton from "@/components/CopyEmailButton";
import { useLocale } from "@/components/LocaleProvider";
import { CONTACT_EMAIL, GMAIL_COMPOSE_URL, WEB3FORMS_ACCESS_KEY, WEB3FORMS_URL } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none";

export default function Contact() {
  const { t } = useLocale();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: f.subject,
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          botcheck: "",
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("submit failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="scroll-mt-20 py-16 pb-24">
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-3xl font-bold">{t.contact.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t.contact.text}</p>
        <p className="mt-6 text-xl font-semibold text-accent2">{CONTACT_EMAIL}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <CopyEmailButton email={CONTACT_EMAIL} />
          <a
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent"
          >
            {t.contact.gmail}
          </a>
        </div>

        <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-xl space-y-4 text-left">
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <label className="block text-sm font-medium">
            {f.name}
            <input type="text" name="name" required placeholder={f.namePlaceholder} className={`${fieldClass} mt-1`} />
          </label>
          <label className="block text-sm font-medium">
            {f.email}
            <input type="email" name="email" required placeholder={f.emailPlaceholder} className={`${fieldClass} mt-1`} />
          </label>
          <label className="block text-sm font-medium">
            {f.message}
            <textarea name="message" required rows={4} placeholder={f.messagePlaceholder} className={`${fieldClass} mt-1`} />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? f.sending : f.submit}
          </button>
          <p className="text-center text-xs text-muted [&_a]:text-accent2 [&_a]:underline">
            {f.legalBefore}
            <Link href="/privacidad">{f.legalLink}</Link>
            {f.legalAfter}
          </p>
          <p role="status" aria-live="polite" className="min-h-5 text-center text-sm">
            {status === "success" && <span className="text-accent2">{f.success}</span>}
            {status === "error" && <span className="text-red-400">{f.error}</span>}
          </p>
        </form>
      </div>
    </section>
  );
}
