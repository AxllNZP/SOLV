"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function CopyEmailButton({ email }: { email: string }) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent"
    >
      {copied ? t.contact.copied : t.contact.copy}
    </button>
  );
}
