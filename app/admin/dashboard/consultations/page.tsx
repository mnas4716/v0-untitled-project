"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllConsultRequests, getDoctorById } from "@/lib/database-service"
import { Eye, Search, FileText, MessageSquare } from "lucide-react"

interface DoctorNote {
  text: string
  timestamp: string
  doctorId: string
  doctorName: string
}

export default function ConsultationsPage() {
  const router = useRouter()
  const [consultations, setConsultations] = useState<any[]>([])
  const [filteredConsultations, setFilteredConsultations] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadConsultations = async () => {
      setIsLoading(true)
      try {
        const allConsultations = getAllConsultRequests()

        // Process doctor notes for each consultation
        const processedConsultations = allConsultations.map((consult) => {
          let doctorNotes: DoctorNote[] = []

          if (consult.doctorNotes) {
            try {
              // Try to parse as JSON (new format)
              const parsedNotes = JSON.parse(consult.doctorNotes)
              if (Array.isArray(parsedNotes)) {
                doctorNotes = parsedNotes
              } else {
                // Handle legacy format
                doctorNotes = [
                  {
                    text: consult.doctorNotes,
                    timestamp: consult.updatedAt || consult.createdAt,
                    doctorId: consult.assignedDoctorId || "unknown",
                    doctorName: "Doctor",
                  },
                ]
              }
            } catch (e) {
              // If not valid JSON, treat as legacy string format
              doctorNotes = [
                {
                  text: consult.doctorNotes,
                  timestamp: consult.updatedAt || consult.createdAt,
                  doctorId: consult.assignedDoctorId || "unknown",
                  doctorName: "Doctor",
                },
              ]
            }
          }

          // Get doctor name if assigned
          let doctorName = ""
          if (consult.assignedDoctorId) {
            const doctor = getDoctorById(consult.assignedDoctorId)
            if (doctor) {
              doctorName = `Dr. ${doctor.firstName} ${doctor.lastName}`

              // Update doctor name in notes
              doctorNotes = doctorNotes.map((note) => {
                if (note.doctorId === consult.assignedDoctorId) {
                  return { ...note, doctorName }
                }
                return note
              })
            }
          }

          return {
            ...consult,
            doctorNotesArray: doctorNotes,
            doctorName,
          }
        })

        setConsultations(processedConsultations)
        setFilteredConsultations(processedConsultations)
      } catch (error) {
        console.error("Error loading consultations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConsultations()
  }, [])

  // Filter consultations based on search term and active tab
  useEffect(() => {
    let filtered = consultations

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (consult) =>
          consult.patientName.toLowerCase().includes(term) ||
          consult.email.toLowerCase().includes(term) ||
          consult.reason.toLowerCase().includes(term) ||
          (consult.doctorName && consult.doctorName.toLowerCase().includes(term)),
      )
    }

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((consult) => consult.status === activeTab)
    }

    setFilteredConsultations(filtered)
  }, [searchTerm, activeTab, consultations])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>
    }
  }

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading consultations...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Consultations</h2>
          <p className="text-muted-foreground">Manage patient consultations and requests</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                type="search"
                placeholder="Search by name, email, or reason..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4">
            {filteredConsultations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No consultations found</p>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : activeTab !== "all"
                        ? `No ${activeTab} consultations found`
                        : "No consultations have been created yet"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredConsultations.map((consultation) => (
                  <Card key={consultation.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{consultation.patientName}</CardTitle>
                          <CardDescription>{consultation.email}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getConsultationTypeBadge(consultation.type)}
                          {getStatusBadge(consultation.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid gap-4">
                        <div>
                          <div className="font-medium">Reason</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{consultation.reason}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="font-medium">Date</div>
                            <div className="text-sm text-muted-foreground">{consultation.date}</div>
                          </div>
                          <div>
                            <div className="font-medium">Time</div>
                            <div className="text-sm text-muted-foreground">{consultation.time}</div>
                          </div>
                        </div>

                        {/* Doctor Notes Section */}
                        {consultation.doctorNotesArray && consultation.doctorNotesArray.length > 0 && (
                          <div className="mt-2">
                            <div className="font-medium flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Doctor Notes
                            </div>
                            <div className="mt-2 space-y-2">
                              {consultation.doctorNotesArray.slice(0, 2).map((note: DoctorNote, index: number) => (
                                <div key={index} className="bg-slate-50 p-2 rounded-md text-sm">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium text-xs">{note.doctorName}</span>
                                    <span className="text-xs text-slate-500">{formatTimestamp(note.timestamp)}</span>
                                  </div>
                                  <p className="text-slate-700 line-clamp-2">{note.text}</p>
                                </div>
                              ))}
                              {consultation.doctorNotesArray.length > 2 && (
                                <div className="text-xs text-blue-600 mt-1">
                                  +{consultation.doctorNotesArray.length - 2} more notes
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Attachments indicator */}
                        {consultation.attachments && consultation.attachments.length > 0 && (
                          <div className="text-sm text-blue-600 flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {consultation.attachments.length} attachment
                            {consultation.attachments.length !== 1 ? "s" : ""}
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            {consultation.doctorName ? (
                              <span>Assigned to: {consultation.doctorName}</span>
                            ) : (
                              <span>Not assigned</span>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/dashboard/consult/${consultation.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
