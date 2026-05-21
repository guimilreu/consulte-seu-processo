import { NextResponse } from 'next/server';

// Autenticação é feita via cookie httpOnly na API (domínio compartilhado)
// e validada no client + API. O proxy não bloqueia rotas por cookie,
// pois em setups cross-subdomain (app.* / api.*) o cookie pode não estar
// visível aqui mesmo com o usuário autenticado.

export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
