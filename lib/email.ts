// Comment out or remove the Resend import temporarily
// import { Resend } from 'resend';
// import { EmailTemplate } from "@/components/email-template"

// const resend = new Resend(process.env.RESEND_API_KEY);

type EmailType = "otp" | "consult" | "prescription" | "medical-certificate" | "contact" | "admin-notification"

interface EmailOptions {
  to?: string
  type: EmailType
  name?: string
  email?: string
  details?: Record<string, any>
  data?: Record<string, any>
}

export const sendOtpEmail = async (email: string, otp: string) => {
  // TEMPORARY FIX: Log OTP to the console instead of sending it
  console.log(`Sending OTP to ${email}: ${otp}`)
  // You can also simulate a successful send:
  return { success: true }
}

export async function sendConfirmationEmail(options: EmailOptions) {
  const { type, name, email, details, data } = options
  const to = options.to || email || ""

  if (!to) {
    console.error("No recipient email provided")
    return { success: false, error: "No recipient email provided" }
  }

  try {
    // TEMPORARY FIX: Log the email details instead of sending
    console.log(`[EMAIL SIMULATION] Sending ${type} email to ${to}`)

    if (type === "otp" && details?.otp) {
      console.log(`[OTP CODE] ${details.otp}`)
    }

    // Log other details for debugging
    console.log("[EMAIL DETAILS]", {
      type,
      to,
      name: name || "User",
      details,
    })

    // Simulate successful email sending
    return {
      success: true,
      result: { id: `simulated-email-${Date.now()}` },
      devNote: "Email sending simulated - check console for details",
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error }
  }
}
