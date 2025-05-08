// Consultation type definition
export interface Consultation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  reason: string
  completed: boolean
  createdAt: string
}

// Save a new consultation to localStorage
export function saveConsultation(consultation: Omit<Consultation, "id" | "completed" | "createdAt">) {
  if (typeof window === "undefined") return null

  try {
    // Get existing consultations
    const existingConsultations = getAllConsultations()

    // Create new consultation with ID and timestamp
    const newConsultation: Consultation = {
      ...consultation,
      id: generateId(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    // Add to existing consultations
    const updatedConsultations = [newConsultation, ...existingConsultations]

    // Save to localStorage
    localStorage.setItem("consultations", JSON.stringify(updatedConsultations))

    return newConsultation
  } catch (error) {
    console.error("Error saving consultation:", error)
    return null
  }
}

// Get all consultations from localStorage
export function getAllConsultations(): Consultation[] {
  if (typeof window === "undefined") return []

  try {
    const consultations = localStorage.getItem("consultations")
    return consultations ? JSON.parse(consultations) : []
  } catch (error) {
    console.error("Error getting consultations:", error)
    return []
  }
}

// Mark a consultation as completed
export function markConsultationAsCompleted(id: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const consultations = getAllConsultations()
    const updatedConsultations = consultations.map((consultation) =>
      consultation.id === id ? { ...consultation, completed: true } : consultation,
    )

    localStorage.setItem("consultations", JSON.stringify(updatedConsultations))
    return true
  } catch (error) {
    console.error("Error marking consultation as completed:", error)
    return false
  }
}

// Helper function to generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
