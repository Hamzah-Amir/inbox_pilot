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

  // Blocking un-authenticated users from dashbaord
  const session = req.cookies.get("next-auth.session-token");
  if (!session && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }


  // Otherwise, allow all other pages
  return NextResponse.next();
}
