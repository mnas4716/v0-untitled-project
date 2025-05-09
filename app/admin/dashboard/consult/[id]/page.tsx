"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getConsultRequestById, updateConsultRequest, cancelConsultRequest } from "@/lib/database-service"

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
  cancelReason?: string
  notes?: string
  doctorNotes?: string
  details?: any
}

export default function AdminConsultPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [doctorNotes, setDoctorNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load consultation data
  useEffect(() => {
    const loadConsultation = async () => {
      setIsLoading(true)
      try {
        const consultRequest = getConsultRequestById(id as string)

        if (consultRequest) {
          setConsultation(consultRequest)
          setDoctorNotes(consultRequest.doctorNotes || "")
        } else {
          router.push("/admin/dashboard")
        }
      } catch (error) {
        console.error("Error loading consultation:", error)
        router.push("/admin/dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    loadConsultation()
  }, [id, router])

  // Save doctor notes
  const saveDoctorNotes = useCallback(async () => {
    if (!consultation) return

    setIsSaving(true)
    setSaveSuccess(false)

    try {
      // Update the consultation with doctor notes
      const result = await updateConsultRequest(consultation.id, { doctorNotes })

      if (result) {
        // Update local state
        setConsultation({ ...consultation, doctorNotes })
        setSaveSuccess(true)

        // Reset success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Error saving doctor notes:", error)
      alert("Failed to save doctor notes")
    } finally {
      setIsSaving(false)
    }
  }, [consultation, doctorNotes])

  // Handle cancelling a consultation
  const handleCancelConsultation = useCallback(() => {
    if (!consultation) return

    // Confirm before cancelling
    if (!window.confirm("Are you sure you want to cancel this consultation?")) {
      return
    }

    try {
      // Cancel the consultation in the database
      const result = cancelConsultRequest(consultation.id, "Cancelled by admin")

      if (result) {
        // Update local state
        setConsultation({
          ...consultation,
          status: "cancelled",
          cancelledAt: new Date().toISOString(),
          cancelReason: "Cancelled by admin",
        })
      }
    } catch (error) {
      console.error("Error cancelling consultation:", error)
      alert("Failed to cancel consultation")
    }
  }, [consultation])

  // Get consultation type badge
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading consultation...</p>
      </div>
    )
  }

  if (!consultation) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500">Consultation not found</p>
        <Button className="mt-4" onClick={() => router.push("/admin/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/admin/dashboard")} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        {consultation.status === "pending" && (
          <Button variant="destructive" onClick={handleCancelConsultation}>
            Cancel Consultation
          </Button>
        )}
      </div>

      {consultation.status === "cancelled" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p className="font-medium">This consultation has been cancelled</p>
          {consultation.cancelReason && <p className="text-sm mt-1">Reason: {consultation.cancelReason}</p>}
          {consultation.cancelledAt && (
            <p className="text-sm mt-1">Cancelled on: {new Date(consultation.cancelledAt).toLocaleString()}</p>
          )}
        </div>
      )}

      {consultation.status === "completed" && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
          <p className="font-medium">This consultation has been completed</p>
          {consultation.completedAt && (
            <p className="text-sm mt-1">Completed on: {new Date(consultation.completedAt).toLocaleString()}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Information */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{consultation.patientName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{consultation.patientName}</h3>
                {getConsultationTypeBadge(consultation.type)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Email:</span>
                <span>{consultation.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Phone:</span>
                <span>{consultation.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Date Requested:</span>
                <span>{new Date(consultation.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Appointment:</span>
                <span>
                  {consultation.date} at {consultation.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Status:</span>
                <span
                  className={`font-medium ${
                    consultation.status === "pending"
                      ? "text-amber-600"
                      : consultation.status === "completed"
                        ? "text-green-600"
                        : "text-red-600"
                  }`}
                >
                  {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="font-medium">Reason for Consultation</h4>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-md">{consultation.reason}</p>
            </div>

            {consultation.type === "medical-certificate" && consultation.details?.startDate && (
              <div className="pt-2 space-y-2">
                <h4 className="font-medium">Certificate Details</h4>
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-slate-500">Start Date:</p>
                      <p>{consultation.details.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">End Date:</p>
                      <p>{consultation.details.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {consultation.type === "prescription" && consultation.details?.medication && (
              <div className="pt-2 space-y-2">
                <h4 className="font-medium">Prescription Details</h4>
                <div className="bg-slate-50 p-3 rounded-md">
                  <p className="text-sm text-slate-500">Medication:</p>
                  <p>{consultation.details.medication}</p>
                  <p className="text-sm text-slate-500 mt-2">Delivery Option:</p>
                  <p className="capitalize">{consultation.details.deliveryOption}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Consultation Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Consultation Details</CardTitle>
            <CardDescription>View and manage consultation information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="doctor-notes">
              <TabsList className="mb-4">
                <TabsTrigger value="doctor-notes">Doctor Notes</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="doctor-notes" className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> These notes are for internal use only and will never be visible to patients.
                  </p>
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter confidential notes about this patient or consultation..."
                    className="min-h-[200px]"
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                  />
                </div>

                <div className="flex justify-end items-center gap-4">
                  {saveSuccess && <p className="text-sm text-green-600">Notes saved successfully!</p>}
                  <Button onClick={saveDoctorNotes} disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Doctor Notes"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <div className="space-y-4">
                  <div className="border-l-2 border-slate-200 pl-4 ml-4 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="font-medium">Consultation Created</p>
                        <p className="text-sm text-slate-500">{new Date(consultation.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    {consultation.status === "completed" && consultation.completedAt && (
                      <div className="relative">
                        <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">Consultation Completed</p>
                          <p className="text-sm text-slate-500">
                            {new Date(consultation.completedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {consultation.status === "cancelled" && consultation.cancelledAt && (
                      <div className="relative">
                        <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-red-500"></div>
                        <div>
                          <p className="font-medium">Consultation Cancelled</p>
                          <p className="text-sm text-slate-500">
                            {new Date(consultation.cancelledAt).toLocaleString()}
                          </p>
                          {consultation.cancelReason && (
                            <p className="text-sm text-slate-600 mt-1">Reason: {consultation.cancelReason}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
