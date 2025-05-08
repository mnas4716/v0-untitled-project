import { Resend } from "resend"
import { EmailTemplate } from "@/components/email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

type EmailType = "otp" | "consult" | "prescription" | "medical-certificate" | "contact" | "admin-notification"

interface EmailOptions {
  to?: string
  type: EmailType
  name?: string
  email?: string
  details?: Record<string, any>
  data?: Record<string, any>
}

export async function sendConfirmationEmail(options: EmailOptions) {
  const { type, name, email, details, data } = options
  const to = options.to || email || ""

  if (!to) {
    console.error("No recipient email provided")
    return { success: false, error: "No recipient email provided" }
  }

  try {
    let subject = ""
    let emailData: Record<string, any> = {}

    switch (type) {
      case "otp":
        subject = "Your One-Time Password"
        emailData = {
          name: name || "User",
          otp: details?.otp || "123456",
          expiresIn: "15 minutes",
        }
        break
      case "consult":
        subject = "Consultation Request Confirmation"
        emailData = {
          name: name || "User",
          reason: details?.reason || "",
        }
        break
      case "prescription":
        subject = "Prescription Request Confirmation"
        emailData = {
          name: name || "User",
          medication: details?.medication || "",
        }
        break
      case "medical-certificate":
        subject = "Medical Certificate Request Confirmation"
        emailData = {
          name: name || "User",
          startDate: details?.startDate || "",
          endDate: details?.endDate || "",
        }
        break
      case "contact":
        subject = "Contact Form Submission Confirmation"
        emailData = {
          name: name || "User",
          message: details?.message || "",
        }
        break
      case "admin-notification":
        subject = `New ${data?.type || "Request"} from ${data?.name || "a user"}`
        emailData = {
          type: data?.type || "Request",
          name: data?.name || "User",
          email: data?.email || "",
          phone: data?.phone || "",
          message: data?.reason || data?.message || "",
        }
        break
      default:
        subject = "Notification from FreeDOC"
        emailData = {
          name: name || "User",
        }
    }

    console.log(`Sending ${type} email to ${to}`)

    const result = await resend.emails.send({
      from: "FreeDOC <noreply@freedoc.com.au>",
      to: [to],
      subject,
      react: EmailTemplate({ type, data: emailData }),
    })

    console.log("Email sent successfully:", result)
    return { success: true, result }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error }
  }
}
