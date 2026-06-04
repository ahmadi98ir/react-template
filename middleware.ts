import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

export const LOCALES = ['fa', 'en', 'fr', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'fa';

/**
 * Tier 3: IP-geolocation via Coolify / Cloudflare reverse-proxy headers.
 * The user manages proxy configuration; we just read the header.
 */
const GEO: Record<string, Locale> = {
  // Persian (RTL)
  IR: 'fa',
  // English
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en',
  IE: 'en', IN: 'en', SG: 'en', ZA: 'en', PK: 'en',
  NG: 'en', GH: 'en', KE: 'en', PH: 'en', MY: 'en',
  // French
  FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr',
  CI: 'fr', SN: 'fr', CM: 'fr', ML: 'fr', BF: 'fr',
  // Arabic (RTL)
  SA: 'ar', AE: 'ar', EG: 'ar', JO: 'ar', KW: 'ar',
  BH: 'ar', OM: 'ar', QA: 'ar', YE: 'ar', SY: 'ar',
  IQ: 'ar', LB: 'ar', DZ: 'ar', MA: 'ar', TN: 'ar',
  LY: 'ar', SD: 'ar', PS: 'ar', MR: 'ar', SO: 'ar',
};

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: true,
});

export default function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Already locale-prefixed → let next-intl handle locale context
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) {
    return intlMiddleware(request) as NextResponse;
  }

  // Tier 1: NEXT_LOCALE cookie (user's explicit language choice)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    return NextResponse.redirect(
      new URL(`/${cookieLocale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }

  // Tier 2: Accept-Language header (browser preference)
  const acceptLang = request.headers.get('accept-language') ?? '';
  if (acceptLang) {
    for (const part of acceptLang.split(',')) {
      const tag = part.split(';')[0].trim().slice(0, 2).toLowerCase() as Locale;
      if (LOCALES.includes(tag)) {
        return NextResponse.redirect(
          new URL(`/${tag}${pathname === '/' ? '' : pathname}`, request.url)
        );
      }
    }
  }

  // Tier 3: IP geolocation from Coolify/Cloudflare reverse-proxy headers
  const country = (
    request.headers.get('cf-ipcountry') ??
    request.headers.get('x-real-country') ??
    request.headers.get('x-vercel-ip-country') ??
    ''
  ).toUpperCase();
  const geoLocale: Locale = GEO[country] ?? DEFAULT_LOCALE;

  return NextResponse.redirect(
    new URL(`/${geoLocale}${pathname === '/' ? '' : pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!api|admin|auth|_next|_vercel|.*\\..*).*)'],
};
