import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!request.nextUrl.pathname.startsWith("/admin/login")) {
      if (request.cookies.get("admin-token")) {
        //已经登录
      } else {
        //跳转到登录页面
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
  }
  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
