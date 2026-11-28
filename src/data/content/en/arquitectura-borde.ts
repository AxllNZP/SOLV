import type { GuideText } from "@/data/guide-types";

const guide: GuideText = {
  title: "Edge web architecture with Cloudflare and privacy by design",
  description:
    "How to ship fast, low-cost applications by combining static export, Cloudflare Workers Static Assets and in-browser processing: diagrams, configuration, security headers, limits and decision criteria.",
  category: "Web architecture",
  blocks: [
    { type: "p", text: "An application that never receives data cannot leak it from its server. That simple and demanding idea guides the architecture of several SOLV tools: serve static files from the edge network, compute in the browser and add server code only when a feature truly requires it." },
    { type: "p", text: "The result is usually faster and cheaper, but it is not free in complexity and it does not fit every case. This guide explains how to build it, what it protects and what it does not." },
    { type: "h2", text: "What “the edge” means" },
    { type: "p", text: "An edge network distributes your content across data centres close to users. Instead of every visit travelling to a server in a single region, a nearby location answers it. For **static files** that is all you need; with **edge functions** you can also run code close to the user." },
    { type: "table", caption: "Where computation can happen", head: ["Place", "Latency", "Who sees the data", "Cost as you grow", "Suitable example"], rows: [
      ["User's browser", "No network round trip", "Only the user", "Almost nothing for you", "Calculators, converters, comparison tools"],
      ["Edge function", "Low", "Your code and the provider", "Per invocation and CPU", "Forms, redirects, token verification"],
      ["Regional server", "Varies with distance", "Your code and the provider", "By reserved capacity or usage", "Heavy logic and a central database"],
    ] },
    { type: "h2", text: "The reference architecture" },
    { type: "code", label: "Static site with client-side computation", code: String.raw`  Development                        Edge network
  ┌───────────────┐   next build   ┌─────────────────────────┐
  │ Source code   │ ─────────────► │ out/  (HTML, CSS, JS)   │
  └───────────────┘ wrangler deploy└───────────┬─────────────┘
                                               │ HTTPS
                                               ▼
                                   ┌─────────────────────────┐
                                   │ Browser                 │
                                   │  UI + Web Workers       │
                                   │  User files ◄───────────┼─ stay here
                                   └───────────┬─────────────┘
                                               │ only what is explicit
                                               ▼
                                External services (form, advertising)` },
    { type: "p", text: "Look at the last box. A website can process documents locally and at the same time load advertising or send a contact form to a third party. Privacy by design requires declaring those flows, not pretending they do not exist." },
    { type: "h2", text: "Static export with Next.js" },
    { type: "p", text: "Next.js can generate the entire site as files at build time:" },
    { type: "code", label: "next.config.ts", code: String.raw`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;` },
    { type: "p", text: "Dynamic routes are resolved at build time with `generateStaticParams`: each article or product page produces its own HTML, indexable and with no database at runtime." },
    { type: "h3", text: "What you give up" },
    { type: "ul", items: [
      "There is no per-request rendering and there are no server actions.",
      "There is no on-the-fly image optimisation: you must serve images already sized.",
      "Redirects, headers and authentication are configured on the platform, not in Next.js.",
      "Publishing new content means building and deploying again.",
    ] },
    { type: "h2", text: "Deploying to Workers Static Assets" },
    { type: "p", text: "For a purely static site you do not need to write a Worker. Pointing to the folder is enough:" },
    { type: "code", label: "wrangler.jsonc", code: String.raw`{
  "name": "my-site",
  "compatibility_date": "2026-11-17",
  "assets": {
    "directory": "./out",
    "not_found_handling": "404-page"
  }
}` },
    { type: "p", text: "Then run `npm run build` followed by `npx wrangler deploy`. According to [Cloudflare's billing documentation](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations), requests for static assets are free and unlimited; requests that run Worker code do count under Workers pricing. The free plan allows up to 20,000 files per version and each file can weigh at most 25 MiB. Confirm the current limits before designing around them." },
    { type: "note", title: "Be careful with run_worker_first", text: "If you configure the Worker to run before files are served, those requests start counting as invocations and, once the free limit is exceeded, they may return an error instead of serving the static content. Apply it only to the routes that need it." },
    { type: "h2", text: "Security headers" },
    { type: "p", text: "A `_headers` file in the published folder lets you define headers for static assets. In Next.js, put it in `public/` so that it is copied to `out/`." },
    { type: "code", label: "public/_headers (tool with no third-party resources)", code: String.raw`/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  Permissions-Policy: camera=(), microphone=(), geolocation=()` },
    { type: "table", caption: "What each directive contributes", head: ["Directive", "Effect", "Practical note"], rows: [
      ["`connect-src 'self'`", "Limits where code can send data through fetch, XHR or WebSocket", "This is what backs the promise of local processing"],
      ["`script-src`", "Restricts where JavaScript may come from", "Static export includes inline scripts; removing `unsafe-inline` requires hashes"],
      ["`frame-ancestors 'none'`", "Prevents the page from being embedded", "Protects against clickjacking"],
      ["`object-src 'none'`", "Blocks plugin content", "No cost on modern sites"],
      ["`nosniff`", "Stops the browser from guessing file types", "Always recommended"],
    ] },
    { type: "p", text: "That policy **will not work as is** on a site with advertising or third-party forms: networks such as AdSense load resources from many domains, and a form service must be listed in `connect-src`. Deploy first with `Content-Security-Policy-Report-Only`, watch what would be blocked and adjust. A clean solution is separation: the tool that handles documents lives on a subdomain with a strict policy and no third parties." },
    { type: "h2", text: "Processing in the browser without freezing it" },
    { type: "p", text: "Heavy work must move off the main thread. A Web Worker can read and analyse a file while the interface keeps responding:" },
    { type: "code", label: "Counting the lines of a file in a Web Worker", code: String.raw`// worker.ts
self.onmessage = async (e: MessageEvent<File>) => {
  const text = await e.data.text();
  self.postMessage({ lines: text.split("\n").length });
};

// client component
const worker = new Worker(new URL("./worker.ts", import.meta.url));
worker.onmessage = (e) => console.log(e.data.lines);
worker.postMessage(file); // the File travels between threads, not over the network` },
    { type: "h2", text: "Privacy by design as concrete decisions" },
    { type: "ol", items: [
      "**Minimise:** if a piece of data is not needed for the feature, do not ask for it.",
      "**Process where it originates:** the browser is the first option.",
      "**Declare every outflow:** forms, analytics, advertising and external fonts.",
      "**Do not log content:** error messages must not include the user's document.",
      "**Control local storage:** explain what stays in `localStorage` or IndexedDB and offer a way to delete it.",
      "**Make it verifiable:** a tool that works offline after loading proves more than any legal text.",
    ] },
    { type: "h2", text: "What this architecture does not solve" },
    { type: "ul", items: [
      "A third-party script included on the same page can read whatever that page sees. Choosing dependencies is a security decision.",
      "If your build process or a dependency is compromised, the malicious code is distributed just as quickly.",
      "The hosting provider still sees technical metadata such as the IP address.",
      "There are no secrets on the client: any key included in the JavaScript is public.",
      "The user's device may be compromised or run intrusive extensions.",
    ] },
    { type: "h2", text: "When to add code at the edge" },
    { type: "table", caption: "Summarised decision tree", head: ["Need", "Solution", "Caution"], rows: [
      ["Content that rarely changes", "Static plus redeploy", "Automate publishing"],
      ["Contact form", "External service or your own Worker", "Validation and spam protection"],
      ["Hiding an API key", "Worker as an intermediary", "Usage limits and authentication"],
      ["Data shared between users", "Worker with storage", "Design permissions before tables"],
      ["Complex transactions", "Backend with a relational database", "Do not force it into a short-lived function"],
    ] },
    { type: "h2", text: "Caching, versions and rollback" },
    { type: "p", text: "Shipping quickly is only an advantage if you can fix things just as quickly. On a static site, most incidents come from stale cached files or from an incomplete deployment:" },
    { type: "ul", items: [
      "Files with a content hash in their name, such as those under `_next/static`, can be cached for a long time because every change produces a new name.",
      "HTML should be revalidated so that visitors receive the published version soon and do not point at resources that no longer exist.",
      "Keep the deployment history and rehearse a rollback with `npx wrangler rollback` before you need it.",
      "Build the site from a clean repository with locked dependencies, so that the build is repeatable.",
      "After publishing, check one page of each type, the sitemap and the 404 response.",
    ] },
    { type: "p", text: "If you use a service worker to work offline, also plan how it gets updated: a poorly designed one can leave users stuck on old code even though the server already has the fix. Show a notice when a new version is available and let people reload." },
    { type: "h2", text: "Checklist before publishing" },
    { type: "ul", items: [
      "The build generates every route and the 404 page.",
      "`sitemap.xml`, `robots.txt` and canonical URLs point to the final domain.",
      "Images have appropriate dimensions and weight.",
      "The Network tab shows no unexpected uploads while the tool is in use.",
      "Headers are checked with `curl -I` against the published site.",
      "The privacy policy describes exactly the real data flows.",
    ] },
    { type: "p", text: "To see the pattern applied to a sensitive case, read how to [compare contracts without uploading them to the cloud](/guias/comparar-contratos-pdf-sin-subir-a-la-nube). The [ROI calculator](/herramientas/calculadora-roi) on this site follows the same idea: every calculation happens in your browser." },
  ],
  faqs: [
    { q: "Can a static site rank well in search engines?", a: "Yes. It delivers complete HTML without waiting for JavaScript to run, which makes crawling easier. Ranking depends mostly on how useful and original the content is, on links and on user experience; architecture alone does not guarantee it." },
    { q: "Is hosting on Cloudflare Workers Static Assets really free?", a: "Requests for static assets are not charged according to Cloudflare's documentation, although there are limits on the number and size of files. The domain, Worker invocations beyond the free plan and other products may have a cost." },
    { q: "Does processing in the browser guarantee GDPR compliance?", a: "Not on its own. It reduces the data you handle, but analytics, advertising, forms and cookies still need a legal basis, information to users and, where applicable, consent." },
    { q: "What about low-powered devices?", a: "Local computation depends on the device. Use Web Workers, process in chunks, show progress and communicate reasonable size limits." },
    { q: "Can I move to server rendering later?", a: "Yes, but plan for it. If you keep interface and data logic well separated, adding a Worker or a server adapter is incremental; revisit the privacy model once data starts to travel." },
  ],
};

export default guide;
