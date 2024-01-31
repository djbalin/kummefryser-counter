import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  let userLoggedIn = false;

  const uid = request.cookies.get("user_id");

  if (!uid) {
    response.cookies.set("user_id", "_EXAMPLE");
  } else {
    if (uid!.value.length > 0 && uid!.value != "_EXAMPLE") {
      userLoggedIn = true;
    }
  }
  // response.cookies.set("user_id", uid!.value);
  // const userLoggedIn =
  //   request.cookies.has("user_id") &&
  //   request.cookies.get("user_id")!.value.length > 0;

  // if (request.nextUrl.pathname === "/") {
  //   console.log("middleware for home page");
  //   if (userLoggedIn) {
  //     console.log("middleware for home page: redirecting to dashboard");
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   } else {
  //     return response;
  //   }
  // }
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (userLoggedIn) {
      return response;
    } else {
      return NextResponse.redirect(new URL("/", request.url));
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
  matcher: ["/", "/dashboard", "/profile"],
};
