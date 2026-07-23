import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocaleFromPathname(pathname: string): string | null {
  const firstSegment = pathname.split('/')[1];
  if (locales.includes(firstSegment)) return firstSegment;
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  const localeInPath = getLocaleFromPathname(pathname);

  // If no locale in URL, redirect to default locale
  if (!localeInPath) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Set the locale cookie for client-side access
  const response = NextResponse.next();
  response.cookies.set('locale', localeInPath, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  // Set Content-Language header
  response.headers.set('Content-Language', localeInPath);

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml|apple-touch-icon.png).*)'],
};
