import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/kana", "/kana/", "/compare", "/compare/", "/tools/", "/about", "/docs", "/minigame", "/study/"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
