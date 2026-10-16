import { MetadataRoute } from "next";
import { STAGES } from "@/data/stages";
import { ALL_KANA_PRIMITIVES } from "@/data/kana";
import { getKanaSlug, CURATED_COMPARISONS, KANA_CATEGORIES } from "@/lib/kana-seo";
import { VOCABULARY_LIST, JLPT_CATEGORIES } from "@/lib/vocab-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";
  const now = new Date();

  const getLanguageAlternates = (path: string) => ({
    languages: {
      en: `${baseUrl}${path}`,
      id: `${baseUrl}${path}`,
      ja: `${baseUrl}${path}`,
      "x-default": `${baseUrl}${path}`,
    },
  });

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: getLanguageAlternates(""),
    },
    {
      url: `${baseUrl}/kana`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: getLanguageAlternates("/kana"),
    },
    {
      url: `${baseUrl}/words`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: getLanguageAlternates("/words"),
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: getLanguageAlternates("/compare"),
    },
    {
      url: `${baseUrl}/tools/romaji-to-kana`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: getLanguageAlternates("/tools/romaji-to-kana"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: getLanguageAlternates("/about"),
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: getLanguageAlternates("/docs"),
    },
    {
      url: `${baseUrl}/minigame`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: getLanguageAlternates("/minigame"),
    },
  ];

  // Dynamic study stages
  const stageRoutes: MetadataRoute.Sitemap = STAGES.map((stage) => ({
    url: `${baseUrl}/study/${stage.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: getLanguageAlternates(`/study/${stage.id}`),
  }));

  // Dynamic programmatic Kana character pages
  const kanaRoutes: MetadataRoute.Sitemap = ALL_KANA_PRIMITIVES.map((kana) => {
    const path = `/kana/${kana.script}/${getKanaSlug(kana)}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: getLanguageAlternates(path),
    };
  });

  // Dynamic comparison pair pages (18 pairs)
  const compareRoutes: MetadataRoute.Sitemap = CURATED_COMPARISONS.map((comp) => {
    const path = `/compare/${comp.slug}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: getLanguageAlternates(path),
    };
  });

  // Dynamic category hub pages (9 hubs: gojuon, dakuon, handakuon, yoon, extended)
  const categoryRoutes: MetadataRoute.Sitemap = KANA_CATEGORIES.map((cat) => {
    const path = `/kana/${cat.script}/category/${cat.category}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: getLanguageAlternates(path),
    };
  });

  // Dynamic JLPT and Pop Culture vocabulary category hubs
  const jlptRoutes: MetadataRoute.Sitemap = JLPT_CATEGORIES.map((cat) => {
    const path = `/words/category/${cat.key}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: getLanguageAlternates(path),
    };
  });

  // Dynamic vocabulary detail pages (161 words)
  const vocabRoutes: MetadataRoute.Sitemap = VOCABULARY_LIST.map((word) => {
    const path = `/words/${word.slug}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: getLanguageAlternates(path),
    };
  });

  return [
    ...staticRoutes,
    ...stageRoutes,
    ...kanaRoutes,
    ...compareRoutes,
    ...categoryRoutes,
    ...jlptRoutes,
    ...vocabRoutes,
  ];
}

