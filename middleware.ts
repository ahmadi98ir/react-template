import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fa', 'en', 'fr', 'ar'],
  defaultLocale: 'fa'
});

export const config = {
  matcher: ['/((?!api|admin|auth|_next|_vercel|.*\\..*).*)']
};
