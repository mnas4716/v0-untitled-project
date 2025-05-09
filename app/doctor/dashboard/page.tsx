"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, Activity, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getConsultRequestsByDoctorId } from "@/lib/database-service"

export default function DoctorDashboardPage() {
  const router = useRouter()
  const [doctor, setDoctor] = useState<any>(null)
  const [consultations, setConsultations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get doctor from localStorage
    if (typeof window !== "undefined") {
      const storedDoctor = localStorage.getItem("doctorUser")
      if (!storedDoctor) {
        router.push("/doctor/signin")
        return
      }

      try {
        const parsedDoctor = JSON.parse(storedDoctor)
        setDoctor(parsedDoctor)

        // Get doctor's consultations
        const doctorConsultations = getConsultRequestsByDoctorId(parsedDoctor.id)
        setConsultations(doctorConsultations)
      } catch (error) {
        console.error("Error parsing doctor data:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [router])

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("doctorUser")
      router.push("/doctor/signin")
    }
  }

  // Group consultations by type
  const pendingConsultations = consultations.filter((c) => c.status === "pending")
  const completedConsultations = consultations.filter((c) => c.status === "completed")
  const cancelledConsultations = consultations.filter((c) => c.status === "cancelled")

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
          <p className="text-slate-500">
            Welcome, Dr. {doctor?.firstName} {doctor?.lastName}! Manage your consultations and patients here.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultations.length}</div>
            <p className="text-xs text-slate-500">{pendingConsultations.length} pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingConsultations.length}</div>
            <p className="text-xs text-slate-500">Awaiting your review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedConsultations.length}</div>
            <p className="text-xs text-slate-500">Successfully completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledConsultations.length}</div>
            <p className="text-xs text-slate-500">Cancelled consultations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Your professional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={`Dr. ${doctor?.lastName}`} />
                  <AvatarFallback>
                    {doctor?.firstName?.[0]}
                    {doctor?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    Dr. {doctor?.firstName} {doctor?.lastName}
                  </h3>
                  <p className="text-sm text-slate-500">{doctor?.specialty || "General Practice"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-slate-500">{doctor?.email}</p>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/doctor/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/doctor/dashboard/schedule">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Consultations</CardTitle>
              <CardDescription>View and manage your assigned consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                  {pendingConsultations.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <p>You don't have any pending consultations.</p>
                    </div>
                  ) : (
                    pendingConsultations
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((consultation) => (
                        <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{consultation.patientName}</h3>
                                <Badge
                                  className={
                                    consultation.type === "consultation"
                                      ? "bg-blue-100 text-blue-800"
                                      : consultation.type === "medical-certificate"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-purple-100 text-purple-800"
                                  }
                                >
                                  {consultation.type.replace("-", " ")}
                                </Badge>
                                <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                              </div>
                              <p className="text-sm text-slate-500 mt-1">
                                Requested on {formatDate(consultation.createdAt)}
                              </p>
                            </div>
                            <div className="text-right">
                              <Button asChild size="sm">
                                <Link href={`/doctor/dashboard/consult/${consultation.id}`}>Review</Link>
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-slate-600">{consultation.reason}</p>
                          </div>
                        </div>
                      ))
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {completedConsultations.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <p>You don't have any completed consultations.</p>
                    </div>
                  ) : (
                    completedConsultations
                      .sort(
                        (a, b) =>
                          new Date(b.completedAt || b.createdAt).getTime() -
                          new Date(a.completedAt || a.createdAt).getTime(),
                      )
                      .map((consultation) => (
                        <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{consultation.patientName}</h3>
                                <Badge
                                  className={
                                    consultation.type === "consultation"
                                      ? "bg-blue-100 text-blue-800"
                                      : consultation.type === "medical-certificate"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-purple-100 text-purple-800"
                                  }
                                >
                                  {consultation.type.replace("-", " ")}
                                </Badge>
                                <Badge className="bg-green-100 text-green-800">Completed</Badge>
                              </div>
                              <p className="text-sm text-slate-500 mt-1">
                                Completed on {formatDate(consultation.completedAt || consultation.createdAt)}
                              </p>
                            </div>
                            <div className="text-right">
                              <Button asChild size="sm" variant="outline">
                                <Link href={`/doctor/dashboard/consult/${consultation.id}`}>View</Link>
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-slate-600">{consultation.reason}</p>
                          </div>
                          {consultation.doctorNotes && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-md">
                              <p className="text-sm font-medium text-blue-800">Your Notes:</p>
                              <p className="text-sm text-blue-700">{consultation.doctorNotes}</p>
                            </div>
                          )}
                        </div>
                      ))
                  )}
                </TabsContent>

                <TabsContent value="all" className="space-y-4">
                  {consultations.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <p>You don't have any consultations yet.</p>
                    </div>
                  ) : (
                    consultations
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((consultation) => (
                        <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{consultation.patientName}</h3>
                                <Badge
                                  className={
                                    consultation.type === "consultation"
                                      ? "bg-blue-100 text-blue-800"
                                      : consultation.type === "medical-certificate"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-purple-100 text-purple-800"
                                  }
                                >
                                  {consultation.type.replace("-", " ")}
                                </Badge>
                                {consultation.status === "pending" ? (
                                  <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                                ) : consultation.status === "completed" ? (
                                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-500 mt-1">
                                {consultation.status === "completed"
                                  ? `Completed on ${formatDate(consultation.completedAt || consultation.createdAt)}`
                                  : consultation.status === "cancelled"
                                    ? `Cancelled on ${formatDate(consultation.cancelledAt || consultation.createdAt)}`
                                    : `Requested on ${formatDate(consultation.createdAt)}`}
                              </p>
                            </div>
                            <div className="text-right">
                              <Button
                                asChild
                                size="sm"
                                variant={consultation.status === "pending" ? "default" : "outline"}
                              >
                                <Link href={`/doctor/dashboard/consult/${consultation.id}`}>
                                  {consultation.status === "pending" ? "Review" : "View"}
                                </Link>
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-slate-600">{consultation.reason}</p>
                          </div>
                          {consultation.doctorNotes && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-md">
                              <p className="text-sm font-medium text-blue-800">Your Notes:</p>
                              <p className="text-sm text-blue-700">{consultation.doctorNotes}</p>
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
  )
}
