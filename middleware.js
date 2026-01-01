import { NextResponse } from "next/server";

export function middleware(req) {
    // ✅ MUST MATCH COOKIE SET IN LOGIN API
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const protectedRoutes = ["/inbox", "/chat"];

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/inbox/:path*", "/chat/:path*"],
};
