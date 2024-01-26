// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase/auth";
import { auth } from "./app/lib/firebase/firebase";
import { cookies } from "next/headers";

// export function middleware(request: NextRequest) {
//   console.log(request);

//   //   const currentUser = request.cookies.get("currentUser")?.value;

//   //   if (currentUser) {
//   //     return NextResponse.redirect(new URL("/dashboard", request.url));
//   //   }
//   //   return NextResponse.redirect(new URL("/login", request.url));
// }

export function middleware(request: NextRequest) {
  // console.log("MIDDLEWARE?");
  const response = NextResponse.next();
  const userLoggedIn = cookies().has("USER");
  // console.log("User logged in ? " + userLoggedIn);

  // console.log();
  // console.log(response.cookies);
  // console.log(cookies().getAll());

  // const user = auth.currentUser;
  // if (userL) {
  //   console.log("USER YES" + user.displayName);
  // } else {
  //   console.log("USER NO");
  // }
  // if (request.nextUrl.pathname == "/") {
  //   console.log("middleware for homepage");
  //   if (userLoggedIn) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // console.log("middleware for dashboard");
    if (userLoggedIn) {
      return response;
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    // console.log("middleware for login");

    if (userLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/profile")) {
    // console.log("middleware for profile");

    if (userLoggedIn) {
      return response;
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

export const config = {
  //   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  matcher: ["/", "/dashboard", "/profile", "/login"],
};
