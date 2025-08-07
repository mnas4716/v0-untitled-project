"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, FileText, Activity, User, Settings } from 'lucide-react'
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
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (!storedUser) {
        router.push("/auth/verify-otp")
        return
      }

      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        const userRequests = getConsultRequestsByEmail(parsedUser.email)
        setRequests(userRequests)
      } catch (error) {
        console.error("Error parsing user data:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [router])

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-AU")

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const renderRequestList = (requestList: any[]) => {
    if (requestList.length === 0) {
      return <div className="text-center py-8 text-slate-500"><p>No requests found.</p></div>
    }
    return requestList
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((request) => (
        <div key={request.id} className="border rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium capitalize">{request.type.replace("-", " ")}</h3>
                {request.status === "pending" ? (
                  <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                ) : request.status === "completed" ? (
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-1">Requested on {formatDate(request.createdAt)}</p>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href={`/dashboard/request/${request.id}`}>View Details</Link>
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-sm text-slate-600 line-clamp-2">{request.reason}</p>
          </div>
        </div>
      ))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader activePage="dashboard" />
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-slate-500">Welcome back, {user?.firstName || "User"}!</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader><CardTitle>Consultations</CardTitle></CardHeader>
              <CardContent>
                <Button asChild className="w-full"><Link href="/consult">Book Consultation</Link></Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Prescriptions</CardTitle></CardHeader>
              <CardContent>
                <Button asChild className="w-full"><Link href="/prescription/request">Request Prescription</Link></Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Medical Certificates</CardTitle></CardHeader>
              <CardContent>
                <Button asChild className="w-full"><Link href="/medical-certificate/request">Request Certificate</Link></Button>
              </CardContent>
            </Card>
          </div>
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
                <TabsContent value="all" className="space-y-4">{renderRequestList(requests)}</TabsContent>
                <TabsContent value="pending" className="space-y-4">{renderRequestList(requests.filter(r => r.status === 'pending'))}</TabsContent>
                <TabsContent value="completed" className="space-y-4">{renderRequestList(requests.filter(r => r.status === 'completed'))}</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
