import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/privacidad", label: "Política de Privacidad" },
  { href: "/terminos", label: "Términos de Uso" },
  { href: "/cookies", label: "Política de Cookies" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-2">
        <div>
          <p className="text-lg font-extrabold text-accent">{SITE_NAME}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Estudio digital que crea herramientas web ágiles y privadas, que se ejecutan en tu navegador.
          </p>
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
        © {SITE_NAME}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
