import type { MetadataRoute } from "next";
import { GUIDES, ROI_PATH } from "@/data/guides";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/", "/guias", ...GUIDES.map((g) => `/guias/${g.slug}`), ROI_PATH] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
