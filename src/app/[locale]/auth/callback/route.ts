import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale?: string }> }
) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;
  const prefix = locale && locale !== "en" ? `/${locale}` : "";
  const next = searchParams.get("next") ?? `${prefix}/login?confirmed=true`;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}${prefix}/login?confirmed=true`);
}
