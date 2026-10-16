import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/id",
          "/ja",
          "/kana",
          "/kana/",
          "/id/kana",
          "/id/kana/",
          "/ja/kana",
          "/ja/kana/",
          "/compare",
          "/compare/",
          "/id/compare",
          "/id/compare/",
          "/ja/compare",
          "/ja/compare/",
          "/tools/",
          "/id/tools/",
          "/ja/tools/",
          "/about",
          "/id/about",
          "/ja/about",
          "/docs",
          "/id/docs",
          "/ja/docs",
          "/minigame",
          "/id/minigame",
          "/ja/minigame",
          "/study/",
          "/id/study/",
          "/ja/study/",
          "/words/",
          "/words",
          "/id/words/",
          "/id/words",
          "/ja/words/",
          "/ja/words",
        ],
        disallow: [
          "/api/",
          "/dashboard",
          "/id/dashboard",
          "/ja/dashboard",
          "/login",
          "/id/login",
          "/ja/login",
          "/test/",
          "/id/test/",
          "/ja/test/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
