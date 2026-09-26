import type { MetadataRoute } from "next";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/poslovi",
    "/izvori",
    "/kompanije",
    "/alati",
    "/porez",
    "/plate",
    "/provera-oglasa",
    "/kako-da-radim",
    "/vodici",
    "/tracker",
    "/wizard",
    "/privatnost",
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "daily" as const,
      priority: path === "" || path === "/poslovi" ? 1 : 0.7,
    })),
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/vodici/${guide.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
