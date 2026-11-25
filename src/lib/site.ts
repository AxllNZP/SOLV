export const SITE_NAME: string = "SOLV";
export const SITE_URL: string = "https://solv.quest";
export const CONTACT_EMAIL: string = "contact@solv.quest";
export const GMAIL_COMPOSE_URL: string = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=Diagnostico%20SOLV`;
export const WEB3FORMS_URL: string = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY: string = "87625477-5283-42f2-ad56-fce272d8041d";
export const ADSENSE_CLIENT: string = "ca-pub-6708132675087655";
export const COMPARINIZADOR_URL: string = "https://comparinizador.solv.quest";
export const AMAZON_FBA_URL: string = "https://amazon-fba.solv.quest";
export const FOUNDER_NAME: string = "Axell Zurita";
export const GITHUB_URL: string = "https://github.com/AxllNZP";
export const LINKEDIN_URL: string = "https://www.linkedin.com/in/axell-zurita-a7502b343/";
export const LAST_UPDATED: string = "17 de noviembre de 2026";

export type Locale = "es" | "en";

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  tags: string[];
  badge: string;
}

const esCopy = {
  nav: {
    solutions: "Soluciones",
    products: "Productos",
    methodology: "Metodología",
    contact: "Contacto",
    cta: "Contactar",
    switchLabel: "Cambiar idioma",
  },
  hero: {
    badge: "Ingeniería de Software · Automatización · Privacidad por Diseño",
    titleStart: "Eliminamos tus cuellos de botella operativos con ",
    titleHighlight: "automatización y herramientas web de alto rendimiento",
    titleEnd: ", sin exponer tus datos sensibles.",
    text: "SOLV resuelve cuellos de botella operativos y construye herramientas rápidas que procesan la información donde debe estar: en tu dispositivo o en el borde de la red.",
    ctaPrimary: "Iniciar diagnóstico",
    ctaSecondary: "Explorar herramientas",
    pillarsLabel: "Pilares de SOLV",
    pillars: [
      { title: "Cero fricción operativa", text: "Procesos que corren solos, sin pasos manuales." },
      { title: "Procesamiento 100% local / Edge", text: "Tus datos se procesan en tu navegador o en el borde." },
      { title: "Arquitectura escalable", text: "Mínima superficie, máximo rendimiento y crecimiento." },
    ],
  },
  solutions: {
    title: "Servicios de Resolución de Problemas y Automatización",
    items: [
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
    ],
  },
  productsSection: {
    title: "Ecosistema de Productos Propios",
    cta: "Abrir herramienta",
  },
  products: [
    {
      id: "comparinizador",
      name: "El Comparinizador",
      tagline: "Compara documentos sin subirlos a ningún servidor",
      description:
        "Compara documentos PDF, DOCX, TXT y MD en vista lado a lado o en diff unificado, ejecutándose al 100 % dentro de tu navegador mediante Web Workers. Genera informes HTML o TXT sanitizados, listos para compartir o archivar.",
      url: COMPARINIZADOR_URL,
      tags: ["PDF", "DOCX", "Diff", "Web Workers"],
      badge: "ES · 100% Local",
    },
    {
      id: "amazon-fba",
      name: "Amazon FBA Profit & Fee Calculator (2026)",
      tagline: "Calcula comisiones y beneficio real de tus productos en Amazon",
      description:
        "Calculadora gratuita de tarifas FBA, comisiones y margen neto para vendedores de Amazon US, con las tarifas vigentes de 2026. Estima costes, beneficio por unidad y ROI sin crear una cuenta.",
      url: AMAZON_FBA_URL,
      tags: ["Amazon FBA", "Comisiones", "Margen", "ROI"],
      badge: "EN / ES · Amazon US",
    },
  ] as ProductItem[],
  methodology: {
    title: "Cómo Trabajamos",
    faqTitle: "Preguntas frecuentes",
    steps: [
      { title: "Diagnóstico del cuello de botella", text: "Medimos dónde se pierde el tiempo y qué tareas conviene automatizar primero." },
      { title: "Arquitectura mínima viable", text: "Diseñamos la solución más simple que resuelve el problema, sin sobreingeniería." },
      { title: "Desarrollo e integración", text: "Construimos e integramos con tus sistemas, con entregas cortas y verificables." },
      { title: "Despliegue en Edge y soporte", text: "Publicamos en infraestructura Edge global y damos soporte continuo." },
    ],
  },
  faq: [
    {
      q: "¿Cuánto tarda una automatización a medida?",
      a: "Depende del alcance. Un script o integración puntual puede estar listo en pocos días; una plataforma interna o micro-SaaS suele requerir entre 3 y 8 semanas. Tras el diagnóstico inicial te entregamos un plazo concreto y entregas parciales para que veas avances desde la primera semana.",
    },
    {
      q: "¿Mis datos se envían a algún servidor?",
      a: "No cuando es evitable. Diseñamos para minimizar datos: el procesamiento ocurre en tu navegador y los archivos que abres nunca llegan a un servidor. Aplicamos cabeceras CSP estrictas y no vendemos ni compartimos información con terceros.",
    },
    {
      q: "¿Por qué las herramientas web de SOLV son gratuitas?",
      a: "Son aplicaciones estáticas desplegadas en infraestructura Edge de muy bajo coste, y se sostienen con publicidad no intrusiva. No necesitas cuenta ni tarjeta, y el servicio de desarrollo a medida es lo que financia nuevas herramientas.",
    },
    {
      q: "¿Qué tan precisos son los cálculos de FBA y la comparación de documentos?",
      a: "La calculadora FBA usa las tablas de tarifas publicadas por Amazon para 2026 y muestra cada componente del cálculo para que puedas verificarlo; es una estimación y no sustituye tu informe oficial. El Comparinizador compara el texto extraído de forma determinista, y para PDFs escaneados incluye OCR local ejecutado en el navegador mediante Tesseract.js, por lo que tus archivos siguen sin salir de tu dispositivo.",
    },
  ],
  founder: {
    title: "Quién lidera SOLV",
    name: FOUNDER_NAME,
    role: "Fundador & Ingeniero de Software en SOLV",
    bio: [
      "Automatizo procesos operativos para que tu equipo deje de perder tiempo en tareas manuales.",
      "Desarrollo web rápido y sin exceso de código, pensado para el borde de la red.",
      "Construyo herramientas con privacidad por diseño: tus datos se procesan en tu dispositivo.",
    ],
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Correo",
  },
  contact: {
    title: "Canal Directo",
    text: "Cuéntanos qué proceso te quita tiempo y te respondemos con un primer diagnóstico.",
    gmail: "Abrir en Gmail Web",
    copy: "Copiar correo",
    copied: "Copiado",
    form: {
      name: "Nombre / Empresa",
      namePlaceholder: "Tu nombre o el de tu empresa",
      email: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      message: "Descripción breve del cuello de botella o proyecto",
      messagePlaceholder: "¿Qué proceso te quita tiempo o qué quieres construir?",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      success: "¡Mensaje enviado! Te responderemos pronto con un primer diagnóstico.",
      error: "No pudimos enviar el mensaje. Revisa tu conexión e inténtalo de nuevo, o escríbenos por correo.",
      subject: "Nuevo diagnóstico desde solv.quest",
      legalBefore: "Al enviar este formulario aceptas nuestra ",
      legalLink: "Política de Privacidad",
      legalAfter: ". Usamos tus datos únicamente para responder tu consulta.",
    },
  },
  footer: {
    description: "Estudio digital que crea herramientas web ágiles y privadas, que se ejecutan en tu navegador.",
    rights: "Todos los derechos reservados.",
    home: "Inicio",
    privacy: "Política de Privacidad",
    terms: "Términos de Uso",
    cookies: "Política de Cookies",
  },
};

export type SiteCopy = typeof esCopy;

export const COPY: Record<Locale, SiteCopy> = {
  es: esCopy,
  en: {
    nav: {
      solutions: "Solutions",
      products: "Products",
      methodology: "Methodology",
      contact: "Contact",
      cta: "Get in touch",
      switchLabel: "Switch language",
    },
    hero: {
      badge: "Software Engineering · Automation · Privacy by Design",
      titleStart: "We remove your operational bottlenecks with ",
      titleHighlight: "automation and high-performance web tools",
      titleEnd: ", without exposing your sensitive data.",
      text: "SOLV solves operational bottlenecks and builds fast tools that process information where it belongs: on your device or at the network edge.",
      ctaPrimary: "Start a diagnosis",
      ctaSecondary: "Explore tools",
      pillarsLabel: "SOLV pillars",
      pillars: [
        { title: "Zero operational friction", text: "Processes that run on their own, with no manual steps." },
        { title: "100% local / Edge processing", text: "Your data is processed in your browser or at the edge." },
        { title: "Scalable architecture", text: "Minimal surface, maximum performance and room to grow." },
      ],
    },
    solutions: {
      title: "Problem-Solving and Automation Services",
      items: [
        {
          title: "Workflow and Process Automation",
          text: "We eliminate repetitive manual tasks: document pipelines, data extraction, custom scripts and integrations between the tools you already use.",
        },
        {
          title: "Custom Web Development and Micro-SaaS",
          text: "Fast, lean web apps, internal platforms and micro-SaaS products built to solve one concrete problem in your business.",
        },
        {
          title: "Applied Security and Privacy by Design",
          text: "Client-side processing architectures, strict CSP headers and defense-in-depth engineering from day one.",
        },
      ],
    },
    productsSection: {
      title: "Our Own Product Ecosystem",
      cta: "Open tool",
    },
    products: [
      {
        id: "comparinizador",
        name: "El Comparinizador",
        tagline: "Compare documents without uploading them to any server",
        description:
          "Compare PDF, DOCX, TXT and MD documents side by side or as a unified diff, running 100% in your browser through Web Workers. Generates sanitized HTML or TXT reports ready to share or archive. Interface in Spanish.",
        url: COMPARINIZADOR_URL,
        tags: ["PDF", "DOCX", "Diff", "Web Workers"],
        badge: "ES · 100% Local",
      },
      {
        id: "amazon-fba",
        name: "Amazon FBA Profit & Fee Calculator (2026)",
        tagline: "Calculate fees and real profit for your Amazon products",
        description:
          "Free calculator for FBA fees, referral commissions and net margin for Amazon US sellers, using current 2026 rates. Estimate costs, profit per unit and ROI without creating an account.",
        url: AMAZON_FBA_URL,
        tags: ["Amazon FBA", "Fees", "Margin", "ROI"],
        badge: "EN / ES · Amazon US",
      },
    ],
    methodology: {
      title: "How We Work",
      faqTitle: "Frequently asked questions",
      steps: [
        { title: "Bottleneck diagnosis", text: "We measure where time is lost and which tasks are worth automating first." },
        { title: "Minimum viable architecture", text: "We design the simplest solution that solves the problem, with no over-engineering." },
        { title: "Development and integration", text: "We build and integrate with your systems, delivering in short, verifiable increments." },
        { title: "Edge deployment and support", text: "We ship on global Edge infrastructure and provide ongoing support." },
      ],
    },
    faq: [
      {
        q: "How long does a custom automation take?",
        a: "It depends on scope. A one-off script or integration can be ready in a few days; an internal platform or micro-SaaS usually takes 3 to 8 weeks. After the initial diagnosis we give you a concrete timeline and partial deliveries so you see progress from the first week.",
      },
      {
        q: "Is my data sent to any server?",
        a: "Not when it can be avoided. We design to minimize data: processing happens in your browser and the files you open never reach a server. We apply strict CSP headers and never sell or share information with third parties.",
      },
      {
        q: "Why are SOLV's web tools free?",
        a: "They are static apps deployed on very low-cost Edge infrastructure, supported by non-intrusive advertising. You need no account or card, and our custom development services fund new tools.",
      },
      {
        q: "How accurate are the FBA calculations and document comparisons?",
        a: "The FBA calculator uses Amazon's published 2026 fee tables and shows every component of the calculation so you can verify it; it is an estimate and does not replace your official report. El Comparinizador compares extracted text deterministically, and for scanned PDFs it includes local OCR run in the browser through Tesseract.js, so your files still never leave your device.",
      },
    ],
    founder: {
      title: "Who leads SOLV",
      name: FOUNDER_NAME,
      role: "Founder & Software Engineer at SOLV",
      bio: [
        "I automate operational processes so your team stops losing time on manual tasks.",
        "Fast, lean web development built for the network edge.",
        "I build privacy-by-design tools: your data is processed on your own device.",
      ],
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
    },
    contact: {
      title: "Direct Line",
      text: "Tell us which process is eating your time and we will reply with a first diagnosis.",
      gmail: "Open in Gmail Web",
      copy: "Copy email",
      copied: "Copied",
      form: {
        name: "Name / Company",
        namePlaceholder: "Your name or your company's",
        email: "Email address",
        emailPlaceholder: "you@email.com",
        message: "Brief description of the bottleneck or project",
        messagePlaceholder: "Which process is eating your time, or what do you want to build?",
        submit: "Send message",
        sending: "Sending…",
        success: "Message sent! We will reply soon with a first diagnosis.",
        error: "We could not send your message. Check your connection and try again, or email us directly.",
        subject: "New diagnosis request from solv.quest",
        legalBefore: "By submitting this form, you agree to our ",
        legalLink: "Privacy Policy",
        legalAfter: ". We use your details solely to respond to your inquiry.",
      },
    },
    footer: {
      description: "A digital studio building fast, private web tools that run in your browser.",
      rights: "All rights reserved.",
      home: "Home",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      cookies: "Cookie Policy",
    },
  },
};

export type LegalPageKey = "privacy" | "terms" | "cookies";
export type LegalSegment = string | { label: string; href: string };

export interface LegalListItem {
  lead?: string;
  content: LegalSegment[];
}

export type LegalBlock =
  | { type: "p"; content: LegalSegment[] }
  | { type: "h2"; text: string }
  | { type: "ul"; items: LegalListItem[] };

export interface LegalDocument {
  title: string;
  blocks: LegalBlock[];
}

export interface LegalCopy {
  updatedLabel: string;
  updatedDate: string;
  pages: Record<LegalPageKey, LegalDocument>;
}

const MAIL: LegalSegment = { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` };
const ADS_SETTINGS: LegalSegment = { label: "https://adssettings.google.com", href: "https://adssettings.google.com" };
const COMPARINIZADOR_LINK: LegalSegment = { label: COMPARINIZADOR_URL, href: COMPARINIZADOR_URL };
const AMAZON_FBA_LINK: LegalSegment = { label: AMAZON_FBA_URL, href: AMAZON_FBA_URL };

