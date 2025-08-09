import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchMeMiddleware } from "./src/services/fetchMe";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // static / next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  // allow auth API routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isAuthPage = pathname === "/views/auth";

  const cookieHeader = request.headers.get("cookie") ?? "";
  const user = await fetchMeMiddleware(cookieHeader);

  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL("/views/auth", request.url));
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
