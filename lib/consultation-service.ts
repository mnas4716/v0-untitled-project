// Enhanced consultation service with better data handling
import {
  getAllConsultRequests,
  getConsultRequestById,
  markConsultRequestAsCompleted,
  updateConsultRequest,
} from "./database-service"

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
  type?: string
  details?: any
  notes?: string
}

// Get all consultations from database
export function getAllConsultations(): Consultation[] {
  try {
    // Get consultations from database service
    const consultRequests = getAllConsultRequests()

    // Convert to the format expected by the UI
    return consultRequests.map((req) => ({
      id: req.id,
      name: req.patientName,
      email: req.email,
      phone: req.phone,
      date: req.date,
      time: req.time,
      reason: req.reason,
      completed: req.status === "completed",
      createdAt: req.createdAt,
      type: req.type,
      details: req.details,
      notes: req.notes,
    }))
  } catch (error) {
    console.error("Error getting consultations:", error)
    return []
  }
}

// Get a specific consultation by ID
export function getConsultationById(id: string): Consultation | null {
  try {
    const request = getConsultRequestById(id)
    if (!request) return null

    return {
      id: request.id,
      name: request.patientName,
      email: request.email,
      phone: request.phone,
      date: request.date,
      time: request.time,
      reason: request.reason,
      completed: request.status === "completed",
      createdAt: request.createdAt,
      type: request.type,
      details: request.details,
      notes: request.notes,
    }
  } catch (error) {
    console.error("Error getting consultation by ID:", error)
    return null
  }
}

// Mark a consultation as completed
export function markConsultationAsCompleted(id: string): boolean {
  try {
    const result = markConsultRequestAsCompleted(id)
    return !!result
  } catch (error) {
    console.error("Error marking consultation as completed:", error)
    return false
  }
}

// Update consultation notes
export function updateConsultationNotes(id: string, notes: string): boolean {
  try {
    const result = updateConsultRequest(id, { notes })
    return !!result
  } catch (error) {
    console.error("Error updating consultation notes:", error)
    return false
  }
}

// Helper function to generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
