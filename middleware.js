import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const session = req.cookies.get("next-auth.session-token");

  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!session && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
