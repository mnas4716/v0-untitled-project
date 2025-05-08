import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if the path is a protected route
  const isProtectedRoute =
    path.startsWith("/dashboard") || path.startsWith("/admin/dashboard") || path.startsWith("/doctor/dashboard")

  // If it's not a protected route, allow the request
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If there's no token, redirect to the sign-in page
  if (!token) {
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(signInUrl)
  }

  // Check role-based access
  const userRole = token.role as string

  // Admin routes
  if (path.startsWith("/admin/dashboard") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/auth/unauthorized", request.url))
  }

  // Doctor routes
  if (path.startsWith("/doctor/dashboard") && userRole !== "doctor") {
    return NextResponse.redirect(new URL("/auth/unauthorized", request.url))
  }

  // Allow the request
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
