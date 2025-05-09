"use client"

import type React from "react"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Search, FileText, ClipboardList, Info, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getAllConsultRequests, cancelConsultRequest } from "@/lib/database-service"
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
  cancelledAt?: string
  details?: any
  doctorNotes?: string
}

export default function DoctorDashboardPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [doctorUser, setDoctorUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("pending")

  // Load consultations from database
  useEffect(() => {
    let isMounted = true

    const loadConsultations = async () => {
      if (!isMounted) return

      setIsLoading(true)
      try {
        // Get doctor user from localStorage
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("doctorUser")
          if (storedUser && isMounted) {
            try {
              setDoctorUser(JSON.parse(storedUser))
            } catch (error) {
              console.error("Error parsing doctor user data:", error)
            }
          }

          // Get consultations from database service
          const allConsultations = getAllConsultRequests()

          if (isMounted) {
            setConsultations(allConsultations)
          }
        }
      } catch (error) {
        console.error("Error loading consultations:", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadConsultations()

    return () => {
      isMounted = false
    }
  }, [])

  // Handle search input change with debounce
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const timeoutId = setTimeout(() => {
      setSearchTerm(value)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  // Handle cancelling a consultation
  const handleCancelConsultation = (id: string) => {
    // Confirm before cancelling
    if (!window.confirm("Are you sure you want to cancel this consultation?")) {
      return
    }

    try {
      // Cancel the consultation in the database
      const result = cancelConsultRequest(id, "Cancelled by doctor")

      if (result) {
        // Update the local state
        setConsultations((prevConsultations) =>
          prevConsultations.map((c) =>
            c.id === id ? { ...c, status: "cancelled", cancelledAt: new Date().toISOString() } : c,
          ),
        )
      }
    } catch (error) {
      console.error("Error cancelling consultation:", error)
      alert("Failed to cancel consultation")
    }
  }

  // Filter consultations based on search term and status
  const pendingConsultations = useMemo(() => {
    const pending = consultations.filter((c) => c.status === "pending")

    if (!searchTerm.trim()) return pending

    const lowerSearchTerm = searchTerm.toLowerCase()
    return pending.filter(
      (c) =>
        c.patientName.toLowerCase().includes(lowerSearchTerm) ||
        c.email.toLowerCase().includes(lowerSearchTerm) ||
        c.reason.toLowerCase().includes(lowerSearchTerm),
    )
  }, [consultations, searchTerm])

  const completedConsultations = useMemo(() => {
    const completed = consultations.filter((c) => c.status === "completed")

    if (!searchTerm.trim()) return completed

    const lowerSearchTerm = searchTerm.toLowerCase()
    return completed.filter(
      (c) =>
        c.patientName.toLowerCase().includes(lowerSearchTerm) ||
        c.email.toLowerCase().includes(lowerSearchTerm) ||
        c.reason.toLowerCase().includes(lowerSearchTerm),
    )
  }, [consultations, searchTerm])

  const cancelledConsultations = useMemo(() => {
    const cancelled = consultations.filter((c) => c.status === "cancelled")

    if (!searchTerm.trim()) return cancelled

    const lowerSearchTerm = searchTerm.toLowerCase()
    return cancelled.filter(
      (c) =>
        c.patientName.toLowerCase().includes(lowerSearchTerm) ||
        c.email.toLowerCase().includes(lowerSearchTerm) ||
        c.reason.toLowerCase().includes(lowerSearchTerm),
    )
  }, [consultations, searchTerm])

  // Get consultation type badge - memoized to prevent recreating on each render
  const getConsultationTypeBadge = useCallback((type: string) => {
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
  }, [])

  // Calculate today's appointments count
  const todayAppointmentsCount = useMemo(() => {
    const today = new Date().toDateString()
    return consultations.filter((a) => a.status === "pending" && new Date(a.date).toDateString() === today).length
  }, [consultations])

  // Calculate pending certificates count
  const pendingCertificatesCount = useMemo(() => {
    return pendingConsultations.filter((c) => c.type === "medical-certificate").length
  }, [pendingConsultations])

  // Calculate pending prescriptions count
  const pendingPrescriptionsCount = useMemo(() => {
    return pendingConsultations.filter((c) => c.type === "prescription").length
  }, [pendingConsultations])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
        {doctorUser && <p className="text-slate-500">Welcome back, Dr. {doctorUser.lastName || "Smith"}</p>}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingConsultations.length}</div>
            <p className="text-xs text-slate-500">Waiting for your attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Requests</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointmentsCount}</div>
            <p className="text-xs text-slate-500">Submitted today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Certificates</CardTitle>
            <ClipboardList className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCertificatesCount}</div>
            <p className="text-xs text-slate-500">Pending certificates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPrescriptionsCount}</div>
            <p className="text-xs text-slate-500">Pending prescriptions</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <Input type="search" placeholder="Search patients..." className="pl-10 mb-4" onChange={handleSearchChange} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingConsultations.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {pendingConsultations.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Review and respond to patient requests</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-6">Loading requests...</div>
              ) : pendingConsultations.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No pending requests</div>
              ) : (
                <div className="space-y-6">
                  {pendingConsultations.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{consultation.patientName[0]}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-medium">{consultation.patientName}</h3>
                            {getConsultationTypeBadge(consultation.type)}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">{consultation.email}</p>
                          <p className="text-sm text-slate-500">{consultation.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            Requested: {new Date(consultation.createdAt).toLocaleDateString()}
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
                      </div>

                      {consultation.type === "medical-certificate" && consultation.details?.startDate && (
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Certificate Start Date:</p>
                            <p className="text-sm text-slate-600">{consultation.details.startDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Certificate End Date:</p>
                            <p className="text-sm text-slate-600">{consultation.details.endDate}</p>
                          </div>
                        </div>
                      )}

                      {consultation.type === "prescription" && consultation.details?.medication && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Medication:</p>
                          <p className="text-sm text-slate-600">{consultation.details.medication}</p>
                          <div className="mt-1">
                            <p className="text-sm font-medium">Delivery Option:</p>
                            <p className="text-sm text-slate-600 capitalize">{consultation.details.deliveryOption}</p>
                          </div>
                        </div>
                      )}

                      {consultation.details?.files && (
                        <div className="mt-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="text-sm text-blue-600">Has attached documents</p>
                        </div>
                      )}

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
                          <Link href={`/doctor/dashboard/consult/${consultation.id}`}>
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
              <CardTitle>Completed Requests</CardTitle>
              <CardDescription>View your completed patient requests</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-6">Loading completed requests...</div>
              ) : completedConsultations.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No completed requests</div>
              ) : (
                <div className="space-y-6">
                  {completedConsultations.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{consultation.patientName[0]}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-medium">{consultation.patientName}</h3>
                            {getConsultationTypeBadge(consultation.type)}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">{consultation.email}</p>
                          <p className="text-sm text-slate-500">{consultation.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            Completed:{" "}
                            {consultation.completedAt
                              ? new Date(consultation.completedAt).toLocaleDateString()
                              : "Unknown"}
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
                      </div>

                      {consultation.doctorNotes && (
                        <div className="mt-2 p-2 bg-blue-50 rounded-md">
                          <p className="text-sm font-medium text-blue-800">Doctor Notes:</p>
                          <p className="text-sm text-blue-700">{consultation.doctorNotes}</p>
                        </div>
                      )}

                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/doctor/dashboard/consult/${consultation.id}`}>
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
              <CardTitle>Cancelled Requests</CardTitle>
              <CardDescription>View cancelled patient requests</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-6">Loading cancelled requests...</div>
              ) : cancelledConsultations.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No cancelled requests</div>
              ) : (
                <div className="space-y-6">
                  {cancelledConsultations.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{consultation.patientName[0]}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-medium">{consultation.patientName}</h3>
                            {getConsultationTypeBadge(consultation.type)}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">{consultation.email}</p>
                          <p className="text-sm text-slate-500">{consultation.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            Cancelled:{" "}
                            {consultation.cancelledAt
                              ? new Date(consultation.cancelledAt).toLocaleDateString()
                              : "Unknown"}
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
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/doctor/dashboard/consult/${consultation.id}`}>
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
