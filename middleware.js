import { NextResponse } from "next/server";

export function middleware(req) {
    const user = req.cookies.get("user")?.value;
    const { pathname } = req.nextUrl;

    const protectedRoutes = ["/inbox", "/chat"];

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtected && !user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/inbox/:path*", "/chat/:path*"],
};
