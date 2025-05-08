import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Paths that should be accessible even when in "coming soon" mode
const ALLOWED_PATHS = [
  "/admin/signin",
  "/coming-soon",
  "/api/", // Allow API routes to work
  "/_next/", // Allow Next.js assets
  "/favicon.ico",
]

// Special bypass token for admin access (you can change this to something more secure)
const ADMIN_BYPASS_TOKEN = "admin-preview"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is allowed to be accessed directly
  const isAllowedPath = ALLOWED_PATHS.some((path) => pathname.startsWith(path))

  // Check for admin bypass cookie or query parameter
  const cookies = request.cookies
  const hasAdminBypass = cookies.has(ADMIN_BYPASS_TOKEN) || request.nextUrl.searchParams.has(ADMIN_BYPASS_TOKEN)

  // If not an allowed path and no admin bypass, redirect to coming soon page
  if (!isAllowedPath && !hasAdminBypass) {
    const url = request.nextUrl.clone()
    url.pathname = "/coming-soon"
    return NextResponse.redirect(url)
  }

  // If accessing admin signin with bypass parameter, set a cookie for future requests
  if (pathname === "/admin/signin" && request.nextUrl.searchParams.has(ADMIN_BYPASS_TOKEN)) {
    const response = NextResponse.next()
    response.cookies.set(ADMIN_BYPASS_TOKEN, "true", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
    return response
  }

  // For all other cases, proceed normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except for static files, api routes, etc.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
