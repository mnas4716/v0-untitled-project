"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { getConsultRequestById, cancelConsultRequest } from "@/lib/database-service"
import { SiteFooter } from "@/components/site-footer"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RequestDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [request, setRequest] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [cancelConfirm, setCancelConfirm] = useState(false)

  useEffect(() => {
    // Get user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (!storedUser) {
        router.push("/auth/verify-otp")
        return
      }

      try {
        // Get request details
        const requestDetails = getConsultRequestById(params.id)
        if (!requestDetails) {
          setError("Request not found")
        } else {
          setRequest(requestDetails)
        }
      } catch (error) {
        console.error("Error fetching request details:", error)
        setError("Failed to load request details")
      } finally {
        setIsLoading(false)
      }
    }
  }, [router, params.id])

  const handleCancelRequest = () => {
    if (cancelConfirm) {
      try {
        const result = cancelConsultRequest(params.id, "Cancelled by user")
        if (result) {
          setRequest({ ...request, status: "cancelled", cancelledAt: new Date().toISOString() })
          setCancelConfirm(false)
        } else {
          setError("Failed to cancel request")
        }
      } catch (error) {
        console.error("Error cancelling request:", error)
        setError("Failed to cancel request")
      }
    } else {
      setCancelConfirm(true)
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

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader activePage="dashboard" />
        <main className="flex-1 bg-slate-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <Card>
              <CardContent className="pt-6">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader activePage="dashboard" />
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {request.type === "consultation"
                      ? "Consultation Request"
                      : request.type === "prescription"
                        ? "Prescription Request"
                        : "Medical Certificate Request"}
                  </CardTitle>
                  <CardDescription>Request ID: {request.id}</CardDescription>
                </div>
                <div>
                  {request.status === "pending" ? (
                    <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                  ) : request.status === "completed" ? (
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Request Date</h3>
                  <p>{formatDate(request.createdAt)}</p>
                </div>
                {request.status === "completed" && request.completedAt && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Completed Date</h3>
                    <p>{formatDate(request.completedAt)}</p>
                  </div>
                )}
                {request.status === "cancelled" && request.cancelledAt && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Cancelled Date</h3>
                    <p>{formatDate(request.cancelledAt)}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-500">Reason</h3>
                <p className="mt-1">{request.reason}</p>
              </div>

              {request.type === "medical-certificate" && request.details?.startDate && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Start Date</h3>
                    <p>{request.details.startDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">End Date</h3>
                    <p>{request.details.endDate}</p>
                  </div>
                </div>
              )}

              {request.type === "prescription" && request.details?.medication && (
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Medication</h3>
                  <p>{request.details.medication}</p>
                  {request.details.deliveryOption && (
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-slate-500">Delivery Option</h3>
                      <p className="capitalize">{request.details.deliveryOption}</p>
                    </div>
                  )}
                </div>
              )}

              {request.doctorNotes && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800">Doctor Notes</h3>
                  <p className="mt-1 text-blue-700">{request.doctorNotes}</p>
                </div>
              )}

              {request.status === "completed" && request.type === "medical-certificate" && (
                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-green-800">Medical Certificate</h3>
                  <p className="mt-1 text-green-700">
                    Your medical certificate has been issued. You can download it below.
                  </p>
                  <Button className="mt-2" variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                </div>
              )}

              {request.status === "completed" && request.type === "prescription" && (
                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-green-800">Prescription</h3>
                  <p className="mt-1 text-green-700">Your prescription has been issued. You can download it below.</p>
                  <Button className="mt-2" variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Prescription
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                {request.status === "pending" && (
                  <Button variant="destructive" onClick={handleCancelRequest}>
                    {cancelConfirm ? "Confirm Cancellation" : "Cancel Request"}
                  </Button>
                )}
              </div>
              <Button asChild variant="outline">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
