import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, data } = body

    // Always include moe@freedoc.com.au as a recipient for consult and contact requests
    const adminEmail = "moe@freedoc.com.au"
    let subject = ""
    let to = []

    if (type === "consult") {
      subject = "New Consultation Request"
      to = [data.email, adminEmail]
    } else if (type === "contact") {
      subject = "New Contact Form Submission"
      to = [data.email, adminEmail]
    } else if (type === "medical-certificate") {
      subject = "Medical Certificate Request"
      to = [data.email, adminEmail]
    } else if (type === "prescription") {
      subject = "Prescription Renewal Request"
      to = [data.email, adminEmail]
    }

    // TEMPORARY FIX: Log the email details instead of sending
    console.log(`[EMAIL SIMULATION] Sending ${type} email to ${to.join(", ")}`)
    console.log("[EMAIL DETAILS]", { type, data })

    // Simulate successful email sending
    return NextResponse.json({
      success: true,
      result: { id: `simulated-email-${Date.now()}` },
      devNote: "Email sending simulated - check console for details",
    })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
