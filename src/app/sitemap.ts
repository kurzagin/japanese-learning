import { MetadataRoute } from "next";
import { STAGES } from "@/data/stages";
import { ALL_KANA_PRIMITIVES } from "@/data/kana";
import { getKanaSlug } from "@/lib/kana-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";
  const now = new Date();

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}`,
          id: `${baseUrl}`,
          ja: `${baseUrl}`,
        },
      },
    },
    {
      url: `${baseUrl}/kana`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/minigame`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic study stages
  const stageRoutes: MetadataRoute.Sitemap = STAGES.map((stage) => ({
    url: `${baseUrl}/study/${stage.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic programmatic Kana character pages (~218 core routes)
  const kanaRoutes: MetadataRoute.Sitemap = ALL_KANA_PRIMITIVES.map((kana) => ({
    url: `${baseUrl}/kana/${kana.script}/${getKanaSlug(kana)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...stageRoutes, ...kanaRoutes];
}
