import { MetadataRoute } from "next";
import { STAGES } from "@/data/stages";
import { ALL_KANA_PRIMITIVES } from "@/data/kana";
import { getKanaSlug, CURATED_COMPARISONS, KANA_CATEGORIES } from "@/lib/kana-seo";
import { VOCABULARY_LIST } from "@/lib/vocab-seo";

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
      url: `${baseUrl}/words`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/romaji-to-kana`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
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

  // Dynamic programmatic Kana character pages
  const kanaRoutes: MetadataRoute.Sitemap = ALL_KANA_PRIMITIVES.map((kana) => ({
    url: `${baseUrl}/kana/${kana.script}/${getKanaSlug(kana)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic comparison pair pages (18 pairs)
  const compareRoutes: MetadataRoute.Sitemap = CURATED_COMPARISONS.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic category hub pages (9 hubs: gojuon, dakuon, handakuon, yoon, extended)
  const categoryRoutes: MetadataRoute.Sitemap = KANA_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/kana/${cat.script}/category/${cat.category}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic vocabulary detail pages (161 words)
  const vocabRoutes: MetadataRoute.Sitemap = VOCABULARY_LIST.map((word) => ({
    url: `${baseUrl}/words/${word.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...stageRoutes,
    ...kanaRoutes,
    ...compareRoutes,
    ...categoryRoutes,
    ...vocabRoutes,
  ];
}