const esLegal: LegalCopy = {
  updatedLabel: "Última actualización",
  updatedDate: "17 de noviembre de 2026",
  pages: {
    privacy: {
      title: "Política de Privacidad",
      blocks: [
        { type: "p", content: [`En ${SITE_NAME} (${SITE_URL}) respetamos tu privacidad. Esta política explica qué información se trata cuando visitas nuestro sitio y utilizas nuestras herramientas web.`] },
        { type: "h2", text: "1. Responsable" },
        { type: "p", content: [`${SITE_NAME} es un estudio digital. Para cualquier consulta sobre privacidad puedes escribirnos a `, MAIL, "."] },
        { type: "h2", text: "2. Herramientas que se ejecutan en tu navegador" },
        { type: "p", content: [`Nuestras herramientas web funcionan del lado del cliente: los archivos y datos que utilizas se procesan en tu propio dispositivo. ${SITE_NAME} no sube, almacena ni conserva en servidores los archivos que cargas en ellas.`] },
        { type: "h2", text: "3. Información que recopilamos" },
        {
          type: "ul",
          items: [
            { content: ["Datos que nos envías voluntariamente por correo electrónico (por ejemplo, tu dirección y el contenido de tu mensaje)."] },
            { content: ["Datos técnicos básicos de navegación (tipo de navegador, dispositivo, páginas visitadas) que pueden generarse a través de la infraestructura de alojamiento y de servicios de terceros."] },
            { content: ["Identificadores de cookies y datos similares utilizados por Google AdSense (ver apartado 5)."] },
          ],
        },
        { type: "h2", text: "4. Formulario de contacto" },
        { type: "p", content: ["El formulario de contacto de este sitio se rige por lo siguiente:"] },
        {
          type: "ul",
          items: [
            { lead: "Datos recopilados: ", content: ["nombre o empresa, correo electrónico y la descripción de tu consulta o proyecto."] },
            { lead: "Finalidad: ", content: ["usamos estos datos exclusivamente para evaluar y responder solicitudes de diagnóstico o proyectos. No enviamos comunicaciones comerciales no solicitadas ni cedemos o vendemos tus datos a terceros."] },
            { lead: "Procesador técnico: ", content: ["el mensaje se transmite de forma segura mediante Web3Forms (api.web3forms.com) para su entrega en ", MAIL, "."] },
            { lead: "Conservación y derechos: ", content: ["conservamos los datos únicamente durante el tiempo necesario para gestionar tu consulta. Puedes ejercer tus derechos de acceso, rectificación o supresión escribiendo a ", MAIL, "."] },
          ],
        },
        { type: "h2", text: "5. Publicidad de Google AdSense" },
        { type: "p", content: ["Este sitio utiliza Google AdSense para mostrar anuncios. Google, como proveedor externo, utiliza cookies para mostrar anuncios basados en tus visitas a este y otros sitios web. El uso de la cookie de publicidad de Google permite que Google y sus socios muestren anuncios en función de tu navegación."] },
        { type: "p", content: ["Puedes inhabilitar la publicidad personalizada en ", ADS_SETTINGS, ". Consulta también la política de Google sobre cómo utiliza los datos de sitios que usan sus servicios y nuestra ", { label: "Política de Cookies", href: "/cookies" }, "."] },
        { type: "h2", text: "6. Finalidad y uso" },
        { type: "p", content: ["Usamos la información para responder tus consultas, mantener y mejorar el sitio, garantizar su seguridad y mostrar publicidad que financia el servicio. No vendemos tus datos personales."] },
        { type: "h2", text: "7. Conservación" },
        { type: "p", content: ["Conservamos los mensajes que nos envías únicamente durante el tiempo necesario para atender tu solicitud, salvo que una obligación legal exija conservarlos más tiempo."] },
        { type: "h2", text: "8. Tus derechos" },
        { type: "p", content: ["Puedes solicitar el acceso, rectificación, supresión u oposición al tratamiento de tus datos, así como retirar tu consentimiento, escribiendo a ", MAIL, "."] },
        { type: "h2", text: "9. Menores" },
        { type: "p", content: ["Este sitio no está dirigido a menores de 13 años y no recopilamos datos de ellos de forma deliberada."] },
        { type: "h2", text: "10. Cambios en esta política" },
        { type: "p", content: ["Podemos actualizar esta política; la fecha de última actualización aparece al inicio de la página. Consulta también nuestros ", { label: "Términos de Uso", href: "/terminos" }, " o vuelve al ", { label: "inicio", href: "/" }, "."] },
      ],
    },
    terms: {
      title: "Términos de Uso",
      blocks: [
        { type: "p", content: [`Al acceder y utilizar ${SITE_URL} y sus herramientas aceptas estos términos. Si no estás de acuerdo, te pedimos que no uses el sitio.`] },
        { type: "h2", text: "1. Servicio" },
        { type: "p", content: [`${SITE_NAME} es un estudio digital que ofrece información sobre sus servicios y herramientas web que se ejecutan en el navegador del usuario:`] },
        {
          type: "ul",
          items: [
            { lead: "El Comparinizador", content: [" (", COMPARINIZADOR_LINK, "): comparación de documentos PDF, DOCX, TXT y MD."] },
            { lead: "Amazon FBA Profit & Fee Calculator (2026)", content: [" (", AMAZON_FBA_LINK, "): calculadora de tarifas FBA, comisiones y beneficio estimado para vendedores de Amazon US."] },
          ],
        },
        { type: "h2", text: "2. Uso permitido" },
        {
          type: "ul",
          items: [
            { content: ["Debes usar el sitio de forma lícita y sin vulnerar derechos de terceros."] },
            { content: ["No está permitido intentar interrumpir, sobrecargar o acceder sin autorización a la infraestructura del sitio."] },
            { content: ["No puedes usar medios automatizados para generar tráfico publicitario artificial ni hacer clic en anuncios de forma fraudulenta."] },
          ],
        },
        { type: "h2", text: "3. Tus archivos y datos" },
        { type: "p", content: ["Las herramientas procesan la información en tu dispositivo (del lado del cliente), por lo que tus datos permanecen en él, y no almacenamos tus archivos en nuestros servidores. Eres responsable del contenido que utilizas y de contar con los derechos para ello."] },
        { type: "h2", text: "4. Carácter informativo de los cálculos" },
        { type: "p", content: ["Los cálculos de tarifas FBA, comisiones y beneficio de Amazon FBA Profit & Fee Calculator (2026) son estimaciones meramente informativas basadas en las tarifas publicadas y en los datos que introduces. No constituyen asesoramiento financiero, fiscal ni comercial y no sustituyen los informes oficiales de Amazon. Las tarifas reales pueden variar; verifica siempre los resultados antes de tomar decisiones basadas en ellos."] },
        { type: "h2", text: "5. Propiedad intelectual" },
        { type: "p", content: [`El diseño, textos, marca y código del sitio pertenecen a ${SITE_NAME} o se usan con la debida autorización. No puedes reproducirlos ni distribuirlos sin permiso previo.`] },
        { type: "h2", text: "6. Publicidad y enlaces de terceros" },
        { type: "p", content: ["El sitio puede mostrar anuncios de Google AdSense y enlazar a sitios de terceros. No controlamos ni somos responsables de su contenido ni de sus políticas. Consulta nuestra ", { label: "Política de Privacidad", href: "/privacidad" }, " y nuestra ", { label: "Política de Cookies", href: "/cookies" }, "."] },
        { type: "h2", text: "7. Exclusión de garantías" },
        { type: "p", content: ["El sitio y las herramientas se ofrecen «tal cual», sin garantía de disponibilidad ininterrumpida o ausencia de errores. Procura verificar los resultados antes de tomar decisiones basadas en ellos."] },
        { type: "h2", text: "8. Limitación de responsabilidad" },
        { type: "p", content: [`En la medida permitida por la ley, ${SITE_NAME} no será responsable de daños indirectos derivados del uso o la imposibilidad de uso del sitio y sus herramientas.`] },
        { type: "h2", text: "9. Modificaciones" },
        { type: "p", content: ["Podemos modificar estos términos en cualquier momento; el uso continuado del sitio implica su aceptación."] },
        { type: "h2", text: "10. Contacto" },
        { type: "p", content: ["Para cualquier consulta escríbenos a ", MAIL, " o vuelve al ", { label: "inicio", href: "/" }, "."] },
      ],
    },
    cookies: {
      title: "Política de Cookies",
      blocks: [
        { type: "p", content: [`Esta política explica qué son las cookies y cómo las utiliza ${SITE_NAME} en ${SITE_URL}.`] },
        { type: "h2", text: "1. ¿Qué son las cookies?" },
        { type: "p", content: ["Son pequeños archivos de texto que un sitio web guarda en tu dispositivo para recordar información sobre tu visita."] },
        { type: "h2", text: "2. Cookies que pueden utilizarse" },
        {
          type: "ul",
          items: [
            { lead: "Técnicas:", content: [" necesarias para el funcionamiento básico del sitio."] },
            { lead: "Publicitarias de terceros (Google AdSense):", content: [" Google y sus socios publicitarios pueden colocar cookies para mostrar anuncios basados en tus visitas a este y otros sitios, medir su rendimiento y evitar fraudes."] },
          ],
        },
        { type: "h2", text: "3. Google AdSense" },
        { type: "p", content: ["Google utiliza la cookie de publicidad para mostrar anuncios personalizados. Puedes inhabilitar la publicidad personalizada en ", ADS_SETTINGS, "."] },
        { type: "h2", text: "4. Cómo gestionar o eliminar cookies" },
        { type: "p", content: ["Puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que, al desactivarlas, algunas funciones del sitio podrían verse afectadas."] },
        { type: "h2", text: "5. Cambios en esta política" },
        { type: "p", content: ["Podemos actualizar esta política; la fecha de última actualización aparece al inicio de la página. Consulta también nuestra ", { label: "Política de Privacidad", href: "/privacidad" }, "."] },
        { type: "h2", text: "6. Contacto" },
        { type: "p", content: ["Si tienes dudas, escríbenos a ", MAIL, "."] },
      ],
    },
  },
};

