import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const links = [
  { href: "/#soluciones", label: "Soluciones" },
  { href: "/#productos", label: "Productos" },
  { href: "/#metodologia", label: "Metodología" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent2"
        >
          Contactar
        </a>
      </nav>
    </header>
  );
}
