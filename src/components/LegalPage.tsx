"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { LEGAL_COPY, type LegalBlock, type LegalPageKey, type LegalSegment } from "@/lib/site";

function SegmentLink({ label, href }: { label: string; href: string }) {
  if (href.startsWith("/")) return <Link href={href}>{label}</Link>;
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return <a href={href}>{label}</a>;
}

function Segments({ content }: { content: LegalSegment[] }) {
  return (
    <>
      {content.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <SegmentLink key={i} label={seg.label} href={seg.href} />
        ),
      )}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "p") {
    return (
      <p>
        <Segments content={block.content} />
      </p>
    );
  }
  return (
    <ul>
      {block.items.map((item, i) => (
        <li key={i}>
          {item.lead ? <strong>{item.lead}</strong> : null}
          <Segments content={item.content} />
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage({ page }: { page: LegalPageKey }) {
  const { locale } = useLocale();
  const copy = LEGAL_COPY[locale];
  const doc = copy.pages[page];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-muted">
        {copy.updatedLabel}: {copy.updatedDate}
      </p>
      <div className="mt-8 space-y-4 leading-7 text-foreground/90 [&_a]:text-accent2 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {doc.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </main>
  );
}
