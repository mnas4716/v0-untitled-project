"use server"

import { createClient } from "@/utils/supabase/server"
const supabase = createClient()

export interface RequestPrescription {
  firstName: string
  lastName: string
  email: string
  phone: string
  dob: string
  address: string
  suburb: string
  state: string
  postcode: string
  medicareNumber: string
  medicationName: string
  medicationDosage: string
  medicationFrequency: string
  medicationDuration: string
  previousPrescription: boolean
  additionalInformation: string
  practitionerId: string
}

export async function savePrescriptionRequest(data: RequestPrescription) {
  try {
    const { data: insertedData, error } = await supabase
      .from("prescription_requests")
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
          address: data.address,
          suburb: data.suburb,
          state: data.state,
          postcode: data.postcode,
          medicare_number: data.medicareNumber,
          medication_name: data.medicationName,
          medication_dosage: data.medicationDosage,
          medication_frequency: data.medicationFrequency,
          medication_duration: data.medicationDuration,
          previous_prescription: data.previousPrescription,
          additional_information: data.additionalInformation,
          practitioner_id: data.practitionerId,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data: insertedData }
  } catch (error) {
    console.error("Error saving prescription request:", error)
    return { success: false, error: "Failed to save prescription request" }
  }
}

export async function requestPrescription(formData: FormData) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, you would process the form data here
  // For example, save to database, send emails, etc.

  return { success: true }
}
