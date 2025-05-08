import { NextResponse } from "next/server"
import { requestOTP } from "@/app/actions"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const result = await requestOTP(email)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in request-otp route:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request" },
      { status: 500 },
    )
  }
}
