import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Disable maintenance mode redirects
  const maintenanceMode = false // Set to false to disable maintenance mode

  if (maintenanceMode) {
    // Check if the request is for the maintenance page itself to avoid redirect loops
    if (request.nextUrl.pathname === "/coming-soon") {
      return NextResponse.next()
    }

    // Check if the request is for the admin sign-in page
    if (request.nextUrl.pathname === "/admin/signin") {
      return NextResponse.next()
    }

    // Redirect all other requests to the maintenance page
    return NextResponse.redirect(new URL("/coming-soon", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
