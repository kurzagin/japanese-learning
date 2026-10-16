import { MetadataRoute } from "next";
import { STAGES } from "@/data/stages";
import { ALL_KANA_PRIMITIVES } from "@/data/kana";
import { getKanaSlug, CURATED_COMPARISONS, KANA_CATEGORIES } from "@/lib/kana-seo";
import { VOCABULARY_LIST, JLPT_CATEGORIES } from "@/lib/vocab-seo";
import { LOCALES } from "@/lib/seo/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";
  const now = new Date();

  // Helper generating distinct alternate URLs per language + self URL per language
  const getLanguageAlternates = (rawPath: string) => {
    const cleanPath = rawPath === "/" ? "" : rawPath;
    return {
      languages: {
        en: `${baseUrl}${cleanPath}`,
        id: `${baseUrl}/id${cleanPath}`,
        ja: `${baseUrl}/ja${cleanPath}`,
        "x-default": `${baseUrl}${cleanPath}`,
      },
    };
  };

  const createLocalizedEntries = (
    rawPath: string,
    options: {
      changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
      priority?: number;
      lastModified?: Date;
    } = {}
  ): MetadataRoute.Sitemap => {
    const alternates = getLanguageAlternates(rawPath);
    const cleanPath = rawPath === "/" ? "" : rawPath;

    return LOCALES.map((locale) => {
      const localizedUrl =
        locale === "en" ? `${baseUrl}${cleanPath}` : `${baseUrl}/${locale}${cleanPath}`;

      return {
        url: localizedUrl || `${baseUrl}/`,
        lastModified: options.lastModified || now,
        changeFrequency: options.changeFrequency || "weekly",
        priority: options.priority || 0.8,
        alternates,
      };
    });
  };

  // Core static routes
  const staticPaths: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/kana", priority: 0.9, changeFrequency: "weekly" },
    { path: "/words", priority: 0.9, changeFrequency: "weekly" },
    { path: "/compare", priority: 0.8, changeFrequency: "weekly" },
    { path: "/tools/romaji-to-kana", priority: 0.8, changeFrequency: "weekly" },
    { path: "/tools/hiragana-chart-pdf", priority: 0.85, changeFrequency: "weekly" },
    { path: "/tools/katakana-chart-pdf", priority: 0.85, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "weekly" },
    { path: "/docs", priority: 0.7, changeFrequency: "weekly" },
    { path: "/minigame", priority: 0.7, changeFrequency: "weekly" },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap((s) =>
    createLocalizedEntries(s.path, {
      priority: s.priority,
      changeFrequency: s.changeFrequency,
      lastModified: now,
    })
  );

  // Dynamic study stages
  const stageRoutes: MetadataRoute.Sitemap = STAGES.flatMap((stage) =>
    createLocalizedEntries(`/study/${stage.id}`, {
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: now,
    })
  );

  // Dynamic programmatic Kana character pages (219 characters)
  const kanaRoutes: MetadataRoute.Sitemap = ALL_KANA_PRIMITIVES.flatMap((kana) => {
    const path = `/kana/${kana.script}/${getKanaSlug(kana)}`;
    return createLocalizedEntries(path, {
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: now,
    });
  });

  // Dynamic comparison pair pages (18 pairs)
  const compareRoutes: MetadataRoute.Sitemap = CURATED_COMPARISONS.flatMap((comp) => {
    const path = `/compare/${comp.slug}`;
    return createLocalizedEntries(path, {
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: now,
    });
  });

  // Dynamic category hub pages (9 hubs: gojuon, dakuon, handakuon, yoon, extended)
  const categoryRoutes: MetadataRoute.Sitemap = KANA_CATEGORIES.flatMap((cat) => {
    const path = `/kana/${cat.script}/category/${cat.category}`;
    return createLocalizedEntries(path, {
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: now,
    });
  });

  // Dynamic JLPT and Pop Culture vocabulary category hubs
  const jlptRoutes: MetadataRoute.Sitemap = JLPT_CATEGORIES.flatMap((cat) => {
    const path = `/words/category/${cat.key}`;
    return createLocalizedEntries(path, {
      priority: 0.85,
      changeFrequency: "weekly",
      lastModified: now,
    });
  });

  // Dynamic vocabulary detail pages (161 words)
  const vocabRoutes: MetadataRoute.Sitemap = VOCABULARY_LIST.flatMap((word) => {
    const path = `/words/${word.slug}`;
    return createLocalizedEntries(path, {
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: now,
    });
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
