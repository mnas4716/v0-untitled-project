import { getUserByEmail, getConsultRequestsByEmail, createUser, updateUser, updateUserLoginTime } from "./database-service"
import { setUserInStorage } from "./client-auth"

// Unified function to get or create user from database and set in localStorage
export async function authenticateUser(email: string): Promise<{
  success: boolean
  user: any | null
  message?: string
}> {
  try {
    if (typeof window === "undefined") {
      return { success: false, message: "Authentication must be done on the client." }
    }

    // Check if user has any consultation requests
    const consultRequests = await getConsultRequestsByEmail(email)
    if (!consultRequests || consultRequests.length === 0) {
      return {
        success: false,
        user: null,
        message: "This email is not registered. Please submit a consultation request first.",
      }
    }

    // Check if user exists and is active
    let user = await getUserByEmail(email)

    if (user && !user.isActive) {
      return {
        success: false,
        user: null,
        message: "This account has been deactivated. Please contact support.",
      }
    }

    // If user doesn't exist, create one from consultation data
    if (!user) {
      // Extract user data from the most recent consultation request
      const latestRequest = consultRequests.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]

      // Create user object with data from consultation
      const userData = {
        email: email,
        firstName: latestRequest.details?.firstName || latestRequest.patientName?.split(" ")[0] || "",
        lastName: latestRequest.details?.lastName || latestRequest.patientName?.split(" ")[1] || "",
        phone: latestRequest.details?.phone || latestRequest.phone || "",
        dob: latestRequest.details?.dob || "",
        role: "user",
        isActive: true, // Assuming new users are active by default
      }

      // Create user in database
      user = await createUser(userData)
    } else {
      // Update user with any new information from recent consultations
      const latestRequest = consultRequests.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]

      // Only update fields that are empty in the user record
      const updateData: any = {}

      if (!user.firstName && (latestRequest.details?.firstName || latestRequest.patientName?.split(" ")[0])) {
        updateData.firstName = latestRequest.details?.firstName || latestRequest.patientName?.split(" ")[0]
      }

      if (!user.lastName && (latestRequest.details?.lastName || latestRequest.patientName?.split(" ")[1])) {
        updateData.lastName = latestRequest.details?.lastName || latestRequest.patientName?.split(" ")[1]
      }

      if (!user.phone && (latestRequest.details?.phone || latestRequest.phone)) {
        updateData.phone = latestRequest.details?.phone || latestRequest.phone
      }

      if (!user.dob && latestRequest.details?.dob) {
        updateData.dob = latestRequest.details?.dob
      }

      // Only update if there are changes
      if (Object.keys(updateData).length > 0) {
        user = await updateUser(user.id, updateData) || user
      }
    }

    // Update last login time
    await updateUserLoginTime(user.id)

    // Store user data in localStorage
    setUserInStorage(user)

    return {
      success: true,
      user,
    }
  } catch (error) {
    console.error("Error authenticating user:", error)
    return {
      success: false,
      user: null,
      message: "An error occurred during authentication. Please try again.",
    }
  }
}
