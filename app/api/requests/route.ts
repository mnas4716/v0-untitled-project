import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getAllConsultRequests, getConsultRequestsByUserId } from "@/lib/database-service"

export async function GET() {
  // Get the session
  const session = await getServerSession(authOptions)

  // If there's no session, return unauthorized
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get the user's role and ID
  const userRole = session.user.role
  const userId = session.user.id

  try {
    let requests

    // If the user is an admin or doctor, return all requests
    if (userRole === "admin" || userRole === "doctor") {
      requests = getAllConsultRequests()
    }
    // If the user is a regular user, only return their requests
    else if (userRole === "user") {
      requests = getConsultRequestsByUserId(userId)

      // Remove sensitive information for user view
      requests = requests.map((request) => ({
        ...request,
        doctorNotes: undefined, // Remove doctor notes
      }))
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ requests })
  } catch (error) {
    console.error("Error fetching requests:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
