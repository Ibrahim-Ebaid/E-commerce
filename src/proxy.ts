import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "./app/(pages)/Helpers/getUserToken";
export default async function proxy(req: NextRequest) {
  const token = await getUserToken();

  const protectedRoutes = ["/cart", "/profile", "/checkout", "/wishlist"];
  const authRoutes = ["/login", "/register"];

  const { pathname } = req.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (authRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
