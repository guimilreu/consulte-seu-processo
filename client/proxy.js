import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/definir-senha'];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token');
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAdminRoute = pathname.startsWith('/admin');

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
