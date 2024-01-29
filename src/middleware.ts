import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const userLoggedIn =
    cookies().has("user_id") && cookies().get("user_id")!.value.length > 0;

  if (request.nextUrl.pathname === "/") {
    console.log("middleware for home page");
    if (userLoggedIn) {
      console.log("middleware for home page: redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return response;
    }
  }
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (userLoggedIn) {
      return response;
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (userLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/profile")) {
    if (userLoggedIn) {
      return response;
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/dashboard", "/profile", "/login"],
};
