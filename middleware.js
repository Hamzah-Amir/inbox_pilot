import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();

  // Allow API routes, Next.js internals, and static files
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Block  page middleware
  // if (url.pathname.startsWith("/checkout") || url.pathname.startsWith("/pricing")) {
  //   url.pathname = "/maintenance";
  //   return NextResponse.rewrite(url);
  // }

  // Otherwise, allow all other pages
  return NextResponse.next();
}
