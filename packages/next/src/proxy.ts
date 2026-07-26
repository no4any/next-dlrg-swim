import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_AUTH_TOKEN_NAME, DEFAULT_USER_EMAIL, HEADER_USER_NAME } from './props';
import { jwtValidate } from './lib';
import { findUser } from './mongo/user.mongo';

async function isLoggedIn(headers: Headers, cookieStore: RequestCookies): Promise<Headers | null> {
  const token = cookieStore.get(COOKIE_AUTH_TOKEN_NAME)?.value ?? "";

  const tokenUser = await jwtValidate(token);

  if (!token) return null;

  const user = await findUser(tokenUser?.email || "");

  if(!user) {
    if(tokenUser?.email === DEFAULT_USER_EMAIL) {
      headers.set(HEADER_USER_NAME, DEFAULT_USER_EMAIL);
      return headers;
    }
    return null;
  };

  headers.set(HEADER_USER_NAME, user.email);

  return headers;
}

export async function proxy(request: NextRequest) {
  request.headers.delete(HEADER_USER_NAME);
  const headers = await isLoggedIn(request.headers, request.cookies);
  if (!headers) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  

  return NextResponse.next({
    headers
  });
}

export const config = {
  matcher: '/admin/:path*',
}