import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  console.log(request);
}
 
export const config = {
  matcher: '/admin/:path*',
}