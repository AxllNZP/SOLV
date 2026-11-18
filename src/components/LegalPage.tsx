import { LAST_UPDATED } from "@/lib/site";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted">Última actualización: {LAST_UPDATED}</p>
      <div className="mt-8 space-y-4 leading-7 text-foreground/90 [&_a]:text-accent2 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </main>
  );
}
