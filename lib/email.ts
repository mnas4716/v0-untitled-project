import { Resend } from "resend"

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

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "FreeDOC <noreply@freedoc.com.au>",
      to: [email],
      subject: "Your FreeDOC Login Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">FreeDOC</h1>
            <p style="color: #64748b; margin: 5px 0;">Your Healthcare Partner</p>
          </div>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 30px; text-align: center;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Your Login Code</h2>
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb;">${otp}</span>
            </div>
            <p style="color: #64748b; margin: 20px 0;">Enter this code to complete your sign in</p>
            <p style="color: #ef4444; font-size: 14px;">This code expires in 15 minutes</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              If you didn't request this code, please ignore this email.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending OTP email:", error)
      return { success: false, error }
    }

    console.log("OTP email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Failed to send OTP email:", error)
    return { success: false, error }
  }
}

export async function sendConfirmationEmail(options: EmailOptions) {
  const { type, name, email, details, data } = options
  const to = options.to || email || ""

  if (!to) {
    console.error("No recipient email provided")
    return { success: false, error: "No recipient email provided" }
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "FreeDOC <noreply@freedoc.com.au>",
      to: [to],
      subject: getEmailSubject(type),
      html: getEmailTemplate(type, name || "User", details),
    })

    if (error) {
      console.error("Error sending confirmation email:", error)
      return { success: false, error }
    }

    console.log("Confirmation email sent successfully:", emailData)
    return { success: true, result: emailData }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error }
  }
}

function getEmailSubject(type: EmailType): string {
  switch (type) {
    case "otp":
      return "Your FreeDOC Login Code"
    case "consult":
      return "Consultation Request Received - FreeDOC"
    case "prescription":
      return "Prescription Request Received - FreeDOC"
    case "medical-certificate":
      return "Medical Certificate Request Received - FreeDOC"
    case "contact":
      return "Contact Form Submission - FreeDOC"
    case "admin-notification":
      return "New Request Notification - FreeDOC"
    default:
      return "FreeDOC Notification"
  }
}

function getEmailTemplate(type: EmailType, name: string, details?: Record<string, any>): string {
  const baseTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0;">FreeDOC</h1>
        <p style="color: #64748b; margin: 5px 0;">Your Healthcare Partner</p>
      </div>
  `

  const footer = `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
        <p style="color: #64748b; font-size: 14px; margin: 0;">
          Thank you for choosing FreeDOC for your healthcare needs.
        </p>
      </div>
    </div>
  `

  switch (type) {
    case "consult":
      return (
        baseTemplate +
        `
        <div style="background: #f8fafc; border-radius: 8px; padding: 30px;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Consultation Request Received</h2>
          <p>Dear ${name},</p>
          <p>We have received your consultation request and it is being reviewed by our medical team.</p>
          <p>You will receive an update within 24 hours with next steps.</p>
          <p>Request ID: <strong>${details?.id || "N/A"}</strong></p>
        </div>
      ` +
        footer
      )

    case "prescription":
      return (
        baseTemplate +
        `
        <div style="background: #f8fafc; border-radius: 8px; padding: 30px;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Prescription Request Received</h2>
          <p>Dear ${name},</p>
          <p>We have received your prescription request and it is being reviewed by our medical team.</p>
          <p>You will receive an update within 24 hours.</p>
          <p>Request ID: <strong>${details?.id || "N/A"}</strong></p>
        </div>
      ` +
        footer
      )

    case "medical-certificate":
      return (
        baseTemplate +
        `
        <div style="background: #f8fafc; border-radius: 8px; padding: 30px;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Medical Certificate Request Received</h2>
          <p>Dear ${name},</p>
          <p>We have received your medical certificate request and it is being reviewed by our medical team.</p>
          <p>You will receive an update within 24 hours.</p>
          <p>Request ID: <strong>${details?.id || "N/A"}</strong></p>
        </div>
      ` +
        footer
      )

    default:
      return (
        baseTemplate +
        `
        <div style="background: #f8fafc; border-radius: 8px; padding: 30px;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">FreeDOC Notification</h2>
          <p>Dear ${name},</p>
          <p>This is a notification from FreeDOC.</p>
        </div>
      ` +
        footer
      )
  }
}
