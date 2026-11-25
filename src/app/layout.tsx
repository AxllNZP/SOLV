import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ADSENSE_CLIENT, CONTACT_EMAIL, FOUNDER_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "SOLV es un estudio digital que crea herramientas web que funcionan en tu navegador, sin almacenar tus archivos en servidores. Descubre El Comparinizador.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Estudio digital y herramientas web`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    "SOLV",
    "estudio digital",
    "herramientas web",
    "El Comparinizador",
    "desarrollo web",
    "soluciones digitales",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/logo-icon.webp", shortcut: "/logo-icon.webp", apple: "/logo-icon.webp" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Estudio digital y herramientas web`,
    description,
    images: [{ url: "/og-image.webp", alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Estudio digital y herramientas web`,
    description,
    images: ["/og-image.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "SOLV QUEST",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.webp`, width: 512, height: 512 },
      founder: { "@type": "Person", name: FOUNDER_NAME },
      contactPoint: { "@type": "ContactPoint", email: CONTACT_EMAIL, contactType: "customer service" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full scroll-smooth antialiased`}>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
