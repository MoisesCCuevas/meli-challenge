import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/") {
    return Response.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}
