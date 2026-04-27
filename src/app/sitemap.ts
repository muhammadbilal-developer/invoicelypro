import type { MetadataRoute } from "next";
import { NICHES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://invoicelypro.com";
  const staticPaths = [
    "",
    "/templates",
    "/guide",
    "/pricing",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/dmca",
    "/cookies-policy",
    "/refund-policy",
    "/disclaimer",
  ];
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...NICHES.map((n) => ({ url: `${base}/invoice-generator/${n.slug}`, lastModified: new Date() })),
  ];
}
