"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = "moe@freedoc.com.au"

type EmailType = "consult" | "certificate" | "prescription" | "contact" | "otp"

interface EmailDetails {
  [key: string]: string
}

interface SendConfirmationEmailProps {
  type: EmailType
  name: string
  email: string
  details: EmailDetails
}

export async function sendConfirmationEmail({ type, name, email, details }: SendConfirmationEmailProps) {
  try {
    let subject = ""
    let detailsHtml = ""

    // Configure email based on type
    switch (type) {
      case "consult":
        subject = "Your Consultation Request - FreeDOC"
        detailsHtml = `
          <p><strong>Date:</strong> ${details.date}</p>
          <p><strong>Time:</strong> ${details.time}</p>
          <p><strong>Reason:</strong> ${details.reason}</p>
        `
        break
      case "certificate":
        subject = "Your Medical Certificate Request - FreeDOC"
        detailsHtml = `
          <p><strong>Date:</strong> ${details.date}</p>
          <p><strong>Reason:</strong> ${details.reason}</p>
        `
        break
      case "prescription":
        subject = "Your Prescription Request - FreeDOC"
        detailsHtml = `
          <p><strong>Medication:</strong> ${details.medication}</p>
          <p><strong>Dosage:</strong> ${details.dosage}</p>
          <p><strong>Additional Information:</strong> ${details.additionalInfo}</p>
        `
        break
      case "contact":
        subject = "Your Contact Form Submission - FreeDOC"
        detailsHtml = `
          <p><strong>Subject:</strong> ${details.subject}</p>
          <p><strong>Message:</strong> ${details.message}</p>
        `
        break
      case "otp":
        subject = "Your Sign-In Code - FreeDOC"
        detailsHtml = `
          <p>Your sign-in code is: <strong>${details.otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        `
        break
      default:
        subject = "FreeDOC Notification"
        detailsHtml = Object.entries(details)
          .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
          .join("")
    }

    // Send email to user
    await resend.emails.send({
      from: "FreeDOC <no-reply@freedoc.com.au>",
      to: [email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">FreeDOC</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2>Hello ${name},</h2>
            <p>Thank you for using FreeDOC. We have received your request.</p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
              ${detailsHtml}
            </div>
            
            <p>Our team will review your request and get back to you shortly.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>The FreeDOC Team</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>&copy; 2023 FreeDOC. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    // Also send a copy to admin
    await resend.emails.send({
      from: "FreeDOC <no-reply@freedoc.com.au>",
      to: [ADMIN_EMAIL],
      subject: `[ADMIN COPY] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">FreeDOC - ADMIN NOTIFICATION</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2>New ${type} request from ${name}</h2>
            <p><strong>User Email:</strong> ${email}</p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
              ${detailsHtml}
            </div>
            
            <p>Please review this request at your earliest convenience.</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>&copy; 2023 FreeDOC. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error }
  }
}
