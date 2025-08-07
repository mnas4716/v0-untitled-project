"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  createUser,
  getUserByEmail,
  updateUser,
  updateUserLoginTime,
  createConsultRequest,
  getAllDoctors,
  addFileAttachmentToConsult,
  cancelConsultRequest,
} from "@/lib/database-service"
import { sendOtpEmail } from "@/lib/email"

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
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  dob: z.string(),
  medicareNumber: z.string().optional(), // Added Medicare Number
  address: z.string().min(5), // Added Address
  reason: z.string().min(10),
})

// Schema for medical certificate form
const medicalCertificateSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  dob: z.string(),
  medicareNumber: z.string().optional(), // Added Medicare Number
  address: z.string().min(5), // Added Address
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
  medicareNumber: z.string().optional(), // Added Medicare Number
  address: z.string().min(5), // Added Address
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

// In-memory OTP storage
const otpStore: { [key: string]: { otp: string; expires: Date } } = {}

// Function to generate a random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Helper function to get a random active doctor
function getRandomActiveDoctor() {
  const doctors = getAllDoctors().filter((doctor) => doctor.isActive)
  if (doctors.length === 0) return null

  const randomIndex = Math.floor(Math.random() * doctors.length)
  return doctors[randomIndex]
}

// Function to request OTP
export async function requestOTP(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address" }
  }

  try {
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // Expires in 15 minutes
    otpStore[email.toLowerCase()] = { otp, expires: expiresAt }

    await sendOtpEmail(email, otp)

    cookies().set("userEmail", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60,
      path: "/",
    })

    return {
      success: true,
      message: "OTP sent successfully",
      otp: process.env.NODE_ENV !== "production" ? otp : undefined,
    }
  } catch (error) {
    console.error("Error in requestOTP:", error)
    return { success: false, message: "Failed to send OTP. Please try again." }
  }
}

// Function to verify OTP
export async function verifyOTP(email: string, otp: string) {
  if (!email || !otp) {
    return { success: false, message: "Email and OTP are required." }
  }

  const storedOTPData = otpStore[email.toLowerCase()]

  if (storedOTPData && storedOTPData.otp === otp && new Date() <= storedOTPData.expires) {
    delete otpStore[email.toLowerCase()]
    cookies().delete("userEmail")

    let user = getUserByEmail(email)
    if (user) {
      updateUserLoginTime(user.id)
    } else {
      // This case should ideally not happen if sign-in is only for existing users
      // but as a fallback, we can create a user.
      user = createUser({ email, firstName: email.split("@")[0], lastName: "" })
    }

    return { success: true, user }
  } else {
    return { success: false, message: "Invalid or expired OTP." }
  }
}

// Generic function to handle form submissions
async function handleFormSubmission(formData: FormData, type: "consultation" | "medical-certificate" | "prescription") {
  try {
    const data = Object.fromEntries(formData.entries())
    const fileCount = Number(data.fileCount) || 0

    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.dob || !data.reason) {
      return { success: false, message: "Missing required fields" }
    }

    const email = data.email as string
    let user = getUserByEmail(email)

    const userDetails = {
      email,
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      phone: data.phone as string,
      dob: data.dob as string,
      medicareNumber: data.medicareNumber as string,
      address: data.address as string,
      suburb: data.suburb as string,
      state: data.state as string,
      postcode: data.postcode as string,
    }

    if (!user) {
      user = createUser(userDetails)
    } else {
      updateUser(user.id, userDetails)
    }

    if (!user) {
      return { success: false, message: "Failed to create or update user account." }
    }

    const randomDoctor = getRandomActiveDoctor()
    const assignedDoctorId = randomDoctor ? randomDoctor.id : undefined

    const today = new Date()
    const consultRequestData = {
      userId: user.id,
      type,
      status: "pending" as const,
      reason: (data.reason || data.medication) as string,
      date: today.toISOString().split("T")[0],
      time: `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}`,
      patientName: `${data.firstName} ${data.lastName}`,
      email,
      phone: data.phone as string,
      assignedDoctorId,
      details: { ...data, files: fileCount > 0 },
      attachments: [],
    }

    const consultRequest = createConsultRequest(consultRequestData)

    if (fileCount > 0) {
      const filePromises = []
      for (let i = 0; i < fileCount; i++) {
        const file = formData.get(`file-${i}`) as File
        if (file) {
          filePromises.push(addFileAttachmentToConsult(consultRequest.id, file))
        }
      }
      await Promise.all(filePromises)
    }

    let redirectUrl = ""
    if (type === "consultation") redirectUrl = "/consult/confirmation"
    if (type === "medical-certificate") redirectUrl = "/medical-certificate/confirmation"
    if (type === "prescription") redirectUrl = "/prescription/confirmation"

    return { success: true, redirectUrl }
  } catch (error) {
    console.error(`Error submitting ${type} request:`, error)
    return { success: false, message: `Failed to submit ${type} request. Please try again.` }
  }
}

export async function submitConsultation(formData: FormData) {
  return handleFormSubmission(formData, "consultation")
}

export async function requestMedicalCertificate(formData: FormData) {
  return handleFormSubmission(formData, "medical-certificate")
}

export async function requestPrescription(formData: FormData) {
  return handleFormSubmission(formData, "prescription")
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

export async function signUp(firstName: string, lastName: string, email: string, passwordPlain: string) {
  console.log("Signing up", firstName, lastName, email, passwordPlain)

  try {
    // Check if user already exists
    const existingUser = getUserByEmail(email)
    if (existingUser) {
      return {
        success: false,
        message: "Email already registered",
      }
    }

    // Create new user
    const user = createUser({
      email,
      firstName,
      lastName,
    })

    if (!user) {
      return {
        success: false,
        message: "Failed to create user account",
      }
    }

    return { success: true, user }
  } catch (error) {
    console.error("Error signing up:", error)
    return {
      success: false,
      message: "An error occurred during sign up",
    }
  }
}

export async function updateUserProfile(id: string, userData: any) {
  console.log("Updating user profile", id, userData)

  try {
    const updatedUser = updateUser(id, userData)

    if (!updatedUser) {
      return {
        success: false,
        message: "Failed to update user profile",
      }
    }

    return { success: true, user: updatedUser }
  } catch (error) {
    console.error("Error updating profile:", error)
    return {
      success: false,
      message: "An error occurred while updating profile",
    }
  }
}

export async function cancelConsultation(id: string, reason?: string) {
  try {
    const result = cancelConsultRequest(id, reason)

    if (!result) {
      return {
        success: false,
        message: "Failed to cancel consultation",
      }
    }

    return {
      success: true,
      message: "Consultation cancelled successfully",
    }
  } catch (error) {
    console.error("Error cancelling consultation:", error)
    return {
      success: false,
      message: "An error occurred while cancelling the consultation",
    }
  }
}
