"use server"

import { createClient } from "@/utils/supabase/server"
const supabase = createClient()

export interface RequestMedicalCertificate {
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
  reason: string
  startDate: string
  endDate: string
  additionalInformation: string
  practitionerId: string
}

export async function saveMedicalCertificateRequest(data: RequestMedicalCertificate) {
  try {
    const { data: insertedData, error } = await supabase
      .from("medical_certificate_requests")
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
          reason: data.reason,
          start_date: data.startDate,
          end_date: data.endDate,
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
    console.error("Error saving medical certificate request:", error)
    return { success: false, error: "Failed to save medical certificate request" }
  }
}

export async function requestMedicalCertificate(formData: FormData) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, you would process the form data here
  // For example, save to database, send emails, etc.

  return { success: true }
}
