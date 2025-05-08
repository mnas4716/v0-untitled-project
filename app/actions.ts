"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sendConfirmationEmail } from "@/lib/email"
import { v4 as uuidv4 } from "uuid"

// For demo purposes, we'll use a fixed OTP
const DEMO_OTP = "123456"

// Schema for sign-in form
const signInSchema = z.object({
  email: z.string().email(),
})

// Schema for OTP verification
const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
})

// Schema for admin sign-in form
const adminSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

// Schema for consultation form
const consultSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  date: z.string(),
  reason: z.string().min(10),
})

// Schema for medical certificate form
const medicalCertificateSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  dob: z.string(),
  reason: z.string().min(10),
  startDate: z.string(),
  endDate: z.string(),
})

// Schema for prescription form
const prescriptionSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  medication: z.string().min(2),
  deliveryOption: z.string(),
  dob: z.string(),
})

// Schema for contact form
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

// Function to request OTP
export async function requestOTP(email: string) {
  // Validate form data
  const validatedFields = signInSchema.safeParse({
    email: email,
  })

  // Return early if form validation fails
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid email address",
    }
  }

  try {
    // In a real application, we would generate a random OTP and store it securely
    // For demo purposes, we'll use a fixed OTP
    const otp = DEMO_OTP

    // Store the email in a cookie for the OTP verification step
    cookies().set("userEmail", email)

    // Send OTP to user's email (in a real app)
    // For demo, we'll just log it
    console.log(`OTP for ${email}: ${otp}`)

    // Send email with OTP
    // await sendConfirmationEmail({
    //   to: email,
    //   type: "otp",
    //   data: {
    //     otp,
    //     email,
    //   },
    // })

    return { success: true, otp: DEMO_OTP }
  } catch (error) {
    return {
      success: false,
      message: "Failed to send OTP. Please try again.",
    }
  }
}

// Function to verify OTP and sign in
export async function signInWithOTP(email: string, otp: string) {
  // Get email from cookie
  // const email = cookies().get("userEmail")?.value

  if (!email) {
    return {
      success: false,
      message: "Email not found. Please try again.",
    }
  }

  // Validate form data
  const validatedFields = otpSchema.safeParse({
    email: email,
    otp: otp,
  })

  // Return early if form validation fails
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid OTP",
    }
  }

  try {
    // In a real application, we would verify the OTP against what was stored
    // For demo purposes, we'll check against our fixed OTP
    if (otp !== DEMO_OTP) {
      return {
        success: false,
        message: "Invalid OTP",
      }
    }

    // Clear the email cookie
    cookies().delete("userEmail")

    // Redirect to success page
    return { success: true, user: { email } }
  } catch (error) {
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
    }
  }
}

// Function to handle admin sign-in
export async function adminSignIn(formData: FormData) {
  // Validate form data
  const validatedFields = adminSignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  // Return early if form validation fails
  if (!validatedFields.success) {
    return {
      error: "Invalid email or password",
    }
  }

  const { email, password } = validatedFields.data

  try {
    // For demo purposes, we'll check against hardcoded credentials
    if (email !== "moe@freedoc.com.au" || password !== "admin123") {
      return {
        error: "Invalid email or password",
      }
    }

    // Redirect to admin dashboard
    redirect("/admin/dashboard")
  } catch (error) {
    return {
      error: "Failed to sign in. Please try again.",
    }
  }
}

// Function to handle consultation form submission
export async function submitConsultation(formData: FormData) {
  // Validate form data
  const validatedFields = consultSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    reason: formData.get("reason"),
  })

  // Return early if form validation fails
  if (!validatedFields.success) {
    return {
      error: "Invalid form data",
    }
  }

  const { name, email, phone, date, reason } = validatedFields.data

  try {
    // Create a consultation object
    const consultation = {
      id: uuidv4(),
      name,
      email,
      phone,
      date,
      reason,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Send confirmation email to user
    await sendConfirmationEmail({
      type: "consult",
      name,
      email,
      details: {
        date,
      },
    })

    // Send notification email to admin
    await sendConfirmationEmail({
      to: "moe@freedoc.com.au",
      type: "admin-notification",
      data: {
        type: "Consultation",
        name,
        email,
        phone,
        date,
        reason,
      },
    })

    // Redirect to confirmation page
    redirect("/consult/confirmation")
  } catch (error) {
    return {
      error: "Failed to submit consultation request. Please try again.",
    }
  }
}

// Function to handle medical certificate form submission
export async function requestMedicalCertificate(formData: FormData) {
  try {
    // Extract data from FormData
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const dob = formData.get("dob") as string
    const reason = formData.get("reason") as string
    const startDate = formData.get("startDate") as string
    const endDate = formData.get("endDate") as string
    const fileCount = Number.parseInt(formData.get("fileCount") as string)

    // Basic validation (you might want to use zod here as well)
    if (!firstName || !lastName || !email || !phone || !dob || !reason || !startDate || !endDate) {
      return { success: false, message: "Missing required fields" }
    }

    // Log the data (for debugging purposes)
    console.log("Form Data:", {
      firstName,
      lastName,
      email,
      phone,
      dob,
      reason,
      startDate,
      endDate,
      fileCount,
    })

    // Handle file uploads (if any)
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file-${i}`) as File
      console.log(`File ${i + 1}:`, file.name, file.type, file.size)
    }

    // Simulate success
    return { success: true, message: "Medical certificate request submitted successfully" }
  } catch (error) {
    console.error("Error submitting medical certificate request:", error)
    return { success: false, message: "Failed to submit medical certificate request" }
  }
}

// Function to handle prescription form submission
export async function requestPrescription(formData: FormData) {
  try {
    // Extract data from FormData
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const dob = formData.get("dob") as string
    const medication = formData.get("medication") as string
    const deliveryOption = formData.get("deliveryOption") as string
    const fileCount = Number.parseInt(formData.get("fileCount") as string)

    // Basic validation (you might want to use zod here as well)
    if (!firstName || !lastName || !email || !phone || !dob || !medication || !deliveryOption) {
      return { success: false, message: "Missing required fields" }
    }

    // Log the data (for debugging purposes)
    console.log("Form Data:", {
      firstName,
      lastName,
      email,
      phone,
      dob,
      medication,
      deliveryOption,
      fileCount,
    })

    // Handle file uploads (if any)
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file-${i}`) as File
      console.log(`File ${i + 1}:`, file.name, file.type, file.size)
    }

    // Simulate success
    return { success: true, message: "Prescription request submitted successfully" }
  } catch (error) {
    console.error("Error submitting prescription request:", error)
    return { success: false, message: "Failed to submit prescription request" }
  }
}

export async function signUp(firstName: string, lastName: string, email: string, passwordPlain: string) {
  console.log("Signing up", firstName, lastName, email, passwordPlain)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

export async function updateUserProfile(id: string, userData: any) {
  console.log("Updating user profile", id, userData)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { id, ...userData } })
    }, 1000)
  })
}
