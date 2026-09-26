import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Remote Poslovi",
    short_name: "Remote poslovi",
    description: "Alat za remote posao iz Srbije.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f3",
    theme_color: "#17312a",
    lang: "sr-Latn",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
