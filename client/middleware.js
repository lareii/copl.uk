import { NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth/verify";

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("jwt") ?? { value: null };

  const isVerified = token && (await verifyToken(token));

  if (nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register")) {
    if (!isVerified) return NextResponse.next();

    return NextResponse.redirect(new URL(`/app`, url));
  }

  if (!isVerified) return NextResponse.redirect(new URL(`/login`, url));

  return NextResponse.next();
}


export const config = {
  matcher: ["/login", "/app/:path*"]
};