import CopyEmailButton from "@/components/CopyEmailButton";
import { COMPARINIZADOR_URL, CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

const PILLARS = [
  { title: "Cero fricción operativa", text: "Procesos que corren solos, sin pasos manuales." },
  { title: "Procesamiento local/Edge", text: "Tus datos se procesan en tu navegador o en el borde." },
  { title: "Arquitectura escalable", text: "Mínima superficie, máximo rendimiento y crecimiento." },
];

const SERVICES = [
  {
    title: "Automatización de Flujos y Procesos",
    text: "Eliminamos tareas manuales repetitivas: pipelines de documentos, extracción de datos, scripts a medida e integraciones entre las herramientas que ya usas.",
  },
  {
    title: "Desarrollo Web y Micro-SaaS a Medida",
    text: "Aplicaciones web rápidas y sin exceso de código, plataformas internas y micro-SaaS construidos para resolver un problema concreto de tu negocio.",
  },
  {
    title: "Seguridad Aplicada y Privacidad por Diseño",
    text: "Arquitecturas con procesamiento del lado del cliente, cabeceras CSP estrictas e ingeniería de defensa en profundidad desde el primer día.",
  },
];

const ROADMAP = [
  {
    title: "Auditoría de Cabeceras y Seguridad Web",
    text: "Analiza las cabeceras HTTP y la configuración de seguridad de tu sitio y te indica qué corregir.",
  },
  {
    title: "Conversor y Limpieza Documental Local",
    text: "Convierte y limpia documentos (metadatos incluidos) directamente en tu navegador, sin subir nada.",
  },
];

const STEPS = [
  ["01", "Diagnóstico del cuello de botella", "Medimos dónde se pierde el tiempo y qué tareas conviene automatizar primero."],
  ["02", "Arquitectura mínima viable", "Diseñamos la solución más simple que resuelve el problema, sin sobreingeniería."],
  ["03", "Desarrollo e integración", "Construimos e integramos con tus sistemas, con entregas cortas y verificables."],
  ["04", "Despliegue en Edge y soporte", "Publicamos en infraestructura Edge global y damos soporte continuo."],
];

const FAQ = [
  {
    q: "¿Cuánto tarda una automatización a medida?",
    a: "Depende del alcance. Un script o integración puntual puede estar listo en pocos días; una plataforma interna o micro-SaaS suele requerir entre 3 y 8 semanas. Tras el diagnóstico inicial te entregamos un plazo concreto y entregas parciales para que veas avances desde la primera semana.",
  },
  {
    q: "¿Qué garantías de privacidad ofrecen?",
    a: "Diseñamos para minimizar datos: siempre que es posible el procesamiento ocurre en tu dispositivo y nunca llega a un servidor. Aplicamos cabeceras CSP estrictas, evitamos dependencias innecesarias y no vendemos ni compartimos información con terceros.",
  },
  {
    q: "¿Cómo funcionan las utilidades web gratuitas de SOLV?",
    a: "Son aplicaciones estáticas que se ejecutan por completo en tu navegador, usando Web Workers para el trabajo pesado. Los archivos que abres no se suben a ningún servidor, por lo que funcionan rápido y sin necesidad de crear una cuenta.",
  },
  {
    q: "¿Pueden integrarse con las herramientas que ya usamos?",
    a: "Sí. Trabajamos con APIs, webhooks, hojas de cálculo y sistemas documentales habituales. En el diagnóstico revisamos tu stack actual para proponer integraciones que no obliguen a cambiar tu forma de trabajar.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="inline-block rounded-full border border-border bg-surface px-4 py-1 text-xs font-medium text-accent2">
            Ingeniería de Software · Automatización · Privacidad por Diseño
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            Eliminamos tus cuellos de botella operativos con{" "}
            <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
              automatización y herramientas web de alto rendimiento
            </span>
            , sin exponer tus datos sensibles.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            {SITE_NAME} automatiza flujos repetitivos y construye aplicaciones web veloces que procesan la información
            donde debe estar: en tu dispositivo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Iniciar diagnóstico
            </a>
            <a
              href="#productos"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent"
            >
              Explorar herramientas
            </a>
          </div>
        </div>
        <div
          aria-label={`Pilares de ${SITE_NAME} en ${SITE_URL}`}
          className="rounded-2xl border border-border bg-surface p-6 shadow-lg"
        >
          <ul className="space-y-4">
            {PILLARS.map((p, i) => (
              <li key={p.title} className="flex gap-4 rounded-xl border border-border bg-background/40 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent2 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-semibold">{p.title}</h2>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Soluciones */}
      <section id="soluciones" className="scroll-mt-20 py-16">
        <h2 className="text-3xl font-bold">Servicios de Resolución de Problemas y Automatización</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.title} className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent">
              <h3 className="text-lg font-semibold text-accent2">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="scroll-mt-20 py-16">
        <h2 className="text-3xl font-bold">Ecosistema de Productos Propios</h2>
        <article className="mt-8 rounded-2xl border border-accent/50 bg-surface p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Producto principal</span>
          <h3 className="mt-2 text-2xl font-bold text-accent2">El Comparinizador</h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            Compara documentos PDF, DOCX, TXT y MD en vista lado a lado o en diff unificado, ejecutándose al 100 % dentro
            de tu navegador mediante Web Workers. No hay subidas a servidores: tus archivos nunca salen de tu equipo.
            Genera informes en HTML o TXT sanitizados, listos para compartir o archivar.
          </p>
          <a
            href={COMPARINIZADOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Abrir El Comparinizador
          </a>
        </article>
        <h3 className="mt-10 text-lg font-semibold">Próximamente</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {ROADMAP.map((r) => (
            <article key={r.title} className="rounded-xl border border-dashed border-border bg-surface p-5">
              <h4 className="font-semibold">{r.title}</h4>
              <p className="mt-2 text-sm text-muted">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Metodología */}
      <section id="metodologia" className="scroll-mt-20 py-16">
        <h2 className="text-3xl font-bold">Cómo Trabajamos</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-2">
          {STEPS.map(([n, t, d]) => (
            <li key={n} className="flex gap-4 rounded-xl border border-border bg-surface p-6">
              <span className="text-2xl font-extrabold text-accent">{n}.</span>
              <div>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="mt-14 text-2xl font-bold">Preguntas frecuentes</h3>
        <div className="mt-6 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-surface p-5">
              <summary className="cursor-pointer font-semibold marker:text-accent2">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="scroll-mt-20 py-16 pb-24">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-3xl font-bold">Canal Directo</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Cuéntanos qué proceso te quita tiempo y te respondemos con un primer diagnóstico.
          </p>
          <p className="mt-6 text-xl font-semibold text-accent2">{CONTACT_EMAIL}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Escribir un correo
            </a>
            <CopyEmailButton email={CONTACT_EMAIL} />
          </div>
        </div>
      </section>
    </main>
  );
}
