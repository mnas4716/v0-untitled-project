// lib/user-service.ts

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password?: string // In a real app, this would be hashed
  phone?: string
  dob?: string
  createdAt: Date
  updatedAt: Date
  role?: string
}

interface Consultation {
  id: string
  userId: string
  type: string
  reason: string
  status: string
  attachments: { name: string; type: string; size: string }[]
  doctorNotes?: string
  completedAt?: Date
}

// In-memory database
const users: User[] = []
const consultations: Consultation[] = []

// Helper function to generate a random string
function generateRandomString(length: number): string {
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// Helper function to generate a random number
function generateRandomNumber(length: number): string {
  let result = ""
  const characters = "0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export async function generateAndSendOTP(email: string) {
  // Check if user already exists
  let user = users.find((user) => user.email === email)

  if (!user) {
    // Create a new user
    user = {
      id: generateRandomString(15),
      firstName: "User",
      lastName: "",
      email: email,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
    }
    users.push(user)
  }

  const otp = generateRandomNumber(6)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // Expires in 15 minutes

  // In a real app, you would send the OTP via email or SMS here
  console.log(`Generated OTP ${otp} for ${email}, expires at ${expiresAt}`)

  return {
    success: true,
    user,
    otp,
    expiresAt: expiresAt.toISOString(),
  }
}

export async function generateAndSendAdminOTP(email: string) {
  const otp = generateRandomNumber(6)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // Expires in 15 minutes

  // In a real app, you would send the OTP via email or SMS here
  console.log(`Generated Admin OTP ${otp} for ${email}, expires at ${expiresAt}`)

  return {
    success: true,
    otp,
    expiresAt: expiresAt.toISOString(),
  }
}

export async function verifyOTP(email: string, otp: string) {
  const user = users.find((user) => user.email === email)

  if (!user) {
    return {
      success: false,
      message: "Invalid email or OTP",
    }
  }

  // In a real app, you would check the OTP against a stored value and expiration
  console.log(`Verifying OTP ${otp} for ${email}`)

  return {
    success: true,
    user,
  }
}

export async function verifyAdminOTP(email: string, otp: string) {
  // This is a simple in-memory admin user for demo purposes
  // In a real application, you would use a database
  const adminUser = {
    email: "moe.nasr@hotmail.com",
  }

  if (email !== adminUser.email) {
    return {
      success: false,
      message: "Invalid email or OTP",
    }
  }

  // In a real app, you would check the OTP against a stored value and expiration
  console.log(`Verifying Admin OTP ${otp} for ${email}`)

  return {
    success: true,
  }
}

export async function findUserByEmail(email: string) {
  return users.find((user) => user.email === email) || null
}

export async function updateUser(id: string, userData: Partial<User>) {
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return null
  }

  // Update user
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date(),
  }

  return users[userIndex]
}

export async function getAllUsers() {
  return [...users]
}

export async function createConsultation(consultationData: Omit<Consultation, "id" | "doctorNotes" | "completedAt">) {
  const newConsultation: Consultation = {
    id: generateRandomString(15),
    ...consultationData,
    doctorNotes: "",
    completedAt: undefined,
  }

  consultations.push(newConsultation)
  return newConsultation
}

export async function completeConsultation(consultationId: string, doctorNotes?: string) {
  const consultationIndex = consultations.findIndex((consultation) => consultation.id === consultationId)

  if (consultationIndex === -1) {
    return {
      success: false,
      message: "Consultation not found",
    }
  }

  consultations[consultationIndex] = {
    ...consultations[consultationIndex],
    status: "completed",
    doctorNotes: doctorNotes || "",
    completedAt: new Date(),
  }

  return {
    success: true,
    message: "Consultation marked as completed",
  }
}

export async function getAllConsultations() {
  return [...consultations]
}

export async function getUserConsultations(userId: string) {
  return consultations.filter((consultation) => consultation.userId === userId)
}
