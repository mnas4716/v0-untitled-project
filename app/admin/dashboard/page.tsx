"use client"

import { useState, useEffect, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Stethoscope, FileText, Search, Info, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cancelConsultRequest } from "@/lib/database-service"
import Link from "next/link"

// Define the consultation type
interface Consultation {
  id: string
  patientName: string
  email: string
  phone: string
  date: string
  time: string
  reason: string
  status: string
  type: string
  createdAt: string
  completedAt?: string
  doctorNotes?: string
}

export default function AdminDashboardPage() {
  const [activeConsultations, setActiveConsultations] = useState<Consultation[]>([])
  const [completedConsultations, setCompletedConsultations] = useState<Consultation[]>([])
  const [cancelledConsultations, setCancelledConsultations] = useState<Consultation[]>([])
  const [adminUser, setAdminUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")

  // Load consultations from localStorage or fetch from server
  useEffect(() => {
    const loadConsultations = () => {
      setIsLoading(true)
      try {
        // Get admin user from localStorage
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("adminUser")
          if (storedUser) {
            try {
              setAdminUser(JSON.parse(storedUser))
            } catch (error) {
              console.error("Error parsing admin user data:", error)
            }
          }

          // Get consultations from localStorage
          const storedConsultations = localStorage.getItem("consultations")
          let consultations: Consultation[] = []

          if (storedConsultations) {
            try {
              consultations = JSON.parse(storedConsultations)
            } catch (error) {
              console.error("Error parsing consultations data:", error)
            }
          } else {
            // If no consultations in localStorage, use mock data
            consultations = [
              {
                id: "c1",
                patientName: "John Smith",
                email: "john.smith@example.com",
                phone: "0412 345 678",
                date: "2023-05-15",
                time: "10:00 AM",
                reason: "Persistent cough and fever",
                status: "pending",
                type: "consultation",
                createdAt: new Date().toISOString(),
              },
              {
                id: "c2",
                patientName: "Sarah Johnson",
                email: "sarah.j@example.com",
                phone: "0423 456 789",
                date: "2023-05-15",
                time: "11:30 AM",
                reason: "Skin rash and itching",
                status: "pending",
                type: "consultation",
                createdAt: new Date(Date.now() - 86400000).toISOString(),
              },
              {
                id: "c3",
                patientName: "Michael Brown",
                email: "m.brown@example.com",
                phone: "0434 567 890",
                date: "2023-05-16",
                time: "9:15 AM",
                reason: "Back pain after exercise",
                status: "pending",
                type: "consultation",
                createdAt: new Date(Date.now() - 172800000).toISOString(),
              },
              {
                id: "c4",
                patientName: "Emma Wilson",
                email: "emma.w@example.com",
                phone: "0445 678 901",
                date: "2023-05-14",
                time: "2:30 PM",
                reason: "Medical Certificate: Flu",
                status: "completed",
                type: "medical-certificate",
                createdAt: new Date(Date.now() - 259200000).toISOString(),
                completedAt: new Date(Date.now() - 172800000).toISOString(),
              },
              {
                id: "c5",
                patientName: "David Lee",
                email: "david.l@example.com",
                phone: "0456 789 012",
                date: "2023-05-13",
                time: "11:00 AM",
                reason: "Prescription Request: Antibiotics",
                status: "completed",
                type: "prescription",
                createdAt: new Date(Date.now() - 345600000).toISOString(),
                completedAt: new Date(Date.now() - 259200000).toISOString(),
              },
            ]

            // Save mock data to localStorage
            localStorage.setItem("consultations", JSON.stringify(consultations))
          }

          // Split into active, completed, and cancelled
          setActiveConsultations(consultations.filter((c) => c.status === "pending"))
          setCompletedConsultations(consultations.filter((c) => c.status === "completed"))
          setCancelledConsultations(consultations.filter((c) => c.status === "cancelled"))
        }
      } catch (error) {
        console.error("Error loading consultations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConsultations()
  }, [])

  // Function to handle cancelling a consultation
  const handleCancelConsultation = (consultationId: string) => {
    // Confirm before cancelling
    if (!window.confirm("Are you sure you want to cancel this consultation?")) {
      return
    }

    try {
      // Cancel the consultation in the database
      const result = cancelConsultRequest(consultationId, "Cancelled by admin")

      if (result) {
        // Update the local state
        const consultation = activeConsultations.find((c) => c.id === consultationId)
        if (consultation) {
          // Remove from active and add to cancelled
          const newActiveConsultations = activeConsultations.filter((c) => c.id !== consultationId)
          const newCancelledConsultations = [
            { ...consultation, status: "cancelled", cancelledAt: new Date().toISOString() },
            ...cancelledConsultations,
          ]

          // Update state
          setActiveConsultations(newActiveConsultations)
          setCancelledConsultations(newCancelledConsultations)

          // Update localStorage
          const allConsultations = [...newActiveConsultations, ...completedConsultations, ...newCancelledConsultations]
          localStorage.setItem("consultations", JSON.stringify(allConsultations))
        }
      }
    } catch (error) {
      console.error("Error cancelling consultation:", error)
      alert("Failed to cancel consultation")
    }
  }

  // Filter consultations based on search term - memoized to prevent unnecessary recalculations
  const filteredActiveConsultations = useMemo(() => {
    return activeConsultations.filter(
      (c) =>
        c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.reason.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [activeConsultations, searchTerm])

  const filteredCompletedConsultations = useMemo(() => {
    return completedConsultations.filter(
      (c) =>
        c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.reason.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [completedConsultations, searchTerm])

  const filteredCancelledConsultations = useMemo(() => {
    return cancelledConsultations.filter(
      (c) =>
        c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.reason.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [cancelledConsultations, searchTerm])

  // Get consultation type badge
  const getConsultationTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Consultation</Badge>
      case "medical-certificate":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Medical Certificate</Badge>
      case "prescription":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Prescription</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{type}</Badge>
    }
  }

  // Calculate stats once
  const totalConsultations = activeConsultations.length + completedConsultations.length + cancelledConsultations.length
  const completionRate =
    totalConsultations > 0 ? Math.round((completedConsultations.length / totalConsultations) * 100) : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        {adminUser && (
          <p className="text-slate-500">
            Welcome back, {adminUser.firstName} {adminUser.lastName}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsultations}</div>
            <p className="text-xs text-slate-500">All time consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Consultations</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeConsultations.length}</div>
            <p className="text-xs text-slate-500">Pending consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Stethoscope className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedConsultations.length}</div>
            <p className="text-xs text-slate-500">Completed consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-slate-500">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <Input
          type="search"
          placeholder="Search consultations..."
          className="pl-10 mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Consultations</TabsTrigger>
          <TabsTrigger value="completed">Completed Consultations</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled Consultations</TabsTrigger>
          <TabsTrigger value="all">All Consultations</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Consultation Requests</CardTitle>
              <CardDescription>
                Manage pending consultation requests. All emails are sent to moe@freedoc.com.au.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-6">Loading consultations...</div>
              ) : filteredActiveConsultations.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No active consultation requests</div>
              ) : (
                <div className="space-y-6">
                  {filteredActiveConsultations.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{consultation.patientName}</h3>
                            {getConsultationTypeBadge(consultation.type)}
                          </div>
                          <p className="text-sm text-slate-500">{consultation.email}</p>
                          <p className="text-sm text-slate-500">{consultation.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {consultation.date} at {consultation.time}
                          </p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Reason:</span> {consultation.reason}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Received: {new Date(consultation.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleCancelConsultation(consultation.id)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/consult/${consultation.id}`}>
                            <Info className="mr-2 h-4 w-4" />
                            See Info
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Consultations</CardTitle>
              <CardDescription>View consultations that have been processed.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-6">Loading consultations...</div>
              ) : filteredCompletedConsultations.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No completed consultations</div>
              ) : (
                <div className="space-y-6">
                  {filteredCompletedConsultations.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{consultation.patientName}</h3>
                            {getConsultationTypeBadge(consultation.type)}
                          </div>
                          <p className="text-sm text-slate-500">{consultation.email}</p>
                          <p className="text-sm text-slate-500">{consultation.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {consultation.date} at {consultation.time}
                          </p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Reason:</span> {consultation.reason}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Completed:{" "}
                          {consultation.completedAt ? new Date(consultation.completedAt).toLocaleString() : "Unknown"}
                        </p>
                        {consultation.doctorNotes && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-md">
                            <p className="text-sm font-medium text-blue-800">Doctor Notes:</p>
                            <p className="text-sm text-blue-700">{consultation.doctorNotes}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/consult/${consultation.id}`}>
                            <Info className="mr-2 h-4 w-4" />
                            See Info
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Consultations</CardTitle>
              <CardDescription>View consultations that have been cancelled.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-6">Loading consultations...</div>
              ) : filteredCancelledConsultations.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No cancelled consultations</div>
              ) : (
                <div className="space-y-6">
                  {filteredCancelledConsultations.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{consultation.patientName}</h3>
                            {getConsultationTypeBadge(consultation.type)}
                          </div>
                          <p className="text-sm text-slate-500">{consultation.email}</p>
                          <p className="text-sm text-slate-500">{consultation.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {consultation.date} at {consultation.time}
                          </p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                            Cancelled
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Reason:</span> {consultation.reason}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Cancelled:{" "}
                          {consultation.cancelledAt ? new Date(consultation.cancelledAt).toLocaleString() : "Unknown"}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/consult/${consultation.id}`}>
                            <Info className="mr-2 h-4 w-4" />
                            See Info
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Consultations</CardTitle>
              <CardDescription>Complete log of all consultation requests.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-6">Loading consultations...</div>
              ) : filteredActiveConsultations.length === 0 &&
                filteredCompletedConsultations.length === 0 &&
                filteredCancelledConsultations.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No consultations found</div>
              ) : (
                <div className="space-y-6">
                  {[
                    ...filteredActiveConsultations,
                    ...filteredCompletedConsultations,
                    ...filteredCancelledConsultations,
                  ]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((consultation) => (
                      <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{consultation.patientName}</h3>
                              {getConsultationTypeBadge(consultation.type)}
                            </div>
                            <p className="text-sm text-slate-500">{consultation.email}</p>
                            <p className="text-sm text-slate-500">{consultation.phone}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {consultation.date} at {consultation.time}
                            </p>
                            <span
                              className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                                consultation.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : consultation.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {consultation.status === "pending"
                                ? "Pending"
                                : consultation.status === "completed"
                                  ? "Completed"
                                  : "Cancelled"}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-slate-600">
                            <span className="font-medium">Reason:</span> {consultation.reason}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Received: {new Date(consultation.createdAt).toLocaleString()}
                          </p>
                          {consultation.completedAt && (
                            <p className="text-xs text-slate-400 mt-1">
                              Completed: {new Date(consultation.completedAt).toLocaleString()}
                            </p>
                          )}
                          {consultation.cancelledAt && (
                            <p className="text-xs text-slate-400 mt-1">
                              Cancelled: {new Date(consultation.cancelledAt).toLocaleString()}
                            </p>
                          )}
                          {consultation.doctorNotes && consultation.status === "completed" && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-md">
                              <p className="text-sm font-medium text-blue-800">Doctor Notes:</p>
                              <p className="text-sm text-blue-700">{consultation.doctorNotes}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          {consultation.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleCancelConsultation(consultation.id)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/dashboard/consult/${consultation.id}`}>
                              <Info className="mr-2 h-4 w-4" />
                              See Info
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
