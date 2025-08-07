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
medicareNumber?: string
address?: string
suburb?: string
state?: string
postcode?: string
createdAt: string
updatedAt: string
lastLogin?: string
role?: string
isActive: boolean
}

export interface FileAttachment {
id: string
fileName: string
fileType: string
fileSize: number
content: string // base64 encoded content
uploadedAt: string
}

export interface ConsultRequest {
id: string
userId: string
userEmail: string
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
doctorNotes?: string
assignedDoctorId?: string
attachments?: FileAttachment[] // New field for file attachments
}

// Add Doctor type
export interface Doctor {
id: string
email: string
firstName: string
lastName: string
specialty: string
providerNumber?: string // Added provider number
registrationNumber?: string // Added registration number
phone?: string
passwordHash: string
password?: string // For direct password comparison in demo
status: "active" | "inactive" | "on leave"
createdAt: string
updatedAt: string
lastLogin?: string
isActive: boolean
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
          medicareNumber: "2345678901",
          address: "123 Main St",
          suburb: "Sydney",
          state: "NSW",
          postcode: "2000",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          role: "user",
          isActive: true,
        },
        {
          id: "user2",
          email: "jane.smith@example.com",
          firstName: "Jane",
          lastName: "Smith",
          phone: "0423456789",
          dob: "1985-06-15",
          medicareNumber: "3456789012",
          address: "456 Park Ave",
          suburb: "Melbourne",
          state: "VIC",
          postcode: "3000",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          role: "user",
          isActive: true,
        },
      ],
      consultRequests: [
        {
          id: "c1",
          userId: "user1",
          userEmail: "john.doe@example.com",
          type: "consultation",
          reason: "Persistent cough and fever for the past 3 days. Experiencing fatigue and mild headache.",
          date: "2023-05-15",
          time: "10:00 AM",
          status: "pending",
          createdAt: new Date().toISOString(),
          patientName: "John Smith",
          email: "john.doe@example.com",
          phone: "0412 345 678",
          assignedDoctorId: "doc1",
          details: {
            firstName: "John",
            lastName: "Smith",
            email: "john.doe@example.com",
            phone: "0412 345 678",
            dob: "1980-01-15",
            medicareNumber: "2345678901",
            address: "123 Main St",
            suburb: "Sydney",
            state: "NSW",
            postcode: "2000",
          },
          attachments: [
            {
              id: "file1",
              fileName: "medical-history.pdf",
              fileType: "application/pdf",
              fileSize: 245000,
              content: "", // Empty for demo
              uploadedAt: new Date().toISOString(),
            },
          ],
        },
        {
          id: "c2",
          userId: "user2",
          userEmail: "jane.smith@example.com",
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
            medicareNumber: "3456789012",
            address: "456 Park Ave",
            suburb: "Melbourne",
            state: "VIC",
            postcode: "3000",
          },
          doctorNotes: JSON.stringify([
            {
              text: "Patient has recovered well from flu. No complications observed.",
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              doctorId: "doc1",
              doctorName: "Dr. Robert Smith",
            },
          ]),
          assignedDoctorId: "doc1",
        },
      ],
      doctors: [
        {
          id: "doc1",
          email: "doc1@freedoc.com.au",
          firstName: "Robert",
          lastName: "Smith",
          specialty: "General Practice",
          providerNumber: "1234567A",
          registrationNumber: "MED0001234567",
          phone: "0498765432",
          passwordHash: "$2b$10$XpC5nKJ5.NI8biIooM8TW.ZQCFrS0sILzLfbIb6KP.JQ/J9QvW7.G", // "test123"
          password: "test123", // For demo purposes
          status: "active",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: "doc2",
          email: "dr.johnson@example.com",
          firstName: "Sarah",
          lastName: "Johnson",
          specialty: "Dermatology",
          providerNumber: "7654321B",
          registrationNumber: "MED0002345678",
          phone: "0487654321",
          passwordHash: "$2b$10$XpC5nKJ5.NI8biIooM8TW.ZQCFrS0sILzLfbIb6KP.JQ/J9QvW7.G", // "test123"
          password: "test123", // For demo purposes
          status: "active",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          isActive: true,
        },
        {
          id: "doc3",
          email: "dr.williams@example.com",
          firstName: "Ben",
          lastName: "Williams",
          specialty: "Cardiology",
          providerNumber: "8765432C",
          registrationNumber: "MED0003456789",
          phone: "0411223344",
          passwordHash: "$2b$10$XpC5nKJ5.NI8biIooM8TW.ZQCFrS0sILzLfbIb6KP.JQ/J9QvW7.G", // "test123"
          password: "test123", // For demo purposes
          status: "on leave",
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString(),
          isActive: false,
        },
      ],
    }

    localStorage.setItem("healthcareDB", JSON.stringify(newDB))
  } else {
    // Migration logic can be added here if needed for existing users
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
return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
}

