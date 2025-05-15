import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/database-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ exists: false, error: "Email is required" }, { status: 400 })
    }

    // Check if user exists in database
    const user = getUserByEmail(email)

    return NextResponse.json({ exists: !!user })
  } catch (error) {
    console.error("Error checking user:", error)
    return NextResponse.json({ exists: false, error: "An error occurred while checking user" }, { status: 500 })
  }
}
