import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAllConsultRequests } from "@/lib/database-service"
import AdminDashboardClient from "./admin-dashboard-client"

export default async function AdminDashboardPage() {
  // Get the session
  const session = await getServerSession(authOptions)

  // If there's no session or user is not an admin, redirect to sign-in
  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin?callbackUrl=/admin/dashboard")
  }

  // Get all requests
  const requests = getAllConsultRequests()

  // Pass the data to the client component
  return <AdminDashboardClient user={session.user} requests={requests} />
}
