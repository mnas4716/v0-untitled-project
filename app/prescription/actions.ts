"use server"

export async function requestPrescription(formData: FormData) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, you would process the form data here
  // For example, save to database, send emails, etc.

  return { success: true }
}
