import Link from "next/link";
import type { GuideBlock } from "@/data/guides";

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("`")) {
          return (
            <code key={i} className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent2">
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (!link) return part;
        const [, label, href] = link;
        const className = "text-accent2 underline";
        return href.startsWith("/") ? (
          <Link key={i} href={href} className={className}>
            {label}
          </Link>
        ) : (
          <a key={i} href={href} className={className} target="_blank" rel="noopener">
            {label}
          </a>
        );
      })}
    </>
  );
}

export function anchorId(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={anchorId(block.text)} className="scroll-mt-24 pt-8 text-2xl font-bold text-foreground">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-3 text-lg font-semibold text-foreground">{block.text}</h3>;
    case "p":
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List className={`space-y-2 pl-6 ${block.type === "ul" ? "list-disc" : "list-decimal"}`}>
          {block.items.map((item) => (
            <li key={item}>
              <Rich text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[34rem] text-left text-sm leading-6">
            <caption className="bg-surface px-4 py-3 text-left font-semibold">{block.caption}</caption>
            <thead className="border-y border-border bg-surface text-muted">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-2 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-border last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-2 align-top">
                      <Rich text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "code":
      return (
        <figure className="overflow-hidden rounded-xl border border-border bg-surface">
          <figcaption className="border-b border-border px-4 py-2 text-xs font-semibold text-muted">
            {block.label}
          </figcaption>
          <pre className="overflow-x-auto p-4 text-xs leading-6">
            <code className="font-mono">{block.code}</code>
          </pre>
        </figure>
      );
    case "note":
      return (
        <aside className="rounded-xl border-l-4 border-accent bg-surface p-4">
          <p className="font-semibold">{block.title}</p>
          <p className="mt-1">
            <Rich text={block.text} />
          </p>
        </aside>
      );
  }
}

export default function GuideContent({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-4 leading-7 text-foreground/90">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
