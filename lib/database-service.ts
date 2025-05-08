// Database service using localStorage for persistence
// This is a simple implementation for demo purposes

// Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dob?: string
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

export interface ConsultRequest {
  id: string
  userId: string
  type: "consultation" | "medical-certificate" | "prescription"
  reason: string
  date: string
  time: string
  status: "pending" | "completed" | "cancelled"
  createdAt: string
  completedAt?: string
  cancelledAt?: string
  cancelReason?: string
  patientName: string
  email: string
  phone: string
  details: any
  notes?: string
}

// Add Doctor type
export interface Doctor {
  id: string
  email: string
  firstName: string
  lastName: string
  specialty: string
  phone?: string
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

// Database structure
interface Database {
  users: User[]
  consultRequests: ConsultRequest[]
  doctors: Doctor[]
}

// Initialize the database
export function initDatabase(): void {
  if (typeof window === "undefined") return

  try {
    const dbString = localStorage.getItem("healthcareDB")

    if (!dbString) {
      // Create a new database with sample data
      const newDB: Database = {
        users: [
          {
            id: "user1",
            email: "john.doe@example.com",
            firstName: "John",
            lastName: "Doe",
            phone: "0412345678",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "user2",
            email: "jane.smith@example.com",
            firstName: "Jane",
            lastName: "Smith",
            phone: "0423456789",
            dob: "1985-06-15",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ],
        consultRequests: [
          {
            id: "c1",
            userId: "user1",
            type: "consultation",
            reason: "Persistent cough and fever for the past 3 days. Experiencing fatigue and mild headache.",
            date: "2023-05-15",
            time: "10:00 AM",
            status: "pending",
            createdAt: new Date().toISOString(),
            patientName: "John Smith",
            email: "john.smith@example.com",
            phone: "0412 345 678",
            details: {
              firstName: "John",
              lastName: "Smith",
              email: "john.smith@example.com",
              phone: "0412 345 678",
              dob: "1980-01-15",
            },
          },
          {
            id: "c2",
            userId: "user2",
            type: "medical-certificate",
            reason: "Flu symptoms",
            date: "2023-05-18",
            time: "2:30 PM",
            status: "completed",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            completedAt: new Date(Date.now() - 86400000).toISOString(),
            patientName: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "0423456789",
            details: {
              firstName: "Jane",
              lastName: "Smith",
              email: "jane.smith@example.com",
              phone: "0423456789",
              startDate: "2023-05-18",
              endDate: "2023-05-25",
            },
          },
          {
            id: "c3",
            userId: "user1",
            type: "prescription",
            reason: "Prescription request: Antibiotics for bacterial infection",
            date: "2023-05-12",
            time: "11:15 AM",
            status: "pending",
            createdAt: new Date(Date.now() - 259200000).toISOString(),
            patientName: "John Smith",
            email: "john.smith@example.com",
            phone: "0412 345 678",
            details: {
              firstName: "John",
              lastName: "Smith",
              email: "john.smith@example.com",
              phone: "0412 345 678",
              dob: "1980-01-15",
              medication: "Amoxicillin 500mg",
              deliveryOption: "pharmacy",
            },
          },
          {
            id: "c4",
            userId: "user2",
            type: "consultation",
            reason: "Skin rash on arms and neck. Itchy and slightly painful. Started about a week ago.",
            date: "2023-05-14",
            time: "2:30 PM",
            status: "pending",
            createdAt: new Date(Date.now() - 345600000).toISOString(),
            patientName: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "0423456789",
            details: {
              firstName: "Jane",
              lastName: "Smith",
              email: "jane.smith@example.com",
              phone: "0423456789",
              dob: "1985-06-15",
            },
          },
          {
            id: "c5",
            userId: "user1",
            type: "medical-certificate",
            reason:
              "Lower back pain after exercise. Pain radiates down left leg. Difficulty standing for long periods.",
            date: "2023-05-10",
            time: "9:15 AM",
            status: "completed",
            createdAt: new Date(Date.now() - 432000000).toISOString(),
            completedAt: new Date(Date.now() - 345600000).toISOString(),
            patientName: "John Smith",
            email: "john.smith@example.com",
            phone: "0412 345 678",
            details: {
              firstName: "John",
              lastName: "Smith",
              email: "john.smith@example.com",
              phone: "0412 345 678",
              dob: "1980-01-15",
              startDate: "2023-05-10",
              endDate: "2023-05-17",
            },
          },
        ],
        doctors: [
          {
            id: "doc1",
            email: "dr.smith@example.com",
            firstName: "Robert",
            lastName: "Smith",
            specialty: "General Practice",
            phone: "0498765432",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "doc2",
            email: "dr.johnson@example.com",
            firstName: "Sarah",
            lastName: "Johnson",
            specialty: "Dermatology",
            phone: "0487654321",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ],
      }

      localStorage.setItem("healthcareDB", JSON.stringify(newDB))
    } else {
      // Check if we need to add doctors to an existing database
      const db = JSON.parse(dbString)
      if (!db.doctors) {
        db.doctors = [
          {
            id: "doc1",
            email: "dr.smith@example.com",
            firstName: "Robert",
            lastName: "Smith",
            specialty: "General Practice",
            phone: "0498765432",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "doc2",
            email: "dr.johnson@example.com",
            firstName: "Sarah",
            lastName: "Johnson",
            specialty: "Dermatology",
            phone: "0487654321",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ]
        localStorage.setItem("healthcareDB", JSON.stringify(db))
      }
    }
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// Get the database
function getDatabase(): Database {
  if (typeof window === "undefined") {
    return { users: [], consultRequests: [], doctors: [] }
  }

  try {
    const dbString = localStorage.getItem("healthcareDB")
    if (!dbString) {
      initDatabase()
      return getDatabase()
    }
    const db = JSON.parse(dbString)
    // Ensure doctors array exists
    if (!db.doctors) {
      db.doctors = []
    }
    return db
  } catch (error) {
    console.error("Error getting database:", error)
    return { users: [], consultRequests: [], doctors: [] }
  }
}

// Save the database
function saveDatabase(db: Database): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("healthcareDB", JSON.stringify(db))
  } catch (error) {
    console.error("Error saving database:", error)
  }
}

// User functions
export function getAllUsers(): User[] {
  const db = getDatabase()
  return db.users
}

export function getUserById(id: string): User | null {
  const db = getDatabase()
  return db.users.find((user) => user.id === id) || null
}

export function getUserByEmail(email: string): User | null {
  const db = getDatabase()
  return db.users.find((user) => user.email === email) || null
}

export function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): User {
  const db = getDatabase()

  // Check if user with this email already exists
  const existingUser = db.users.find((user) => user.email === userData.email)
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  const newUser: User = {
    ...userData,
    id: `user${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }

  db.users.push(newUser)
  saveDatabase(db)

  return newUser
}

export function updateUser(id: string, userData: Partial<User>): User | null {
  const db = getDatabase()
  const userIndex = db.users.findIndex((user) => user.id === id)

  if (userIndex === -1) return null

  // Update the user
  const updatedUser = {
    ...db.users[userIndex],
    ...userData,
    updatedAt: new Date().toISOString(),
  }

  db.users[userIndex] = updatedUser
  saveDatabase(db)

  return updatedUser
}

export function updateUserLoginTime(id: string): User | null {
  const db = getDatabase()
  const userIndex = db.users.findIndex((user) => user.id === id)

  if (userIndex === -1) return null

  // Update the user's last login time
  const updatedUser = {
    ...db.users[userIndex],
    lastLogin: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  db.users[userIndex] = updatedUser
  saveDatabase(db)

  return updatedUser
}

export function deleteUser(id: string): boolean {
  const db = getDatabase()
  const initialLength = db.users.length

  // Remove the user
  db.users = db.users.filter((user) => user.id !== id)

  // Also remove their consult requests
  db.consultRequests = db.consultRequests.filter((req) => req.userId !== id)

  saveDatabase(db)

  return db.users.length < initialLength
}

// Consult request functions
export function getAllConsultRequests(): ConsultRequest[] {
  const db = getDatabase()
  return db.consultRequests
}

export function getConsultRequestById(id: string): ConsultRequest | null {
  const db = getDatabase()
  return db.consultRequests.find((req) => req.id === id) || null
}

export function getConsultRequestsByUserId(userId: string): ConsultRequest[] {
  const db = getDatabase()
  return db.consultRequests.filter((req) => req.userId === userId)
}

export function getConsultRequestsByEmail(email: string): ConsultRequest[] {
  const db = getDatabase()
  return db.consultRequests.filter((req) => req.email === email)
}

export function createConsultRequest(requestData: Omit<ConsultRequest, "id" | "createdAt">): ConsultRequest {
  const db = getDatabase()

  const newRequest: ConsultRequest = {
    ...requestData,
    id: `c${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  db.consultRequests.push(newRequest)
  saveDatabase(db)

  // Also update the consultations localStorage for compatibility
  updateConsultationsLocalStorage(db.consultRequests)

  return newRequest
}

export function updateConsultRequest(id: string, requestData: Partial<ConsultRequest>): ConsultRequest | null {
  const db = getDatabase()
  const requestIndex = db.consultRequests.findIndex((req) => req.id === id)

  if (requestIndex === -1) return null

  // Update the request
  const updatedRequest = {
    ...db.consultRequests[requestIndex],
    ...requestData,
  }

  db.consultRequests[requestIndex] = updatedRequest
  saveDatabase(db)

  // Also update the consultations localStorage for compatibility
  updateConsultationsLocalStorage(db.consultRequests)

  return updatedRequest
}

export function markConsultRequestAsCompleted(id: string): ConsultRequest | null {
  const db = getDatabase()
  const requestIndex = db.consultRequests.findIndex((req) => req.id === id)

  if (requestIndex === -1) return null

  // Mark as completed
  const updatedRequest = {
    ...db.consultRequests[requestIndex],
    status: "completed",
    completedAt: new Date().toISOString(),
  }

  db.consultRequests[requestIndex] = updatedRequest
  saveDatabase(db)

  // Also update the consultations localStorage for compatibility
  updateConsultationsLocalStorage(db.consultRequests)

  return updatedRequest
}

export function cancelConsultRequest(id: string, reason?: string): ConsultRequest | null {
  const db = getDatabase()
  const requestIndex = db.consultRequests.findIndex((req) => req.id === id)

  if (requestIndex === -1) return null

  // Mark as cancelled
  const updatedRequest = {
    ...db.consultRequests[requestIndex],
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
    cancelReason: reason || "Cancelled by user",
  }

  db.consultRequests[requestIndex] = updatedRequest
  saveDatabase(db)

  // Also update the consultations localStorage for compatibility
  updateConsultationsLocalStorage(db.consultRequests)

  return updatedRequest
}

export function deleteConsultRequest(id: string): boolean {
  const db = getDatabase()
  const initialLength = db.consultRequests.length

  db.consultRequests = db.consultRequests.filter((req) => req.id !== id)
  saveDatabase(db)

  // Also update the consultations localStorage for compatibility
  updateConsultationsLocalStorage(db.consultRequests)

  return db.consultRequests.length < initialLength
}

// Doctor functions
export function getAllDoctors(): Doctor[] {
  const db = getDatabase()
  return db.doctors || []
}

export function getDoctorById(id: string): Doctor | null {
  const db = getDatabase()
  return (db.doctors || []).find((doctor) => doctor.id === id) || null
}

export function getDoctorByEmail(email: string): Doctor | null {
  const db = getDatabase()
  return (db.doctors || []).find((doctor) => doctor.email === email) || null
}

export function createDoctor(doctorData: Omit<Doctor, "id" | "createdAt" | "updatedAt">): Doctor {
  const db = getDatabase()

  // Check if doctor with this email already exists
  const existingDoctor = (db.doctors || []).find((doctor) => doctor.email === doctorData.email)
  if (existingDoctor) {
    throw new Error("Doctor with this email already exists")
  }

  // Initialize doctors array if it doesn't exist
  if (!db.doctors) {
    db.doctors = []
  }

  const newDoctor: Doctor = {
    ...doctorData,
    id: `doc${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }

  db.doctors.push(newDoctor)
  saveDatabase(db)

  return newDoctor
}

export function updateDoctor(id: string, doctorData: Partial<Doctor>): Doctor | null {
  const db = getDatabase()

  if (!db.doctors) {
    db.doctors = []
    return null
  }

  const doctorIndex = db.doctors.findIndex((doctor) => doctor.id === id)

  if (doctorIndex === -1) return null

  // Update the doctor
  const updatedDoctor = {
    ...db.doctors[doctorIndex],
    ...doctorData,
    updatedAt: new Date().toISOString(),
  }

  db.doctors[doctorIndex] = updatedDoctor
  saveDatabase(db)

  return updatedDoctor
}

export function updateDoctorLoginTime(id: string): Doctor | null {
  const db = getDatabase()

  if (!db.doctors) {
    db.doctors = []
    return null
  }

  const doctorIndex = db.doctors.findIndex((doctor) => doctor.id === id)

  if (doctorIndex === -1) return null

  // Update the doctor's last login time
  const updatedDoctor = {
    ...db.doctors[doctorIndex],
    lastLogin: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  db.doctors[doctorIndex] = updatedDoctor
  saveDatabase(db)

  return updatedDoctor
}

export function deleteDoctor(id: string): boolean {
  const db = getDatabase()

  if (!db.doctors) {
    db.doctors = []
    return false
  }

  const initialLength = db.doctors.length

  // Remove the doctor
  db.doctors = db.doctors.filter((doctor) => doctor.id !== id)

  saveDatabase(db)

  return db.doctors.length < initialLength
}

// Helper function to update the consultations localStorage for compatibility with doctor dashboard
function updateConsultationsLocalStorage(consultRequests: ConsultRequest[]): void {
  if (typeof window === "undefined") return

  try {
    // Convert ConsultRequest to the format expected by the doctor dashboard
    const consultations = consultRequests.map((req) => ({
      id: req.id,
      patientName: req.patientName,
      email: req.email,
      phone: req.phone,
      date: req.date,
      time: req.time,
      reason: req.reason,
      status: req.status,
      type: req.type,
      createdAt: req.createdAt,
      completedAt: req.completedAt,
      cancelledAt: req.cancelledAt,
      details: req.details,
      notes: req.notes,
    }))

    localStorage.setItem("consultations", JSON.stringify(consultations))
  } catch (error) {
    console.error("Error updating consultations localStorage:", error)
  }
}

// Initialize the database when this module is imported
if (typeof window !== "undefined") {
  initDatabase()

  // Also ensure the consultations localStorage is in sync
  const db = getDatabase()
  updateConsultationsLocalStorage(db.consultRequests)
}
