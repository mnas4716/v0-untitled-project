"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getConsultRequestById, updateConsultRequest, markConsultRequestAsCompleted } from "@/lib/database-service"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConsultDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [doctor, setDoctor] = useState<any>(null)
  const [consultation, setConsultation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [doctorNotes, setDoctorNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

        // Get consultation details
        const consultationDetails = getConsultRequestById(params.id)
        if (!consultationDetails) {
          setError("Consultation not found")
        } else {
          setConsultation(consultationDetails)
          setDoctorNotes(consultationDetails.doctorNotes || "")
        }
      } catch (error) {
        console.error("Error loading consultation:", error)
        setError("Failed to load consultation details")
      } finally {
        setIsLoading(false)
      }
    }
  }, [params.id, router])

  const handleSaveNotes = async () => {
    if (!consultation) return

    setIsSaving(true)
    try {
      const updatedConsultation = updateConsultRequest(consultation.id, {
        doctorNotes,
      })

      if (updatedConsultation) {
        setConsultation(updatedConsultation)
        toast({
          title: "Notes Saved",
          description: "Your notes have been saved successfully.",
        })
      } else {
        throw new Error("Failed to save notes")
      }
    } catch (error) {
      console.error("Error saving notes:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save notes. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCompleteConsultation = async () => {
    if (!consultation) return

    if (consultation.status === "completed") {
      toast({
        title: "Already Completed",
        description: "This consultation has already been marked as completed.",
      })
      return
    }

    setIsCompleting(true)
    try {
      // First save any unsaved notes
      if (doctorNotes !== consultation.doctorNotes) {
        await handleSaveNotes()
      }

      // Mark as completed
      const completedConsultation = markConsultRequestAsCompleted(consultation.id)

      if (completedConsultation) {
        setConsultation(completedConsultation)
        toast({
          title: "Consultation Completed",
          description: "The consultation has been marked as completed.",
        })
      } else {
        throw new Error("Failed to complete consultation")
      }
    } catch (error) {
      console.error("Error completing consultation:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to complete consultation. Please try again.",
      })
    } finally {
      setIsCompleting(false)
    }
  }

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

  if (error || !consultation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error || "Consultation not found"}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button asChild>
            <Link href="/doctor/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/doctor/dashboard" className="text-blue-600 hover:underline">
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Consultation Details</h1>
          <div className="flex items-center gap-2 mt-2">
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
        </div>
        <div className="flex items-center gap-2">
          {consultation.status === "pending" && (
            <Button onClick={handleCompleteConsultation} disabled={isCompleting}>
              {isCompleting ? "Completing..." : "Mark as Completed"}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Details of the patient</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p>{consultation.patientName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{consultation.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p>{consultation.phone}</p>
              </div>
              {consultation.details?.dob && (
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p>{consultation.details.dob}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium">Request Date</p>
                <p>{formatDate(consultation.createdAt)}</p>
              </div>
              {consultation.status === "completed" && consultation.completedAt && (
                <div>
                  <p className="text-sm font-medium">Completed Date</p>
                  <p>{formatDate(consultation.completedAt)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>Information about the consultation request</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="notes">Doctor Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Reason for Consultation</h3>
                    <p className="text-slate-600 whitespace-pre-line">{consultation.reason}</p>
                  </div>

                  {consultation.type === "medical-certificate" && consultation.details && (
                    <div>
                      <h3 className="font-medium mb-2">Medical Certificate Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Start Date</p>
                          <p>{consultation.details.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">End Date</p>
                          <p>{consultation.details.endDate}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {consultation.type === "prescription" && consultation.details && (
                    <div>
                      <h3 className="font-medium mb-2">Prescription Details</h3>
                      <div>
                        <p className="text-sm font-medium">Medication</p>
                        <p>{consultation.details.medication}</p>
                      </div>
                      {consultation.details.deliveryOption && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Delivery Option</p>
                          <p className="capitalize">{consultation.details.deliveryOption}</p>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <Label htmlFor="doctorNotes">Doctor Notes (only visible to healthcare staff)</Label>
                    <Textarea
                      id="doctorNotes"
                      placeholder="Enter your notes about this consultation..."
                      className="min-h-[200px] mt-2"
                      value={doctorNotes}
                      onChange={(e) => setDoctorNotes(e.target.value)}
                      disabled={consultation.status !== "pending"}
                    />
                  </div>
                  {consultation.status === "pending" && (
                    <Button onClick={handleSaveNotes} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Notes"}
                    </Button>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href="/doctor/dashboard">Back to Dashboard</Link>
              </Button>
              {consultation.status === "pending" && (
                <Button onClick={handleCompleteConsultation} disabled={isCompleting}>
                  {isCompleting ? "Completing..." : "Mark as Completed"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
