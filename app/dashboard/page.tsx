import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getConsultRequestsByUserId } from "@/lib/database-service"
import DashboardClient from "./dashboard-client"

export default async function DashboardPage() {
  // Get the session
  const session = await getServerSession(authOptions)

  // If there's no session, redirect to sign-in
  if (!session) {
    redirect("/auth/signin?callbackUrl=/dashboard")
  }

  // Get the user's requests
  const requests = await getConsultRequestsByUserId(session.user.id)

  // Remove sensitive information
  const sanitizedRequests = requests.map((request) => ({
    ...request,
    doctorNotes: undefined,
  }))

  // Pass the data to the client component
  return <DashboardClient user={session.user} requests={sanitizedRequests} />
}
