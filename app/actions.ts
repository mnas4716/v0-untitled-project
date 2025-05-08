"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
  createConsultRequest,
  updateConsultRequest,
  cancelConsultRequest,
  completeConsultRequest,
  createUser,
  getUserByEmail,
  updateUser,
  updateUserLoginTime,
} from "@/lib/database-service"
import { revalidatePath } from "next/cache"

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

// In-memory OTP storage
const otpStore: { [key: string]: { otp: string; expires: Date } } = {}

// Function to generate a random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Optimize the OTP functions for better performance and reliability

// Function to request OTP
export async function requestOTP(email: string) {
  console.log("requestOTP called for:", email)

  // Validate email
  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Invalid email address",
    }
  }

  try {
    // Generate a random 6-digit OTP
    const otp = generateOTP()
    console.log(`Generated OTP for ${email}: ${otp}`)

    // Store OTP with expiration (15 minutes)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
    otpStore[email] = { otp, expires: expiresAt }
    console.log(`OTP stored for ${email}, expires at ${expiresAt.toISOString()}`)

    // Store the email in a cookie for the OTP verification step
    cookies().set("userEmail", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    })

    // For development, always return the OTP for easier testing
    return {
      success: true,
      message: "OTP sent successfully",
      otp: otp, // Always include OTP for easier testing
    }
  } catch (error) {
    console.error("Error in requestOTP:", error)
    return {
      success: false,
      message: "Failed to send OTP. Please try again.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Function to verify OTP and sign in
export async function verifyOTP(email: string, otp: string) {
  console.log("verifyOTP called for:", email, "with OTP:", otp)

  // Validate inputs
  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Invalid email address",
    }
  }

  if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
    return {
      success: false,
      message: "Invalid OTP format",
    }
  }

  try {
    // Get stored OTP
    const storedOTPData = otpStore[email]
    console.log("Retrieved OTP data:", storedOTPData)

    // For development, accept any 6-digit OTP for easier testing
    const isValidOTP =
      process.env.NODE_ENV !== "production"
        ? /^\d{6}$/.test(otp)
        : storedOTPData && storedOTPData.otp === otp && new Date() <= storedOTPData.expires

    if (isValidOTP) {
      // OTP is valid, clean up
      if (storedOTPData) {
        delete otpStore[email]
      }
      cookies().delete("userEmail")

      // Check if user exists, if not create a new user
      let user = getUserByEmail(email)

      if (!user) {
        // Create new user with basic info
        user = createUser({
          email,
          firstName: email.split("@")[0], // Simple name extraction from email
          lastName: "",
        })

        if (!user) {
          return {
            success: false,
            message: "Failed to create user account.",
          }
        }
      } else {
        // Update last login time
        updateUserLoginTime(user.id)
      }

      console.log("User authenticated successfully:", user)
      return {
        success: true,
        user: user,
      }
    } else {
      // Invalid OTP
      return {
        success: false,
        message: storedOTPData
          ? "Invalid OTP. Please try again."
          : "OTP expired or not found. Please request a new one.",
      }
    }
  } catch (error) {
    console.error("Error in verifyOTP:", error)
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
      error: error instanceof Error ? error.message : String(error),
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

// Function to update request status
export async function updateRequestStatus(requestId: string, status: string, notes?: string) {
  // Get the session
  const session = await getServerSession(authOptions)

  // If there's no session, throw an error
  if (!session) {
    return { success: false, message: "Unauthorized" }
  }

  // Get the user's role
  const userRole = session.user.role

  // Only allow admins and doctors to update request status
  if (userRole !== "admin" && userRole !== "doctor") {
    return { success: false, message: "Unauthorized" }
  }

  try {
    let result

    if (status === "completed") {
      result = completeConsultRequest(requestId, notes)
    } else if (status === "cancelled") {
      result = cancelConsultRequest(requestId, notes)
    } else {
      result = updateConsultRequest(requestId, { status })
    }

    if (!result) {
      return { success: false, message: "Request not found" }
    }

    // Revalidate the dashboard pages to ensure data consistency
    revalidatePath("/admin/dashboard")
    revalidatePath("/doctor/dashboard")
    revalidatePath("/dashboard")

    return { success: true, message: "Status updated successfully" }
  } catch (error) {
    console.error("Error updating request status:", error)
    return { success: false, message: "Failed to update request status" }
  }
}

// Function to handle consultation form submission
export async function submitConsultation(formData: FormData) {
  try {
    // Get the session
    const session = await getServerSession(authOptions)

    // Extract data from FormData
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const dob = formData.get("dob") as string
    const reason = formData.get("reason") as string
    const fileCount = Number.parseInt(formData.get("fileCount") as string) || 0

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !dob || !reason) {
      return { success: false, message: "Missing required fields" }
    }

    // Check if user exists, if not create a new user
    let user = getUserByEmail(email)
    let userId = session?.user?.id || null

    if (!user) {
      // Create new user with provided info
      user = createUser({
        email,
        firstName,
        lastName,
        phone,
        dob,
      })

      if (!user) {
        return {
          success: false,
          message: "Failed to create user account.",
        }
      }

      userId = user.id
    } else {
      // Update user information if it exists
      updateUser(user.id, {
        firstName,
        lastName,
        phone,
        dob,
      })

      userId = user.id
    }

    // Get current date and time for the appointment
    const today = new Date()
    const date = today.toISOString().split("T")[0]
    const time = `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}`

    // Create consultation request
    const consultRequest = createConsultRequest({
      userId: userId,
      type: "consultation",
      status: "pending",
      reason,
      date,
      time,
      patientName: `${firstName} ${lastName}`,
      email,
      phone,
      details: {
        firstName,
        lastName,
        email,
        phone,
        dob,
        files: fileCount > 0 ? true : false,
      },
    })

    // Revalidate paths
    revalidatePath("/dashboard")
    revalidatePath("/admin/dashboard")
    revalidatePath("/doctor/dashboard")

    // Return success with redirect URL instead of directly redirecting
    return {
      success: true,
      redirectUrl: "/consult/confirmation",
      message: "Consultation request submitted successfully",
    }
  } catch (error) {
    console.error("Error submitting consultation request:", error)
    return {
      success: false,
      message: "Failed to submit consultation request. Please try again.",
      error: error instanceof Error ? error.message : String(error),
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
    const fileCount = Number.parseInt(formData.get("fileCount") as string) || 0

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !dob || !reason || !startDate || !endDate) {
      return { success: false, message: "Missing required fields" }
    }

    // Check if user exists, if not create a new user
    let user = getUserByEmail(email)

    if (!user) {
      // Create new user with provided info
      user = createUser({
        email,
        firstName,
        lastName,
        phone,
        dob,
      })

      if (!user) {
        return {
          success: false,
          message: "Failed to create user account.",
        }
      }
    } else {
      // Update user information if it exists
      updateUser(user.id, {
        firstName,
        lastName,
        phone,
        dob,
      })
    }

    // Get current date and time for the appointment
    const today = new Date()
    const date = today.toISOString().split("T")[0]
    const time = `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}`

    // Create medical certificate request
    const consultRequest = createConsultRequest({
      userId: user.id,
      type: "medical-certificate",
      status: "pending",
      reason,
      date,
      time,
      patientName: `${firstName} ${lastName}`,
      email,
      phone,
      details: {
        firstName,
        lastName,
        email,
        phone,
        dob,
        startDate,
        endDate,
        files: fileCount > 0 ? true : false,
      },
    })

    // Return success with redirect URL instead of directly redirecting
    return {
      success: true,
      redirectUrl: "/medical-certificate/confirmation",
      message: "Medical certificate request submitted successfully",
    }
  } catch (error) {
    console.error("Error submitting medical certificate request:", error)
    return {
      success: false,
      message: "Failed to submit medical certificate request",
      error: error instanceof Error ? error.message : String(error),
    }
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
    const fileCount = Number.parseInt(formData.get("fileCount") as string) || 0

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !dob || !medication || !deliveryOption) {
      return { success: false, message: "Missing required fields" }
    }

    // Check if user exists, if not create a new user
    let user = getUserByEmail(email)

    if (!user) {
      // Create new user with provided info
      user = createUser({
        email,
        firstName,
        lastName,
        phone,
        dob,
      })

      if (!user) {
        return {
          success: false,
          message: "Failed to create user account.",
        }
      }
    } else {
      // Update user information if it exists
      updateUser(user.id, {
        firstName,
        lastName,
        phone,
        dob,
      })
    }

    // Get current date and time for the appointment
    const today = new Date()
    const date = today.toISOString().split("T")[0]
    const time = `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}`

    // Create prescription request
    const consultRequest = createConsultRequest({
      userId: user.id,
      type: "prescription",
      status: "pending",
      reason: `Prescription request: ${medication}`,
      date,
      time,
      patientName: `${firstName} ${lastName}`,
      email,
      phone,
      details: {
        firstName,
        lastName,
        email,
        phone,
        dob,
        medication,
        deliveryOption,
        files: fileCount > 0 ? true : false,
      },
    })

    // Return success with redirect URL instead of directly redirecting
    return {
      success: true,
      redirectUrl: "/prescription/confirmation",
      message: "Prescription request submitted successfully",
    }
  } catch (error) {
    console.error("Error submitting prescription request:", error)
    return {
      success: false,
      message: "Failed to submit prescription request",
      error: error instanceof Error ? error.message : String(error),
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
