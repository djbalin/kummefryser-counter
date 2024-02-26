import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

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

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // console.log("dashboard MIDDLEWARE");

    if (userLoggedIn) {
      // console.log("user logged in");

      return response;
    } else {
      return NextResponse.redirect(new URL("/example", request.url));
    }
  }
  // console.log("returnng middleware");

  return response;
}

export const config = {
  matcher: ["/", "/example", "/dashboard"],
};
