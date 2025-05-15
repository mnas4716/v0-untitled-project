import { type NextRequest, NextResponse } from "next/server"
import { requestOTP } from "@/app/actions"
import { getUserByEmail } from "@/lib/database-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Check if user exists in database
    const user = getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ success: false, message: "Email not found", notRegistered: true }, { status: 404 })
    }

    // Request OTP
    const result = await requestOTP(email)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error requesting OTP:", error)
    return NextResponse.json({ success: false, message: "An error occurred while requesting OTP" }, { status: 500 })
  }
}
