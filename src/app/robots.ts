import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakana.kurzagin.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/minigame", "/study/"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
