import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_AUTH_TOKEN_NAME, HEADER_USER_NAME } from './props';
import { jwtValidate } from './lib-server-only/jwt';

async function isLoggedIn(headers: Headers, cookieStore: NextRequest['cookies']): Promise<Headers | null> {
  const token = cookieStore.get(COOKIE_AUTH_TOKEN_NAME)?.value ?? "";
  if (!token) return null;

  const tokenUser = await jwtValidate(token);
  if(!tokenUser) return null;
  
  const newHeader = new Headers(headers);
  newHeader.set(HEADER_USER_NAME, tokenUser.email);
  return newHeader;
}

export async function proxy(request: NextRequest) {
  if (request.headers.has('next-action')) {
    return NextResponse.next();
  }
  const validatedHeaders = await isLoggedIn(request.headers, request.cookies);
  if (!validatedHeaders) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next({
    request: {
      headers: validatedHeaders
    }
  });
}

export const config = {
  matcher: '/admin/:path*',
}