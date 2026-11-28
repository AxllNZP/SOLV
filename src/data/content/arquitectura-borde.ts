import type { Guide } from "@/data/guide-types";

const guide: Guide = {
  slug: "arquitectura-web-borde-cloudflare-privacidad",
  title: "Arquitectura web en el borde con Cloudflare y privacidad por diseño",
  description:
    "Cómo publicar aplicaciones rápidas y baratas combinando exportación estática, Cloudflare Workers Static Assets y procesamiento en el navegador: diagramas, configuración, cabeceras de seguridad, límites y criterios de decisión.",
  category: "Arquitectura web",
  published: "2026-11-27",
  updated: "2026-11-27",
  blocks: [
    { type: "p", text: "Una aplicación que no recibe datos no puede filtrarlos desde su servidor. Esa idea, sencilla y exigente, guía la arquitectura de varias herramientas de SOLV: servir archivos estáticos desde la red de borde, calcular en el navegador y añadir código en servidor solo cuando una función lo requiere de verdad." },
    { type: "p", text: "El resultado suele ser más rápido y más barato, pero no es gratis en complejidad ni sirve para todo. Esta guía explica cómo montarlo, qué protege y qué no." },
    { type: "h2", text: "Qué significa «el borde»" },
    { type: "p", text: "Una red de borde distribuye tu contenido en centros de datos cercanos a los usuarios. En lugar de que cada visita viaje hasta un servidor en una sola región, la responde un punto próximo. Con **archivos estáticos** eso basta; con **funciones en el borde**, además, puedes ejecutar código cerca del usuario." },
    { type: "table", caption: "Dónde puede ocurrir el cómputo", head: ["Lugar", "Latencia", "Quién ve los datos", "Coste al crecer", "Ejemplo adecuado"], rows: [
      ["Navegador del usuario", "Sin viaje de red", "Solo el usuario", "Casi nulo para ti", "Calculadoras, conversores, comparadores"],
      ["Función en el borde", "Baja", "Tu código y el proveedor", "Por invocación y CPU", "Formularios, redirecciones, verificación de tokens"],
      ["Servidor regional", "Variable según distancia", "Tu código y el proveedor", "Por capacidad reservada o uso", "Lógica pesada y base de datos central"],
    ] },
    { type: "h2", text: "La arquitectura de referencia" },
    { type: "code", label: "Sitio estático con cálculo en el cliente", code: String.raw`  Desarrollo                         Red de borde
  ┌───────────────┐   next build   ┌─────────────────────────┐
  │ Código fuente │ ─────────────► │ out/  (HTML, CSS, JS)   │
  └───────────────┘ wrangler deploy└───────────┬─────────────┘
                                               │ HTTPS
                                               ▼
                                   ┌─────────────────────────┐
                                   │ Navegador               │
                                   │  UI + Web Workers       │
                                   │  Archivos del usuario ◄─┼─ no salen
                                   └───────────┬─────────────┘
                                               │ solo lo explícito
                                               ▼
                              Servicios externos (formulario, anuncios)` },
    { type: "p", text: "Fíjate en la última caja. Una web puede procesar documentos localmente y, a la vez, cargar publicidad o enviar un formulario de contacto a un tercero. La privacidad por diseño exige declarar esos flujos, no fingir que no existen." },
    { type: "h2", text: "Exportación estática con Next.js" },
    { type: "p", text: "Next.js puede generar todo el sitio como archivos durante la compilación:" },
    { type: "code", label: "next.config.ts", code: String.raw`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;` },
    { type: "p", text: "Las rutas dinámicas se resuelven en compilación con `generateStaticParams`: cada artículo o ficha produce su propio HTML, indexable y sin base de datos en tiempo de ejecución." },
    { type: "h3", text: "Qué pierdes" },
    { type: "ul", items: [
      "No hay renderizado por petición ni acciones de servidor.",
      "No hay optimización de imágenes al vuelo: debes servirlas ya dimensionadas.",
      "Redirecciones, cabeceras y autenticación se configuran en la plataforma, no en Next.js.",
      "Publicar contenido nuevo implica volver a compilar y desplegar.",
    ] },
    { type: "h2", text: "Despliegue en Workers Static Assets" },
    { type: "p", text: "Para un sitio puramente estático no necesitas escribir un Worker. Basta con indicar la carpeta:" },
    { type: "code", label: "wrangler.jsonc", code: String.raw`{
  "name": "mi-sitio",
  "compatibility_date": "2026-11-17",
  "assets": {
    "directory": "./out",
    "not_found_handling": "404-page"
  }
}` },
    { type: "p", text: "Después, `npm run build` seguido de `npx wrangler deploy`. Según la [documentación de facturación de Cloudflare](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations), las peticiones a archivos estáticos son gratuitas e ilimitadas; las que ejecutan código de Worker sí cuentan según los precios de Workers. El plan gratuito admite hasta 20.000 archivos por versión y cada archivo puede pesar como máximo 25 MiB. Confirma los límites vigentes antes de diseñar sobre ellos." },
    { type: "note", title: "Cuidado con run_worker_first", text: "Si configuras que el Worker se ejecute antes de servir los archivos, esas peticiones pasan a contar como invocaciones y, superado el límite gratuito, pueden responder con error en lugar de servir el contenido estático. Aplícalo solo a las rutas que lo necesiten." },
    { type: "h2", text: "Cabeceras de seguridad" },
    { type: "p", text: "Un archivo `_headers` en la carpeta publicada permite definir cabeceras para los assets estáticos. En Next.js, colócalo en `public/` para que se copie a `out/`." },
    { type: "code", label: "public/_headers (herramienta sin recursos de terceros)", code: String.raw`/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  Permissions-Policy: camera=(), microphone=(), geolocation=()` },
    { type: "table", caption: "Qué aporta cada directiva", head: ["Directiva", "Efecto", "Nota práctica"], rows: [
      ["`connect-src 'self'`", "Limita a dónde puede enviar datos el código mediante fetch, XHR o WebSocket", "Es la que respalda la promesa de procesamiento local"],
      ["`script-src`", "Restringe el origen del JavaScript", "La exportación estática incluye scripts en línea; para eliminar `unsafe-inline` hacen falta hashes"],
      ["`frame-ancestors 'none'`", "Impide incrustar la página", "Protege frente a clickjacking"],
      ["`object-src 'none'`", "Bloquea contenido de plugins", "Sin coste en sitios modernos"],
      ["`nosniff`", "Evita que el navegador adivine tipos de archivo", "Recomendable siempre"],
    ] },
    { type: "p", text: "Esa política **no sirve tal cual** para un sitio con publicidad o formularios de terceros: redes como AdSense cargan recursos de muchos dominios, y un servicio de formularios requiere estar en `connect-src`. Despliega primero con `Content-Security-Policy-Report-Only`, observa qué se bloquearía y ajusta. Una solución limpia es separar: la herramienta que maneja documentos en un subdominio con política estricta y sin terceros." },
    { type: "h2", text: "Procesar en el navegador sin congelarlo" },
    { type: "p", text: "El trabajo pesado debe salir del hilo principal. Un Web Worker permite leer y analizar un archivo mientras la interfaz sigue respondiendo:" },
    { type: "code", label: "Contar líneas de un archivo en un Web Worker", code: String.raw`// worker.ts
self.onmessage = async (e: MessageEvent<File>) => {
  const texto = await e.data.text();
  self.postMessage({ lineas: texto.split("\n").length });
};

// componente cliente
const worker = new Worker(new URL("./worker.ts", import.meta.url));
worker.onmessage = (e) => console.log(e.data.lineas);
worker.postMessage(archivo); // el File viaja entre hilos, no por la red` },
    { type: "h2", text: "Privacidad por diseño en decisiones concretas" },
    { type: "ol", items: [
      "**Minimiza:** si un dato no es necesario para la función, no lo pidas.",
      "**Procesa donde se origina:** el navegador es la primera opción.",
      "**Declara cada salida:** formulario, analítica, anuncios y fuentes externas.",
      "**No registres contenido:** los mensajes de error no deben incluir el documento del usuario.",
      "**Controla el almacenamiento local:** explica qué queda en `localStorage` o IndexedDB y ofrece borrarlo.",
      "**Permite verificar:** una herramienta que funciona sin conexión tras cargar demuestra más que cualquier texto legal.",
    ] },
    { type: "h2", text: "Qué no resuelve esta arquitectura" },
    { type: "ul", items: [
      "Un script de terceros incluido en la misma página puede leer lo que esa página ve. Elegir dependencias es una decisión de seguridad.",
      "Si tu proceso de compilación o una dependencia están comprometidos, el código malicioso se distribuye igual de rápido.",
      "El proveedor de alojamiento sigue viendo metadatos técnicos como la dirección IP.",
      "No hay secretos en el cliente: cualquier clave incluida en el JavaScript es pública.",
      "El dispositivo del usuario puede estar comprometido o tener extensiones intrusivas.",
    ] },
    { type: "h2", text: "Cuándo añadir código en el borde" },
    { type: "table", caption: "Árbol de decisión resumido", head: ["Necesidad", "Solución", "Precaución"], rows: [
      ["Contenido que cambia pocas veces", "Estático y nuevo despliegue", "Automatiza la publicación"],
      ["Formulario de contacto", "Servicio externo o Worker propio", "Validación y protección contra spam"],
      ["Ocultar una clave de API", "Worker como intermediario", "Límites de uso y autenticación"],
      ["Datos compartidos entre usuarios", "Worker con almacenamiento", "Diseña permisos antes que tablas"],
      ["Transacciones complejas", "Backend con base de datos relacional", "No lo fuerces en una función efímera"],
    ] },
    { type: "h2", text: "Caché, versiones y marcha atrás" },
    { type: "p", text: "Publicar rápido solo es una ventaja si puedes corregir igual de rápido. En un sitio estático, la mayoría de los incidentes vienen de archivos antiguos en caché o de un despliegue incompleto:" },
    { type: "ul", items: [
      "Los archivos con huella en el nombre, como los de `_next/static`, pueden guardarse en caché durante mucho tiempo porque cada cambio genera un nombre nuevo.",
      "El HTML debe revalidarse para que los visitantes reciban pronto la versión publicada y no apunten a recursos que ya no existen.",
      "Conserva el historial de despliegues y ensaya la reversión con `npx wrangler rollback` antes de necesitarla.",
      "Genera el sitio desde un repositorio limpio y con las dependencias bloqueadas, de modo que la compilación sea repetible.",
      "Tras publicar, comprueba una página de cada tipo, el sitemap y la respuesta 404.",
    ] },
    { type: "p", text: "Si usas un service worker para trabajar sin conexión, planifica también cómo se actualiza: una versión mal diseñada puede dejar a los usuarios atrapados en código antiguo aunque el servidor ya tenga la corrección. Muestra un aviso de versión nueva y permite recargar." },
    { type: "h2", text: "Lista de verificación antes de publicar" },
    { type: "ul", items: [
      "La compilación genera todas las rutas y la página 404.",
      "`sitemap.xml`, `robots.txt` y URL canónicas apuntan al dominio definitivo.",
      "Las imágenes tienen dimensiones y peso adecuados.",
      "La pestaña Red no muestra envíos inesperados al usar la herramienta.",
      "Las cabeceras se comprueban con `curl -I` sobre el sitio publicado.",
      "La política de privacidad describe exactamente los flujos reales.",
    ] },
    { type: "p", text: "Si quieres ver el patrón aplicado a un caso sensible, lee cómo [comparar contratos sin subirlos a la nube](/guias/comparar-contratos-pdf-sin-subir-a-la-nube). La [calculadora de ROI](/herramientas/calculadora-roi) de este sitio sigue la misma idea: todo el cálculo ocurre en tu navegador." },
  ],
  faqs: [
    { q: "¿Un sitio estático puede posicionar bien en buscadores?", a: "Sí. Entrega HTML completo sin esperar a que se ejecute JavaScript, lo que facilita el rastreo. El posicionamiento depende sobre todo de la utilidad y originalidad del contenido, los enlaces y la experiencia de uso; la arquitectura por sí sola no lo garantiza." },
    { q: "¿Alojar en Cloudflare Workers Static Assets es realmente gratis?", a: "Las peticiones a archivos estáticos no se cobran según la documentación de Cloudflare, aunque hay límites de número y tamaño de archivos. El dominio, las invocaciones de Workers por encima del plan gratuito y otros productos pueden tener coste." },
    { q: "¿Procesar en el navegador garantiza el cumplimiento del RGPD?", a: "No por sí solo. Reduce los datos que tratas, pero analítica, publicidad, formularios y cookies siguen requiriendo base legal, información y, cuando corresponda, consentimiento." },
    { q: "¿Qué pasa con los equipos poco potentes?", a: "El cómputo local depende del dispositivo. Usa Web Workers, procesa por partes, muestra el progreso y comunica límites de tamaño razonables." },
    { q: "¿Puedo migrar más adelante a renderizado en servidor?", a: "Sí, pero conviene planificarlo. Si separas bien la lógica de interfaz y de datos, añadir un Worker o un adaptador de servidor es incremental; revisa de nuevo el modelo de privacidad cuando los datos empiecen a viajar." },
  ],
};

export default guide;
