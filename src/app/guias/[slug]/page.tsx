import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticleView from "@/components/guides/GuideArticleView";
import JsonLd from "@/components/JsonLd";
import { formatDate, getGuide, GUIDES, localize, readingMinutes, wordCount } from "@/data/guides";
import { FOUNDER_NAME, LINKEDIN_URL, SITE_NAME, SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  const url = `/guias/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    authors: [{ name: FOUNDER_NAME, url: LINKEDIN_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "es_ES",
      siteName: SITE_NAME,
      title: guide.title,
      description: guide.description,
      url,
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: ["/og-image.webp"],
    },
  };
}

export default async function GuiaPage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const url = `${SITE_URL}/guias/${guide.slug}`;
  const organization = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        inLanguage: "es",
        datePublished: guide.published,
        dateModified: guide.updated,
        wordCount: wordCount(guide),
        mainEntityOfPage: url,
        image: `${SITE_URL}/og-image.webp`,
        author: { "@type": "Person", name: FOUNDER_NAME, url: LINKEDIN_URL, worksFor: organization },
        publisher: { ...organization, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.webp` } },
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  const text = localize(guide);

  return (
    <>
      <JsonLd data={jsonLd} />
      <GuideArticleView
        text={text}
        meta={{
          es: { date: formatDate(guide.updated, "es"), minutes: readingMinutes(text.es) },
          en: { date: formatDate(guide.updated, "en"), minutes: readingMinutes(text.en) },
        }}
        related={GUIDES.filter((g) => g.slug !== guide.slug).map((g) => ({
          slug: g.slug,
          title: { es: g.title, en: g.en.title },
        }))}
      />
    </>
  );
}
