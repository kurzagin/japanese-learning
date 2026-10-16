import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/seo/locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal Next.js paths, API routes, and static files with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already starts with a supported locale (/en, /id, /ja)
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If the URL has the default locale prefix (/en or /en/...), redirect to canonical unprefixed URL
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const cleanPathname = pathname.replace(new RegExp(`^/${DEFAULT_LOCALE}`), "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = cleanPathname;
    return NextResponse.redirect(url, 308);
  }

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // For unprefixed routes (e.g. /login, /dashboard, /kana, /about), rewrite internally to /en/...
  // Note: "/" is already handled by src/app/page.tsx, or can also be rewritten cleanly to /en
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.svg|opengraph-image).*)",
  ],
};
