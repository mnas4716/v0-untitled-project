"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, FileText, Activity, User, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { getConsultRequestsByEmail } from "@/lib/database-service"
import { SiteFooter } from "@/components/site-footer"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [requests, setRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (!storedUser) {
        router.push("/auth/verify-otp")
        return
      }

      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        // Get user's requests
        const userRequests = getConsultRequestsByEmail(parsedUser.email)
        setRequests(userRequests)
      } catch (error) {
        console.error("Error parsing user data:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [router])

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      router.push("/")
    }
  }

  // Group requests by type
  const consultations = requests.filter((req) => req.type === "consultation")
  const prescriptions = requests.filter((req) => req.type === "prescription")
  const certificates = requests.filter((req) => req.type === "medical-certificate")

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader activePage="dashboard" />

      <main className="flex-1 bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-slate-500">
                Welcome back, {user?.firstName || user?.email.split("@")[0] || "User"}! Manage your healthcare needs
                here.
              </p>
            </div>
            <div className="flex items-center gap-2">{/* Buttons removed as requested */}</div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                <Clock className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{consultations.length}</div>
                <p className="text-xs text-slate-500">
                  {consultations.filter((c) => c.status === "pending").length} pending
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link href="/consult">Book Consultation</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
                <FileText className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{prescriptions.length}</div>
                <p className="text-xs text-slate-500">
                  {prescriptions.filter((p) => p.status === "pending").length} pending
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link href="/prescription">Request Prescription</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Medical Certificates</CardTitle>
                <Activity className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{certificates.length}</div>
                <p className="text-xs text-slate-500">
                  {certificates.filter((c) => c.status === "pending").length} pending
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link href="/medical-certificate">Request Certificate</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="h-8 w-8 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-slate-500">{user?.phone || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Date of Birth</p>
                      <p className="text-sm text-slate-500">{user?.dob || "Not set"}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard/profile">
                        <User className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Requests</CardTitle>
                  <CardDescription>View and manage your healthcare requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                      {requests.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                          <p>You don't have any requests yet.</p>
                          <p className="mt-2">
                            <Link href="/consult" className="text-blue-600 hover:underline">
                              Book a consultation
                            </Link>{" "}
                            to get started.
                          </p>
                        </div>
                      ) : (
                        requests
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((request) => (
                            <div key={request.id} className="border rounded-lg p-4 bg-white">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">
                                      {request.type === "consultation"
                                        ? "Consultation"
                                        : request.type === "prescription"
                                          ? "Prescription"
                                          : "Medical Certificate"}
                                    </h3>
                                    {request.status === "pending" ? (
                                      <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                                    ) : request.status === "completed" ? (
                                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                                    ) : (
                                      <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-slate-500 mt-1">
                                    Requested on {formatDate(request.createdAt)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Button asChild size="sm" variant="outline">
                                    <Link href={`/dashboard/request/${request.id}`}>View Details</Link>
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-slate-600 line-clamp-2">{request.reason}</p>
                              </div>

                              {/* Display doctor notes if available */}
                              {request.doctorNotes && (
                                <div className="mt-3 bg-blue-50 p-3 rounded-md">
                                  <p className="text-xs font-medium text-blue-700 mb-1">Doctor's Notes:</p>
                                  <p className="text-sm text-slate-700 line-clamp-2">{request.doctorNotes}</p>
                                </div>
                              )}

                              {/* Display file attachments if available */}
                              {request.attachments && request.attachments.length > 0 && (
                                <div className="mt-2 flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    />
                                  </svg>
                                  <span className="text-xs text-slate-500">
                                    {request.attachments.length}{" "}
                                    {request.attachments.length === 1 ? "attachment" : "attachments"}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))
                      )}
                    </TabsContent>

                    <TabsContent value="pending" className="space-y-4">
                      {requests.filter((r) => r.status === "pending").length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                          <p>You don't have any pending requests.</p>
                        </div>
                      ) : (
                        requests
                          .filter((r) => r.status === "pending")
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((request) => (
                            <div key={request.id} className="border rounded-lg p-4 bg-white">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">
                                      {request.type === "consultation"
                                        ? "Consultation"
                                        : request.type === "prescription"
                                          ? "Prescription"
                                          : "Medical Certificate"}
                                    </h3>
                                    <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                                  </div>
                                  <p className="text-sm text-slate-500 mt-1">
                                    Requested on {formatDate(request.createdAt)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Button asChild size="sm" variant="outline">
                                    <Link href={`/dashboard/request/${request.id}`}>View Details</Link>
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-slate-600 line-clamp-2">{request.reason}</p>
                              </div>

                              {/* Display file attachments if available */}
                              {request.attachments && request.attachments.length > 0 && (
                                <div className="mt-2 flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    />
                                  </svg>
                                  <span className="text-xs text-slate-500">
                                    {request.attachments.length}{" "}
                                    {request.attachments.length === 1 ? "attachment" : "attachments"}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))
                      )}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-4">
                      {requests.filter((r) => r.status === "completed").length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                          <p>You don't have any completed requests.</p>
                        </div>
                      ) : (
                        requests
                          .filter((r) => r.status === "completed")
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((request) => (
                            <div key={request.id} className="border rounded-lg p-4 bg-white">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">
                                      {request.type === "consultation"
                                        ? "Consultation"
                                        : request.type === "prescription"
                                          ? "Prescription"
                                          : "Medical Certificate"}
                                    </h3>
                                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                                  </div>
                                  <p className="text-sm text-slate-500 mt-1">
                                    Completed on {formatDate(request.completedAt || request.createdAt)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Button asChild size="sm" variant="outline">
                                    <Link href={`/dashboard/request/${request.id}`}>View Details</Link>
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-slate-600 line-clamp-2">{request.reason}</p>
                              </div>

                              {/* Display doctor notes if available */}
                              {request.doctorNotes && (
                                <div className="mt-3 bg-blue-50 p-3 rounded-md">
                                  <p className="text-xs font-medium text-blue-700 mb-1">Doctor's Notes:</p>
                                  <p className="text-sm text-slate-700 line-clamp-2">{request.doctorNotes}</p>
                                </div>
                              )}

                              {/* Display file attachments if available */}
                              {request.attachments && request.attachments.length > 0 && (
                                <div className="mt-2 flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    />
                                  </svg>
                                  <span className="text-xs text-slate-500">
                                    {request.attachments.length}{" "}
                                    {request.attachments.length === 1 ? "attachment" : "attachments"}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
