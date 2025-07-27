import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname === "/" || pathname.startsWith("/dashboard");

  const isAuthPage =
    pathname === "/views/auth/login" || pathname === "/views/auth/register";

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/views/auth/login", request.url));
  }

  if (isAuthPage && token) {
  
    return NextResponse.next();
  }

  return NextResponse.next();
}
