import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  let userLoggedIn = false;

  // console.log("REQ headers");
  // console.log(request.headers);
  // console.log("RES");
  // console.log(response);

  const uid = request.cookies.get("user_id");

  if (!uid) {
    response.cookies.set("user_id", "_EXAMPLE");
  } else {
    if (uid!.value.length > 0 && uid!.value != "_EXAMPLE") {
      userLoggedIn = true;
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("dashboard MIDDLEWARE");

    if (userLoggedIn) {
      console.log("user logged in");

      return response;
    } else {
      return NextResponse.redirect(new URL("/example", request.url));

      const newHeaders = new Headers(request.headers);
      newHeaders.set("cookies", "user_id=_EXAMPLE");
      // const newResponse = NextResponse.next();
      // return response;
      // newResponse.cookies.set("user_id", "_EXAMPLE");
      console.log("old HEADERS");
      console.log(request.headers);
      console.log("NEW HEADERS");
      console.log(newHeaders.getSetCookie().push("user_id=_EXAMPLE"));

      return NextResponse.next({
        request: {
          headers: newHeaders,
        },
      });
    }
  }
  console.log("returnng middleware");

  return response;

  // if (request.nextUrl.pathname.startsWith("/profile")) {
  //   if (userLoggedIn) {
  //     return response;
  //   } else {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }
}

export const config = {
  matcher: ["/", "/example", "/dashboard"],
};
