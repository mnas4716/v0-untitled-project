import { NextResponse } from "next/server"
import { verifyOTP } from "@/app/actions"

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: "Email and OTP are required" }, { status: 400 })
    }

    const result = await verifyOTP(email, otp)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in verify-otp route:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request" },
      { status: 500 },
    )
  }
}
