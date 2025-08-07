import { NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth-utils"

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json()

    // In a real app, we would validate the OTP against what was sent
    // For demo purposes, we'll accept any 6-digit OTP
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      return NextResponse.json({ success: false, message: "Invalid OTP format" }, { status: 400 })
    }

    // Use the shared authentication function
    const result = await authenticateUser(email)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message || "Authentication failed" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      user: result.user,
    })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ success: false, message: "An error occurred during verification" }, { status: 500 })
  }
}
