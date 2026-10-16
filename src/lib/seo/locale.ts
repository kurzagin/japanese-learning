import { Locale } from "@/data/i18n";

export const LOCALES: Locale[] = ["en", "id", "ja"];
export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) {
    return cleanPath === "/" ? "/" : cleanPath;
  }
  return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}

export function getHreflangAlternates(canonicalPath: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakanajp.site";
  const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const pathForUrl = cleanPath === "/" ? "" : cleanPath;

  return {
    canonical: `${baseUrl}${pathForUrl}`,
    languages: {
      en: `${baseUrl}${pathForUrl}`,
      id: `${baseUrl}/id${pathForUrl}`,
      ja: `${baseUrl}/ja${pathForUrl}`,
      "x-default": `${baseUrl}${pathForUrl}`,
    },
  };
}
