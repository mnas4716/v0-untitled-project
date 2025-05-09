import { type NextRequest, NextResponse } from "next/server"
import { updateConsultRequest } from "@/lib/database-service"

// This is a simplified API route for demo purposes
// In a real application, you would use proper authentication and authorization

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // In a real application, you would check the user's session and role here
    // For demo purposes, we'll assume the user is authorized

    // Get the request body
    const body = await request.json()
    const { doctorNotes } = body

    if (!doctorNotes) {
      return NextResponse.json({ error: "Doctor notes are required" }, { status: 400 })
    }

    // Update the consultation
    const result = updateConsultRequest(params.id, { doctorNotes })

    if (!result) {
      return NextResponse.json({ error: "Consultation not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating consultation:", error)
    return NextResponse.json({ error: "Failed to update consultation" }, { status: 500 })
  }
}
