import { sql } from "./db"

// Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dob?: string
  role?: string
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

export interface ConsultRequest {
  id: string
  userId: string
  doctorId?: string
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
}

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

// Mock database for demo purposes
const users = [
  {
    id: "user_id",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    dob: "1990-01-01",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: "admin_id",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    phone: "123-456-7890",
    dob: "1985-01-01",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: "doctor_id",
    email: "doctor@example.com",
    firstName: "Doctor",
    lastName: "Smith",
    phone: "123-456-7890",
    dob: "1980-01-01",
    role: "doctor",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
]

const consultRequests = [
  {
    id: "req1",
    userId: "user_id",
    type: "consultation",
    status: "pending",
    reason: "Persistent cough and fever",
    date: "2023-05-15",
    time: "10:00 AM",
    patientName: "John Doe",
    email: "user@example.com",
    phone: "123-456-7890",
    createdAt: new Date().toISOString(),
    details: {
      firstName: "John",
      lastName: "Doe",
      email: "user@example.com",
      phone: "123-456-7890",
      dob: "1990-01-01",
    },
    doctorNotes: "Patient has a history of respiratory issues.",
  },
  {
    id: "req2",
    userId: "user_id",
    type: "medical-certificate",
    status: "completed",
    reason: "Sick leave",
    date: "2023-05-14",
    time: "2:30 PM",
    patientName: "John Doe",
    email: "user@example.com",
    phone: "123-456-7890",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    completedAt: new Date(Date.now() - 172800000).toISOString(),
    details: {
      firstName: "John",
      lastName: "Doe",
      email: "user@example.com",
      phone: "123-456-7890",
      dob: "1990-01-01",
      startDate: "2023-05-14",
      endDate: "2023-05-17",
    },
    doctorNotes: "Patient is recovering from flu.",
  },
]

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
export async function getAllUsers(): Promise<User[]> {
  const users = await sql`
    SELECT 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      phone, 
      dob, 
      role,
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
    FROM users
    ORDER BY created_at DESC
  `

  return users
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await sql`
    SELECT 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      phone, 
      dob, 
      role,
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
    FROM users
    WHERE id = ${id}
  `

  return users.length > 0 ? users[0] : null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await sql`
    SELECT 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      phone, 
      dob, 
      role,
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
    FROM users
    WHERE email = ${email}
  `

  return users.length > 0 ? users[0] : null
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
  const { email, firstName, lastName, phone, dob, role = "user" } = userData

  const users = await sql`
    INSERT INTO users (
      email, 
      first_name, 
      last_name, 
      phone, 
      dob, 
      role
    ) 
    VALUES (
      ${email}, 
      ${firstName}, 
      ${lastName}, 
      ${phone || null}, 
      ${dob ? new Date(dob) : null}, 
      ${role}
    )
    RETURNING 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      phone, 
      dob, 
      role,
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
  `

  return users[0]
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  const { email, firstName, lastName, phone, dob, role } = userData

  // Build the SET clause dynamically based on provided fields
  const setClauses = []
  const params = []

  if (email !== undefined) {
    setClauses.push("email = $1")
    params.push(email)
  }

  if (firstName !== undefined) {
    setClauses.push("first_name = $" + (params.length + 1))
    params.push(firstName)
  }

  if (lastName !== undefined) {
    setClauses.push("last_name = $" + (params.length + 1))
    params.push(lastName)
  }

  if (phone !== undefined) {
    setClauses.push("phone = $" + (params.length + 1))
    params.push(phone)
  }

  if (dob !== undefined) {
    setClauses.push("dob = $" + (params.length + 1))
    params.push(dob ? new Date(dob) : null)
  }

  if (role !== undefined) {
    setClauses.push("role = $" + (params.length + 1))
    params.push(role)
  }

  // Always update the updated_at timestamp
  setClauses.push("updated_at = CURRENT_TIMESTAMP")

  if (setClauses.length === 0) {
    return getUserById(id)
  }

  // Add the id parameter
  params.push(id)

  const query = `
    UPDATE users 
    SET ${setClauses.join(", ")} 
    WHERE id = $${params.length}
    RETURNING 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      phone, 
      dob, 
      role,
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
  `

  const users = await sql.unsafe(query, ...params)

  return users.length > 0 ? users[0] : null
}

export async function updateUserLoginTime(id: string): Promise<User | null> {
  const users = await sql`
    UPDATE users 
    SET 
      last_login = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      phone, 
      dob, 
      role,
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
  `

  return users.length > 0 ? users[0] : null
}

export async function deleteUser(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM users
    WHERE id = ${id}
  `

  return result.count > 0
}

// Consult request functions
export async function getAllConsultRequests(): Promise<ConsultRequest[]> {
  const requests = await sql`
    SELECT 
      mr.id, 
      mr.user_id as "userId",
      mr.doctor_id as "doctorId",
      mr.type,
      mr.status,
      mr.reason,
      mr.date,
      mr.time,
      mr.patient_name as "patientName",
      mr.email,
      mr.phone,
      mr.doctor_notes as "doctorNotes",
      mr.created_at as "createdAt",
      mr.completed_at as "completedAt",
      mr.cancelled_at as "cancelledAt",
      mr.cancel_reason as "cancelReason",
      
      -- Consultation details
      cd.symptoms,
      cd.duration,
      cd.has_files as "hasFiles",
      
      -- Certificate details
      cert.start_date as "startDate",
      cert.end_date as "endDate",
      cert.condition,
      cert.has_files as "certHasFiles",
      
      -- Prescription details
      pd.medication,
      pd.dosage,
      pd.delivery_option as "deliveryOption",
      pd.has_files as "prescHasFiles"
      
    FROM medical_requests mr
    LEFT JOIN consultation_details cd ON mr.id = cd.request_id
    LEFT JOIN certificate_details cert ON mr.id = cert.request_id
    LEFT JOIN prescription_details pd ON mr.id = pd.request_id
    ORDER BY mr.created_at DESC
  `

  // Transform the results to match the expected format
  return requests.map((req) => {
    // Construct the details object based on the request type
    let details: any = {}

    if (req.type === "consultation") {
      details = {
        symptoms: req.symptoms,
        duration: req.duration,
        hasFiles: req.hasFiles,
      }
    } else if (req.type === "medical-certificate") {
      details = {
        startDate: req.startDate,
        endDate: req.endDate,
        condition: req.condition,
        hasFiles: req.certHasFiles,
      }
    } else if (req.type === "prescription") {
      details = {
        medication: req.medication,
        dosage: req.dosage,
        deliveryOption: req.deliveryOption,
        hasFiles: req.prescHasFiles,
      }
    }

    return {
      id: req.id,
      userId: req.userId,
      doctorId: req.doctorId,
      type: req.type,
      status: req.status,
      reason: req.reason,
      date: req.date,
      time: req.time,
      patientName: req.patientName,
      email: req.email,
      phone: req.phone,
      doctorNotes: req.doctorNotes,
      createdAt: req.createdAt,
      completedAt: req.completedAt,
      cancelledAt: req.cancelledAt,
      cancelReason: req.cancelReason,
      details,
    }
  })
}

export async function getConsultRequestById(id: string): Promise<ConsultRequest | null> {
  const requests = await sql`
    SELECT 
      mr.id, 
      mr.user_id as "userId",
      mr.doctor_id as "doctorId",
      mr.type,
      mr.status,
      mr.reason,
      mr.date,
      mr.time,
      mr.patient_name as "patientName",
      mr.email,
      mr.phone,
      mr.doctor_notes as "doctorNotes",
      mr.created_at as "createdAt",
      mr.completed_at as "completedAt",
      mr.cancelled_at as "cancelledAt",
      mr.cancel_reason as "cancelReason",
      
      -- Consultation details
      cd.symptoms,
      cd.duration,
      cd.has_files as "hasFiles",
      
      -- Certificate details
      cert.start_date as "startDate",
      cert.end_date as "endDate",
      cert.condition,
      cert.has_files as "certHasFiles",
      
      -- Prescription details
      pd.medication,
      pd.dosage,
      pd.delivery_option as "deliveryOption",
      pd.has_files as "prescHasFiles"
      
    FROM medical_requests mr
    LEFT JOIN consultation_details cd ON mr.id = cd.request_id
    LEFT JOIN certificate_details cert ON mr.id = cert.request_id
    LEFT JOIN prescription_details pd ON mr.id = pd.request_id
    WHERE mr.id = ${id}
  `

  if (requests.length === 0) {
    return null
  }

  const req = requests[0]

  // Construct the details object based on the request type
  let details: any = {}

  if (req.type === "consultation") {
    details = {
      symptoms: req.symptoms,
      duration: req.duration,
      hasFiles: req.hasFiles,
    }
  } else if (req.type === "medical-certificate") {
    details = {
      startDate: req.startDate,
      endDate: req.endDate,
      condition: req.condition,
      hasFiles: req.certHasFiles,
    }
  } else if (req.type === "prescription") {
    details = {
      medication: req.medication,
      dosage: req.dosage,
      deliveryOption: req.deliveryOption,
      hasFiles: req.prescHasFiles,
    }
  }

  return {
    id: req.id,
    userId: req.userId,
    doctorId: req.doctorId,
    type: req.type,
    status: req.status,
    reason: req.reason,
    date: req.date,
    time: req.time,
    patientName: req.patientName,
    email: req.email,
    phone: req.phone,
    doctorNotes: req.doctorNotes,
    createdAt: req.createdAt,
    completedAt: req.completedAt,
    cancelledAt: req.cancelledAt,
    cancelReason: req.cancelReason,
    details,
  }
}

export async function getConsultRequestsByUserId(userId: string): Promise<ConsultRequest[]> {
  const requests = await sql`
    SELECT 
      mr.id, 
      mr.user_id as "userId",
      mr.doctor_id as "doctorId",
      mr.type,
      mr.status,
      mr.reason,
      mr.date,
      mr.time,
      mr.patient_name as "patientName",
      mr.email,
      mr.phone,
      mr.doctor_notes as "doctorNotes",
      mr.created_at as "createdAt",
      mr.completed_at as "completedAt",
      mr.cancelled_at as "cancelledAt",
      mr.cancel_reason as "cancelReason",
      
      -- Consultation details
      cd.symptoms,
      cd.duration,
      cd.has_files as "hasFiles",
      
      -- Certificate details
      cert.start_date as "startDate",
      cert.end_date as "endDate",
      cert.condition,
      cert.has_files as "certHasFiles",
      
      -- Prescription details
      pd.medication,
      pd.dosage,
      pd.delivery_option as "deliveryOption",
      pd.has_files as "prescHasFiles"
      
    FROM medical_requests mr
    LEFT JOIN consultation_details cd ON mr.id = cd.request_id
    LEFT JOIN certificate_details cert ON mr.id = cert.request_id
    LEFT JOIN prescription_details pd ON mr.id = pd.request_id
    WHERE mr.user_id = ${userId}
    ORDER BY mr.created_at DESC
  `

  // Transform the results to match the expected format
  return requests.map((req) => {
    // Construct the details object based on the request type
    let details: any = {}

    if (req.type === "consultation") {
      details = {
        symptoms: req.symptoms,
        duration: req.duration,
        hasFiles: req.hasFiles,
      }
    } else if (req.type === "medical-certificate") {
      details = {
        startDate: req.startDate,
        endDate: req.endDate,
        condition: req.condition,
        hasFiles: req.certHasFiles,
      }
    } else if (req.type === "prescription") {
      details = {
        medication: req.medication,
        dosage: req.dosage,
        deliveryOption: req.deliveryOption,
        hasFiles: req.prescHasFiles,
      }
    }

    return {
      id: req.id,
      userId: req.userId,
      doctorId: req.doctorId,
      type: req.type,
      status: req.status,
      reason: req.reason,
      date: req.date,
      time: req.time,
      patientName: req.patientName,
      email: req.email,
      phone: req.phone,
      doctorNotes: req.doctorNotes,
      createdAt: req.createdAt,
      completedAt: req.completedAt,
      cancelledAt: req.cancelledAt,
      cancelReason: req.cancelReason,
      details,
    }
  })
}

export async function createConsultRequest(
  requestData: Omit<ConsultRequest, "id" | "createdAt">,
): Promise<ConsultRequest> {
  const { userId, doctorId, type, status, reason, date, time, patientName, email, phone, doctorNotes, details } =
    requestData

  // Start a transaction
  const result = await sql.begin(async (sql) => {
    // Insert into medical_requests
    const requests = await sql`
      INSERT INTO medical_requests (
        user_id,
        doctor_id,
        type,
        status,
        reason,
        date,
        time,
        patient_name,
        email,
        phone,
        doctor_notes
      ) 
      VALUES (
        ${userId},
        ${doctorId || null},
        ${type},
        ${status || "pending"},
        ${reason},
        ${date},
        ${time},
        ${patientName},
        ${email},
        ${phone},
        ${doctorNotes || null}
      )
      RETURNING 
        id, 
        user_id as "userId",
        doctor_id as "doctorId",
        type,
        status,
        reason,
        date,
        time,
        patient_name as "patientName",
        email,
        phone,
        doctor_notes as "doctorNotes",
        created_at as "createdAt",
        completed_at as "completedAt",
        cancelled_at as "cancelledAt",
        cancel_reason as "cancelReason"
    `

    const request = requests[0]

    // Insert into the appropriate details table based on type
    if (type === "consultation" && details) {
      await sql`
        INSERT INTO consultation_details (
          request_id,
          symptoms,
          duration,
          has_files
        ) 
        VALUES (
          ${request.id},
          ${details.symptoms || null},
          ${details.duration || null},
          ${details.hasFiles || false}
        )
      `
    } else if (type === "medical-certificate" && details) {
      await sql`
        INSERT INTO certificate_details (
          request_id,
          start_date,
          end_date,
          condition,
          has_files
        ) 
        VALUES (
          ${request.id},
          ${details.startDate ? new Date(details.startDate) : null},
          ${details.endDate ? new Date(details.endDate) : null},
          ${details.condition || null},
          ${details.hasFiles || false}
        )
      `
    } else if (type === "prescription" && details) {
      await sql`
        INSERT INTO prescription_details (
          request_id,
          medication,
          dosage,
          delivery_option,
          has_files
        ) 
        VALUES (
          ${request.id},
          ${details.medication || ""},
          ${details.dosage || null},
          ${details.deliveryOption || "pharmacy"},
          ${details.hasFiles || false}
        )
      `
    }

    return {
      ...request,
      details: details || {},
    }
  })

  return result
}

export async function updateConsultRequest(
  id: string,
  requestData: Partial<ConsultRequest>,
): Promise<ConsultRequest | null> {
  const { status, doctorId, doctorNotes, details } = requestData

  // Start a transaction
  const result = await sql.begin(async (sql) => {
    // Build the SET clause dynamically based on provided fields
    const setClauses = []
    const params = []

    if (status !== undefined) {
      setClauses.push("status = $1")
      params.push(status)
    }

    if (doctorId !== undefined) {
      setClauses.push("doctor_id = $" + (params.length + 1))
      params.push(doctorId)
    }

    if (doctorNotes !== undefined) {
      setClauses.push("doctor_notes = $" + (params.length + 1))
      params.push(doctorNotes)
    }

    if (status === "completed") {
      setClauses.push("completed_at = CURRENT_TIMESTAMP")
    }

    if (status === "cancelled") {
      setClauses.push("cancelled_at = CURRENT_TIMESTAMP")

      if (requestData.cancelReason) {
        setClauses.push("cancel_reason = $" + (params.length + 1))
        params.push(requestData.cancelReason)
      }
    }

    if (setClauses.length === 0) {
      return getConsultRequestById(id)
    }

    // Add the id parameter
    params.push(id)

    const query = `
      UPDATE medical_requests 
      SET ${setClauses.join(", ")} 
      WHERE id = $${params.length}
      RETURNING 
        id, 
        user_id as "userId",
        doctor_id as "doctorId",
        type,
        status,
        reason,
        date,
        time,
        patient_name as "patientName",
        email,
        phone,
        doctor_notes as "doctorNotes",
        created_at as "createdAt",
        completed_at as "completedAt",
        cancelled_at as "cancelledAt",
        cancel_reason as "cancelReason"
    `

    const requests = await sql.unsafe(query, ...params)

    if (requests.length === 0) {
      return null
    }

    const request = requests[0]

    // Update details if provided
    if (details) {
      if (request.type === "consultation") {
        await sql`
          UPDATE consultation_details
          SET
            symptoms = COALESCE(${details.symptoms}, symptoms),
            duration = COALESCE(${details.duration}, duration),
            has_files = COALESCE(${details.hasFiles}, has_files)
          WHERE request_id = ${id}
        `
      } else if (request.type === "medical-certificate") {
        await sql`
          UPDATE certificate_details
          SET
            start_date = COALESCE(${details.startDate ? new Date(details.startDate) : null}, start_date),
            end_date = COALESCE(${details.endDate ? new Date(details.endDate) : null}, end_date),
            condition = COALESCE(${details.condition}, condition),
            has_files = COALESCE(${details.hasFiles}, has_files)
          WHERE request_id = ${id}
        `
      } else if (request.type === "prescription") {
        await sql`
          UPDATE prescription_details
          SET
            medication = COALESCE(${details.medication}, medication),
            dosage = COALESCE(${details.dosage}, dosage),
            delivery_option = COALESCE(${details.deliveryOption}, delivery_option),
            has_files = COALESCE(${details.hasFiles}, has_files)
          WHERE request_id = ${id}
        `
      }
    }

    // Get the updated request with details
    return getConsultRequestById(id)
  })

  return result
}

export async function markConsultRequestAsCompleted(id: string): Promise<ConsultRequest | null> {
  return updateConsultRequest(id, {
    status: "completed",
  })
}

export async function completeConsultRequest(id: string, doctorNotes: string): Promise<ConsultRequest | null> {
  return updateConsultRequest(id, {
    status: "completed",
    doctorNotes,
  })
}

export async function cancelConsultRequest(id: string, reason?: string): Promise<ConsultRequest | null> {
  return updateConsultRequest(id, {
    status: "cancelled",
    cancelReason: reason,
  })
}

export async function deleteConsultRequest(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM medical_requests
    WHERE id = ${id}
  `

  return result.count > 0
}

// Doctor functions
export async function getAllDoctors(): Promise<Doctor[]> {
  const doctors = await sql`
    SELECT 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      specialty,
      phone, 
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
    FROM doctors
    ORDER BY created_at DESC
  `

  return doctors
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  const doctors = await sql`
    SELECT 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      specialty,
      phone, 
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
    FROM doctors
    WHERE id = ${id}
  `

  return doctors.length > 0 ? doctors[0] : null
}

export async function getDoctorByEmail(email: string): Promise<Doctor | null> {
  const doctors = await sql`
    SELECT 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      specialty,
      phone, 
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
    FROM doctors
    WHERE email = ${email}
  `

  return doctors.length > 0 ? doctors[0] : null
}

export async function createDoctor(doctorData: Omit<Doctor, "id" | "createdAt" | "updatedAt">): Promise<Doctor> {
  const { email, firstName, lastName, specialty, phone } = doctorData

  const doctors = await sql`
    INSERT INTO doctors (
      email, 
      first_name, 
      last_name, 
      specialty,
      phone
    ) 
    VALUES (
      ${email}, 
      ${firstName}, 
      ${lastName}, 
      ${specialty || null}, 
      ${phone || null}
    )
    RETURNING 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      specialty,
      phone, 
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
  `

  return doctors[0]
}

export async function updateDoctor(id: string, doctorData: Partial<Doctor>): Promise<Doctor | null> {
  const { email, firstName, lastName, specialty, phone } = doctorData

  // Build the SET clause dynamically based on provided fields
  const setClauses = []
  const params = []

  if (email !== undefined) {
    setClauses.push("email = $1")
    params.push(email)
  }

  if (firstName !== undefined) {
    setClauses.push("first_name = $" + (params.length + 1))
    params.push(firstName)
  }

  if (lastName !== undefined) {
    setClauses.push("last_name = $" + (params.length + 1))
    params.push(lastName)
  }

  if (specialty !== undefined) {
    setClauses.push("specialty = $" + (params.length + 1))
    params.push(specialty)
  }

  if (phone !== undefined) {
    setClauses.push("phone = $" + (params.length + 1))
    params.push(phone)
  }

  // Always update the updated_at timestamp
  setClauses.push("updated_at = CURRENT_TIMESTAMP")

  if (setClauses.length === 0) {
    return getDoctorById(id)
  }

  // Add the id parameter
  params.push(id)

  const query = `
    UPDATE doctors 
    SET ${setClauses.join(", ")} 
    WHERE id = $${params.length}
    RETURNING 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      specialty,
      phone, 
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
  `

  const doctors = await sql.unsafe(query, ...params)

  return doctors.length > 0 ? doctors[0] : null
}

export async function updateDoctorLoginTime(id: string): Promise<Doctor | null> {
  const doctors = await sql`
    UPDATE doctors 
    SET 
      last_login = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING 
      id, 
      email, 
      first_name as "firstName", 
      last_name as "lastName", 
      specialty,
      phone, 
      created_at as "createdAt", 
      updated_at as "updatedAt", 
      last_login as "lastLogin"
  `

  return doctors.length > 0 ? doctors[0] : null
}

export async function deleteDoctor(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM doctors
    WHERE id = ${id}
  `

  return result.count > 0
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