const enLegal: LegalCopy = {
  updatedLabel: "Last updated",
  updatedDate: "November 17, 2026",
  pages: {
    privacy: {
      title: "Privacy Policy",
      blocks: [
        { type: "p", content: [`At ${SITE_NAME} (${SITE_URL}) we respect your privacy. This policy explains what information is processed when you visit our site and use our web tools.`] },
        { type: "h2", text: "1. Data Controller" },
        { type: "p", content: [`${SITE_NAME} is a digital studio. For any privacy question you can write to us at `, MAIL, "."] },
        { type: "h2", text: "2. Tools that run in your browser" },
        { type: "p", content: [`Our web tools work on the client side: the files and data you use are processed on your own device. ${SITE_NAME} does not upload, store or retain on servers the files you load into them.`] },
        { type: "h2", text: "3. Information we collect" },
        {
          type: "ul",
          items: [
            { content: ["Data you voluntarily send us by email (for example, your address and the content of your message)."] },
            { content: ["Basic technical browsing data (browser type, device, pages visited) that may be generated through the hosting infrastructure and third-party services."] },
            { content: ["Cookie identifiers and similar data used by Google AdSense (see section 5)."] },
          ],
        },
        { type: "h2", text: "4. Contact Form" },
        { type: "p", content: ["The contact form on this site is governed by the following:"] },
        {
          type: "ul",
          items: [
            { lead: "Data collected: ", content: ["name or company, email address and the description of your inquiry or project."] },
            { lead: "Purpose: ", content: ["we use this data exclusively to assess and respond to diagnosis or project requests. We do not send unsolicited commercial communications, nor do we transfer or sell your data to third parties."] },
            { lead: "Technical processor: ", content: ["the message is securely transmitted through Web3Forms (api.web3forms.com) for delivery to ", MAIL, "."] },
            { lead: "Retention and rights: ", content: ["we keep the data only as long as necessary to handle your inquiry. You may exercise your rights of access, rectification or erasure by writing to ", MAIL, "."] },
          ],
        },
        { type: "h2", text: "5. Google AdSense advertising" },
        { type: "p", content: ["This site uses Google AdSense to display ads. Google, as a third-party vendor, uses cookies to serve ads based on your visits to this and other websites. The use of Google's advertising cookie enables Google and its partners to serve ads based on your browsing."] },
        { type: "p", content: ["You can opt out of personalized advertising at ", ADS_SETTINGS, ". Please also see Google's policy on how it uses data from sites that use its services and our ", { label: "Cookie Policy", href: "/cookies" }, "."] },
        { type: "h2", text: "6. Purpose and use" },
        { type: "p", content: ["We use the information to answer your inquiries, maintain and improve the site, keep it secure and display advertising that funds the service. We do not sell your personal data."] },
        { type: "h2", text: "7. Retention" },
        { type: "p", content: ["We keep the messages you send us only as long as necessary to handle your request, unless a legal obligation requires keeping them longer."] },
        { type: "h2", text: "8. Your rights" },
        { type: "p", content: ["You may request access, rectification, erasure or objection to the processing of your data, and withdraw your consent, by writing to ", MAIL, "."] },
        { type: "h2", text: "9. Minors" },
        { type: "p", content: ["This site is not directed to children under 13 and we do not knowingly collect data from them."] },
        { type: "h2", text: "10. Changes to this policy" },
        { type: "p", content: ["We may update this policy; the last-updated date appears at the top of the page. Please also see our ", { label: "Terms of Use", href: "/terminos" }, " or return to the ", { label: "home page", href: "/" }, "."] },
      ],
    },
    terms: {
      title: "Terms of Use",
      blocks: [
        { type: "p", content: [`By accessing and using ${SITE_URL} and its tools you accept these terms. If you do not agree, please do not use the site.`] },
        { type: "h2", text: "1. Service" },
        { type: "p", content: [`${SITE_NAME} is a digital studio that provides information about its services and web tools that run in the user's browser:`] },
        {
          type: "ul",
          items: [
            { lead: "El Comparinizador", content: [" (", COMPARINIZADOR_LINK, "): comparison of PDF, DOCX, TXT and MD documents."] },
            { lead: "Amazon FBA Profit & Fee Calculator (2026)", content: [" (", AMAZON_FBA_LINK, "): calculator for FBA fees, referral commissions and estimated profit for Amazon US sellers."] },
          ],
        },
        { type: "h2", text: "2. Permitted use" },
        {
          type: "ul",
          items: [
            { content: ["You must use the site lawfully and without infringing third-party rights."] },
            { content: ["You may not attempt to disrupt, overload or gain unauthorized access to the site's infrastructure."] },
            { content: ["You may not use automated means to generate artificial advertising traffic or click on ads fraudulently."] },
          ],
        },
        { type: "h2", text: "3. Your files and data" },
        { type: "p", content: ["The tools process information on your device (client side), so your data stays on it, and we do not store your files on our servers. You are responsible for the content you use and for having the rights to do so."] },
        { type: "h2", text: "4. Informational nature of calculations" },
        { type: "p", content: ["The FBA fee, commission and profit calculations of Amazon FBA Profit & Fee Calculator (2026) are informational estimates only, based on published fee tables and the data you enter. They do not constitute financial, tax or business advice and do not replace Amazon's official reports. Actual fees may vary; always verify results before making decisions based on them."] },
        { type: "h2", text: "5. Intellectual property" },
        { type: "p", content: [`The design, text, brand and code of the site belong to ${SITE_NAME} or are used with proper authorization. You may not reproduce or distribute them without prior permission.`] },
        { type: "h2", text: "6. Advertising and third-party links" },
        { type: "p", content: ["The site may display Google AdSense ads and link to third-party sites. We do not control and are not responsible for their content or policies. See our ", { label: "Privacy Policy", href: "/privacidad" }, " and our ", { label: "Cookie Policy", href: "/cookies" }, "."] },
        { type: "h2", text: "7. Disclaimer of warranties" },
        { type: "p", content: ["The site and tools are provided \"as is\", with no guarantee of uninterrupted availability or absence of errors. Please verify results before making decisions based on them."] },
        { type: "h2", text: "8. Limitation of liability" },
        { type: "p", content: [`To the extent permitted by law, ${SITE_NAME} will not be liable for indirect damages arising from the use of, or inability to use, the site and its tools.`] },
        { type: "h2", text: "9. Modifications" },
        { type: "p", content: ["We may modify these terms at any time; continued use of the site implies acceptance."] },
        { type: "h2", text: "10. Contact" },
        { type: "p", content: ["For any question write to us at ", MAIL, " or return to the ", { label: "home page", href: "/" }, "."] },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      blocks: [
        { type: "p", content: [`This policy explains what cookies are and how ${SITE_NAME} uses them on ${SITE_URL}.`] },
        { type: "h2", text: "1. What are cookies?" },
        { type: "p", content: ["They are small text files that a website stores on your device to remember information about your visit."] },
        { type: "h2", text: "2. Cookies that may be used" },
        {
          type: "ul",
          items: [
            { lead: "Technical:", content: [" necessary for the basic operation of the site."] },
            { lead: "Third-party advertising (Google AdSense):", content: [" Google and its advertising partners may place cookies to serve ads based on your visits to this and other sites, measure their performance and prevent fraud."] },
          ],
        },
        { type: "h2", text: "3. Google AdSense" },
        { type: "p", content: ["Google uses the advertising cookie to serve personalized ads. You can opt out of personalized advertising at ", ADS_SETTINGS, "."] },
        { type: "h2", text: "4. How to manage or delete cookies" },
        { type: "p", content: ["You can block or delete cookies from your browser settings. Note that disabling them may affect some features of the site."] },
        { type: "h2", text: "5. Changes to this policy" },
        { type: "p", content: ["We may update this policy; the last-updated date appears at the top of the page. Please also see our ", { label: "Privacy Policy", href: "/privacidad" }, "."] },
        { type: "h2", text: "6. Contact" },
        { type: "p", content: ["If you have questions, write to us at ", MAIL, "."] },
      ],
    },
  },
};

export const LEGAL_COPY: Record<Locale, LegalCopy> = { es: esLegal, en: enLegal };
