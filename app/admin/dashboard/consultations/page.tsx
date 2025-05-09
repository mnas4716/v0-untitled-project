"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cancelConsultRequest } from "@/lib/database-service"
import { FileText, Calendar, Clock, Info, X } from "lucide-react"
import Link from "next/link"

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
  details: any
  doctorNotes?: string
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchConsultations = () => {
      try {
        // Get consultations from localStorage
        const storedConsultations = localStorage.getItem("consultations")
        if (storedConsultations) {
          const parsedConsultations = JSON.parse(storedConsultations)
          setConsultations(parsedConsultations)
        } else {
          setConsultations([])
        }
      } catch (error) {
        console.error("Error fetching consultations:", error)
        setConsultations([])
      }
    }

    fetchConsultations()
    // Set up an interval to check for new consultations every 30 seconds
    const intervalId = setInterval(fetchConsultations, 30000)

    return () => clearInterval(intervalId)
  }, [])

  const handleCancelConsultation = (id: string) => {
    // Confirm before cancelling
    if (!window.confirm("Are you sure you want to cancel this consultation?")) {
      return
    }

    try {
      // Cancel the consultation in the database
      const result = cancelConsultRequest(id, "Cancelled by admin")

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

  const pendingConsultations = consultations.filter((c) => c.status === "pending")
  const completedConsultations = consultations.filter((c) => c.status === "completed")
  const cancelledConsultations = consultations.filter((c) => c.status === "cancelled")

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "consultation":
        return <Badge className="bg-blue-500">Consultation</Badge>
      case "medical-certificate":
        return <Badge className="bg-green-500">Medical Certificate</Badge>
      case "prescription":
        return <Badge className="bg-purple-500">Prescription</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Consultation Requests</h2>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Requests ({consultations.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingConsultations.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedConsultations.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledConsultations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {consultations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No consultation requests found.</p>
              </CardContent>
            </Card>
          ) : (
            consultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onCancelConsultation={handleCancelConsultation}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingConsultations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No pending consultation requests.</p>
              </CardContent>
            </Card>
          ) : (
            pendingConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onCancelConsultation={handleCancelConsultation}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedConsultations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No completed consultation requests.</p>
              </CardContent>
            </Card>
          ) : (
            completedConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onCancelConsultation={handleCancelConsultation}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledConsultations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No cancelled consultation requests.</p>
              </CardContent>
            </Card>
          ) : (
            cancelledConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onCancelConsultation={handleCancelConsultation}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ConsultationCard({
  consultation,
  onCancelConsultation,
}: {
  consultation: Consultation
  onCancelConsultation: (id: string) => void
}) {
  const formattedDate = new Date(consultation.createdAt).toLocaleString()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="default" className="bg-amber-500">
            Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "consultation":
        return <Badge className="bg-blue-500">Consultation</Badge>
      case "medical-certificate":
        return <Badge className="bg-green-500">Medical Certificate</Badge>
      case "prescription":
        return <Badge className="bg-purple-500">Prescription</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{consultation.patientName}</CardTitle>
            <CardDescription>
              {consultation.email} • {consultation.phone}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(consultation.status)}
            {getTypeLabel(consultation.type)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-slate-500" />
              <p className="text-sm font-medium">Requested Date</p>
              <p className="text-sm text-muted-foreground ml-2">{consultation.date}</p>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-slate-500" />
              <p className="text-sm font-medium">Requested Time</p>
              <p className="text-sm text-muted-foreground ml-2">{consultation.time}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Reason for Request</p>
            <p className="text-sm text-muted-foreground">{consultation.reason}</p>
          </div>

          {consultation.type === "medical-certificate" && consultation.details?.startDate && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium">Certificate Start Date</p>
                <p className="text-sm text-muted-foreground">{consultation.details.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Certificate End Date</p>
                <p className="text-sm text-muted-foreground">{consultation.details.endDate}</p>
              </div>
            </div>
          )}

          {consultation.type === "prescription" && consultation.details?.medication && (
            <div className="mt-2">
              <p className="text-sm font-medium">Medication</p>
              <p className="text-sm text-muted-foreground">{consultation.details.medication}</p>
              <div className="mt-1">
                <p className="text-sm font-medium">Delivery Option</p>
                <p className="text-sm text-muted-foreground capitalize">{consultation.details.deliveryOption}</p>
              </div>
            </div>
          )}

          {consultation.details?.files && (
            <div className="mt-2 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-blue-500" />
              <p className="text-sm text-blue-600">Has attached documents</p>
            </div>
          )}

          {consultation.doctorNotes && consultation.status === "completed" && (
            <div className="mt-2 p-2 bg-blue-50 rounded-md">
              <p className="text-sm font-medium text-blue-800">Doctor Notes:</p>
              <p className="text-sm text-blue-700">{consultation.doctorNotes}</p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium">Submitted</p>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            {consultation.status === "pending" && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => onCancelConsultation(consultation.id)}
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
      </CardContent>
    </Card>
  )
}
