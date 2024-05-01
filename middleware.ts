import { SESSION_TOKEN_COOKIE } from "@/lib/server/auth";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hasSessionToken = request.cookies.has(SESSION_TOKEN_COOKIE);
  const onAuthRoute = url.pathname.startsWith("/auth");
  const atRoot = url.pathname === "/";

  if (request.method !== "GET") return NextResponse.next();

  if (!onAuthRoute && !hasSessionToken) url.pathname = "/auth";
  else if (onAuthRoute && hasSessionToken) url.pathname = "/library";
  else if (atRoot) url.pathname = hasSessionToken ? "/library" : "/auth";
  else return NextResponse.next();

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
