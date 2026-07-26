import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_AUTH_TOKEN_NAME, DEFAULT_USER_EMAIL } from './props';
import { jwtValidate } from './lib';
import { findUser } from './mongo/user.mongo';

async function isLoggedIn(headers: Headers, cookieStore: RequestCookies): Promise<boolean> {
  console.log(cookieStore.getAll());
  const token = cookieStore.get(COOKIE_AUTH_TOKEN_NAME)?.value ?? "";

  const tokenUser = await jwtValidate(token);
  console.log(tokenUser);
  if (!token) return false;

  const user = await findUser(tokenUser?.email || "");

  if(!user) {
    if(tokenUser?.email === DEFAULT_USER_EMAIL) {
      return true;
    }
    return false;
  };

  return true;
}

export async function proxy(request: NextRequest) {
  if (!await isLoggedIn(request.headers, request.cookies)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: '/admin/:path*',
}