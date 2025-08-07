"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import {
  createUser,
  getUserByEmail,
  updateUser,
  createConsultRequest,
  getAllDoctors,
  addFileAttachmentToConsult,
} from "@/lib/database-service"

// Schema for prescription form
const prescriptionSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  dob: z.string(),
  medicareNumber: z.string().optional(),
  address: z.string().min(5),
  suburb: z.string().min(2),
  state: z.string().min(2),
  postcode: z.string().min(4),
  medication: z.string().min(2),
  deliveryOption: z.string(),
})

// Helper function to get a random active doctor
function getRandomActiveDoctor() {
  const doctors = getAllDoctors().filter((doctor) => doctor.isActive)
  if (doctors.length === 0) return null

  const randomIndex = Math.floor(Math.random() * doctors.length)
  return doctors[randomIndex]
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
    const medicareNumber = formData.get("medicareNumber") as string
    const address = formData.get("address") as string
    const suburb = formData.get("suburb") as string
    const state = formData.get("state") as string
    const postcode = formData.get("postcode") as string
    const medication = formData.get("medication") as string
    const deliveryOption = formData.get("deliveryOption") as string
    const fileCount = Number.parseInt(formData.get("fileCount") as string) || 0

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !dob || !medication || !address) {
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
        medicareNumber,
        address,
        suburb,
        state,
        postcode,
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
        medicareNumber,
        address,
        suburb,
        state,
        postcode,
      })
    }

    // Get current date and time for the appointment
    const today = new Date()
    const date = today.toISOString().split("T")[0]
    const time = `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}`

    // Get a random active doctor to assign the consultation to
    const randomDoctor = getRandomActiveDoctor()
    const assignedDoctorId = randomDoctor ? randomDoctor.id : undefined

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
      assignedDoctorId,
      details: {
        firstName,
        lastName,
        email,
        phone,
        dob,
        medicareNumber,
        address,
        suburb,
        state,
        postcode,
        medication,
        deliveryOption,
        files: fileCount > 0 ? true : false,
      },
      attachments: [],
    })

    // Process file uploads if any
    if (fileCount > 0) {
      const filePromises = []
      for (let i = 0; i < fileCount; i++) {
        const file = formData.get(`file-${i}`) as File
        if (file) {
          filePromises.push(addFileAttachmentToConsult(consultRequest.id, file))
        }
      }

      // Wait for all file uploads to complete
      if (filePromises.length > 0) {
        await Promise.all(filePromises)
      }
    }

    // Redirect to confirmation page
    redirect("/prescription/confirmation")
  } catch (error) {
    console.error("Error submitting prescription request:", error)
    return {
      success: false,
      message: "Failed to submit prescription request",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