export function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt" | "isActive">): User {
const db = getDatabase()

// Check if user with this email already exists
const existingUser = db.users.find((user) => user.email.toLowerCase() === userData.email.toLowerCase())
if (existingUser) {
  return existingUser
}

const newUser: User = {
  ...userData,
  id: `user${Date.now()}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  isActive: true,
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

export function toggleUserActive(id: string): User | null {
const db = getDatabase()
const userIndex = db.users.findIndex((user) => user.id === id)

if (userIndex === -1) return null

// Toggle the user's active status
const updatedUser = {
  ...db.users[userIndex],
  isActive: !db.users[userIndex].isActive,
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
return db.consultRequests.filter((req) => req.email.toLowerCase() === email.toLowerCase())
}

export function getConsultRequestsByDoctorId(doctorId: string): ConsultRequest[] {
const db = getDatabase()
return db.consultRequests.filter((req) => req.assignedDoctorId === doctorId)
}

export function createConsultRequest(
requestData: Omit<ConsultRequest, "id" | "createdAt" | "userEmail">,
): ConsultRequest {
const db = getDatabase()

const newRequest: ConsultRequest = {
  ...requestData,
  id: `c${Date.now()}`,
  createdAt: new Date().toISOString(),
  userEmail: requestData.email,
  attachments: requestData.attachments || [],
}

db.consultRequests.push(newRequest)
saveDatabase(db)

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

return updatedRequest
}

export function addFileAttachmentToConsult(consultId: string, file: File): Promise<ConsultRequest | null> {
return new Promise((resolve, reject) => {
  try {
    const db = getDatabase()
    const requestIndex = db.consultRequests.findIndex((req) => req.id === consultId)

    if (requestIndex === -1) {
      resolve(null)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const base64Content = reader.result as string
        const fileAttachment: FileAttachment = {
          id: `file${Date.now()}`,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          content: base64Content.split(",")[1],
          uploadedAt: new Date().toISOString(),
        }

        if (!db.consultRequests[requestIndex].attachments) {
          db.consultRequests[requestIndex].attachments = []
        }

        db.consultRequests[requestIndex].attachments!.push(fileAttachment)
        saveDatabase(db)
        resolve(db.consultRequests[requestIndex])
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error("Error reading file"))
    reader.readAsDataURL(file)
  } catch (error) {
    reject(error)
  }
})
}

export function markConsultRequestAsCompleted(id: string): ConsultRequest | null {
const db = getDatabase()
const requestIndex = db.consultRequests.findIndex((req) => req.id === id)

if (requestIndex === -1) return null

const updatedRequest = {
  ...db.consultRequests[requestIndex],
  status: "completed" as const,
  completedAt: new Date().toISOString(),
}

db.consultRequests[requestIndex] = updatedRequest
saveDatabase(db)
return updatedRequest
}

export function cancelConsultRequest(id: string, reason?: string): ConsultRequest | null {
const db = getDatabase()
const requestIndex = db.consultRequests.findIndex((req) => req.id === id)

if (requestIndex === -1) return null

// Mark as cancelled
const updatedRequest = {
  ...db.consultRequests[requestIndex],
  status: "cancelled" as const,
  cancelledAt: new Date().toISOString(),
  cancelReason: reason || "Cancelled by user",
}

db.consultRequests[requestIndex] = updatedRequest
saveDatabase(db)

return updatedRequest
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
return (db.doctors || []).find((doctor) => doctor.email.toLowerCase() === email.toLowerCase()) || null
}

export function authenticateDoctor(email: string, password: string): Doctor | null {
const db = getDatabase()
const doctor = (db.doctors || []).find((doc) => doc.email.toLowerCase() === email.toLowerCase())

if (doctor && doctor.isActive && doctor.password === password) {
  updateDoctorLoginTime(doctor.id)
  return doctor
}
return null
}

export function createDoctor(
doctorData: Omit<Doctor, "id" | "createdAt" | "updatedAt" | "passwordHash" | "isActive"> & { password?: string },
): Doctor {
const db = getDatabase()

// Check if doctor with this email already exists
const existingDoctor = (db.doctors || []).find((doctor) => doctor.email.toLowerCase() === doctorData.email.toLowerCase())
if (existingDoctor) {
  throw new Error("Doctor with this email already exists")
}

// Initialize doctors array if it doesn't exist
if (!db.doctors) {
  db.doctors = []
}

// In a real app, we would hash the password here
// For demo purposes, we'll store the plain password too
const newDoctor: Doctor = {
  ...doctorData,
  id: `doc${Date.now()}`,
  passwordHash: "$2b$10$XpC5nKJ5.NI8biIooM8TW.ZQCFrS0sILzLfbIb6KP.JQ/J9QvW7.G", // Placeholder hash
  password: doctorData.password || "test123", // Store plain password for demo
  status: doctorData.status || "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  isActive: doctorData.status === "active",
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

// If status is updated, also update isActive
if (doctorData.status) {
  updatedDoctor.isActive = doctorData.status === "active"
}

db.doctors[doctorIndex] = updatedDoctor
saveDatabase(db)

return updatedDoctor
}

export function toggleDoctorActive(id: string): Doctor | null {
const db = getDatabase()

if (!db.doctors) {
  db.doctors = []
  return null
}

const doctorIndex = db.doctors.findIndex((doctor) => doctor.id === id)

if (doctorIndex === -1) return null

// Toggle the doctor's active status
const updatedDoctor = {
  ...db.doctors[doctorIndex],
  isActive: !db.doctors[doctorIndex].isActive,
  status: db.doctors[doctorIndex].isActive ? "inactive" : "active",
  updatedAt: new Date().toISOString(),
}

db.doctors[doctorIndex] = updatedDoctor
saveDatabase(db)

return updatedDoctor
}

export function updateDoctorPassword(
id: string,
currentPassword: string,
newPassword: string,
): { success: boolean; message: string } {
const db = getDatabase()

if (!db.doctors) {
  db.doctors = []
  return { success: false, message: "Doctor not found" }
}

const doctorIndex = db.doctors.findIndex((doctor) => doctor.id === id)

if (doctorIndex === -1) {
  return { success: false, message: "Doctor not found" }
}

// In a real app, we would use bcrypt to compare the password hash
// For demo purposes, we'll just check if the current password matches
if (db.doctors[doctorIndex].password !== currentPassword) {
  return { success: false, message: "Current password is incorrect" }
}

// In a real app, we would hash the new password here
// For demo purposes, we'll store the plain password too
db.doctors[doctorIndex] = {
  ...db.doctors[doctorIndex],
  passwordHash: "$2b$10$XpC5nKJ5.NI8biIooM8TW.ZQCFrS0sILzLfbIb6KP.JQ/J9QvW7.G", // Placeholder hash
  password: newPassword, // Store plain password for demo
  updatedAt: new Date().toISOString(),
}

saveDatabase(db)

return { success: true, message: "Password updated successfully" }
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

export function assignDoctorToConsult(consultId: string, doctorId: string): ConsultRequest | null {
const db = getDatabase()
const requestIndex = db.consultRequests.findIndex((req) => req.id === consultId)

if (requestIndex === -1) return null

// Update the request
const updatedRequest = {
  ...db.consultRequests[requestIndex],
  assignedDoctorId: doctorId,
}

db.consultRequests[requestIndex] = updatedRequest
saveDatabase(db)

return updatedRequest
}

// Initialize the database when this module is imported
if (typeof window !== "undefined") {
initDatabase()
}
