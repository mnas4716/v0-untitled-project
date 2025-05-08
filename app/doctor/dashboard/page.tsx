import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAllConsultRequests } from "@/lib/database-service"
import DoctorDashboardClient from "./doctor-dashboard-client"

export default async function DoctorDashboardPage() {
  // Get the session
  const session = await getServerSession(authOptions)

  // If there's no session or user is not a doctor, redirect to sign-in
  if (!session || session.user.role !== "doctor") {
    redirect("/auth/signin?callbackUrl=/doctor/dashboard")
  }

  // Get all requests
  const requests = getAllConsultRequests()

  // Pass the data to the client component
  return <DoctorDashboardClient user={session.user} requests={requests} />
}
