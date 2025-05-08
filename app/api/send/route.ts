import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, data } = body

    // Always include moe@freedoc.com.au as a recipient for consult and contact requests
    const adminEmail = "moe@freedoc.com.au"
    let subject = ""
    let html = ""
    let to = []

    if (type === "consult") {
      subject = "New Consultation Request"
      to = [data.email, adminEmail]
      html = `
        <h1>Consultation Request Received</h1>
        <p>Thank you for your consultation request. Here are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Reason:</strong> ${data.reason}</li>
          <li><strong>Symptoms:</strong> ${data.symptoms}</li>
          <li><strong>Date:</strong> ${data.date}</li>
        </ul>
        <p>A doctor will contact you shortly.</p>
      `
    } else if (type === "contact") {
      subject = "New Contact Form Submission"
      to = [data.email, adminEmail]
      html = `
        <h1>Contact Form Submission</h1>
        <p>Thank you for contacting us. Here are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Message:</strong> ${data.message}</li>
        </ul>
        <p>We will get back to you as soon as possible.</p>
      `
    } else if (type === "medical-certificate") {
      subject = "Medical Certificate Request"
      to = [data.email, adminEmail]
      html = `
        <h1>Medical Certificate Request Received</h1>
        <p>Thank you for your medical certificate request. Here are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Reason:</strong> ${data.reason}</li>
          <li><strong>Date:</strong> ${data.date}</li>
        </ul>
        <p>A doctor will process your request shortly.</p>
      `
    } else if (type === "prescription") {
      subject = "Prescription Renewal Request"
      to = [data.email, adminEmail]
      html = `
        <h1>Prescription Renewal Request Received</h1>
        <p>Thank you for your prescription renewal request. Here are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Medication:</strong> ${data.medication}</li>
          <li><strong>Pharmacy:</strong> ${data.pharmacy}</li>
        </ul>
        <p>A doctor will process your request shortly.</p>
      `
    }

    const result = await resend.emails.send({
      from: "FreeDoc <no-reply@freedoc.com.au>",
      to,
      subject,
      html,
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
