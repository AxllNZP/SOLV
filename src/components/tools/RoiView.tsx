"use client";

import Link from "next/link";
import GuideContent from "@/components/guides/GuideContent";
import { useLocale } from "@/components/LocaleProvider";
import RoiCalculator from "@/components/tools/RoiCalculator";
import { ROI_COPY } from "@/data/roi-copy";

export default function RoiView() {
  const { locale } = useLocale();
  const copy = ROI_COPY[locale];

  return (
    <main lang={locale} className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{copy.title}</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        {copy.description} {copy.intro} {copy.guidesLead}{" "}
        <Link href="/guias" className="text-accent2 underline">{copy.guidesLink}</Link>.
      </p>
      <div className="mt-8">
        <RoiCalculator />
      </div>
      <div className="mt-8 max-w-3xl">
        <GuideContent blocks={copy.methodology} />
      </div>
    </main>
  );
}
