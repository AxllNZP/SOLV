import type { MetadataRoute } from "next";
import { GUIDES, ROI_PATH } from "@/data/guides";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/privacidad", "/terminos", "/cookies"].map((path) => ({ path, date: "2026-11-17" }));
  const guides = GUIDES.map((g) => ({ path: `/guias/${g.slug}`, date: g.updated }));
  const latest = guides.map((g) => g.date).sort().at(-1) ?? "2026-11-27";
  const sections = ["/guias", ROI_PATH].map((path) => ({ path, date: latest }));

  return [...pages, ...sections, ...guides].map(({ path, date }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(date),
  }));
}
