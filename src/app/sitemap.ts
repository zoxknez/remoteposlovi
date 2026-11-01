import type { MetadataRoute } from "next";
import { BALKAN_COUNTRIES } from "@/data/countries";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/zemlje",
    "/izvori",
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
      priority: path === "" || path === "/izvori" ? 1 : 0.7,
    })),
    ...BALKAN_COUNTRIES.map((country) => ({
      url: `${SITE_URL}/zemlje/${country.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/vodici/${guide.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
