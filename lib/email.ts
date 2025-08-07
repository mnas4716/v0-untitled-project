import { Resend } from "resend"
import type React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

const OtpEmailTemplate: React.FC<{ otp: string }> = ({ otp }) => (
  <div style={{ fontFamily: "sans-serif", padding: "20px", backgroundColor: "#f9f9f9" }}>
    <div style={{ maxWidth: "600px", margin: "auto", backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
      <h1 style={{ color: "#333" }}>Your Verification Code</h1>
      <p style={{ color: "#555" }}>
        Please use the following one-time password (OTP) to sign in to your account.
      </p>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          margin: "20px 0",
          padding: "10px",
          backgroundColor: "#eee",
          textAlign: "center",
          letterSpacing: "4px",
          borderRadius: "4px",
        }}
      >
        {otp}
      </div>
      <p style={{ color: "#555" }}>This code will expire in 15 minutes.</p>
      <p style={{ color: "#555", fontSize: "12px" }}>
        If you did not request this code, please ignore this email.
      </p>
    </div>
  </div>
)

export const sendOtpEmail = async (email: string, otp: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[DEV MODE] OTP for ${email}: ${otp}`)
    return { success: true, message: "OTP logged to console in dev mode." }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "FreeDoc <noreply@freedoc.com.au>",
      to: [email],
      subject: "Your FreeDoc Verification Code",
      react: <OtpEmailTemplate otp={otp} />,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error: "An unexpected error occurred." }
  }
}
