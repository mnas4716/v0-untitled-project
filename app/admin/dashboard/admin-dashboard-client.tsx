"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Stethoscope, FileText, CheckCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { updateRequestStatus } from "@/app/actions"

export default function AdminDashboardClient({ user, requests }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("active")
  const [isUpdating, setIsUpdating] = useState(false)

  // Filter requests based on status and search term
  const activeRequests = useMemo(() => {
    return requests
      .filter((req) => req.status === "pending")
      .filter(
        (req) =>
          searchTerm === "" ||
          req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.reason.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }, [requests, searchTerm])

  const completedRequests = useMemo(() => {
    return requests
      .filter((req) => req.status === "completed")
      .filter(
        (req) =>
          searchTerm === "" ||
          req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.reason.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }, [requests, searchTerm])

  // Handle marking a request as completed
  const handleMarkAsCompleted = async (requestId) => {
    setIsUpdating(true)
    try {
      const result = await updateRequestStatus(requestId, "completed")
      if (!result.success) {
        console.error("Failed to update status:", result.message)
      }
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  // Get request type badge
  const getRequestTypeBadge = (type) => {
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

  // Calculate stats
  const totalRequests = requests.length
  const pendingCount = activeRequests.length
  const completedCount = completedRequests.length
  const completionRate = totalRequests > 0 ? Math.round((completedCount / totalRequests) * 100) : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500">Welcome back, {user?.name || "Admin"}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-slate-500">All time consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Consultations</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-slate-500">Pending consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Stethoscope className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
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
              {activeRequests.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No active consultation requests</div>
              ) : (
                <div className="space-y-6">
                  {activeRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{request.patientName}</h3>
                            {getRequestTypeBadge(request.type)}
                          </div>
                          <p className="text-sm text-slate-500">{request.email}</p>
                          <p className="text-sm text-slate-500">{request.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {request.date} at {request.time}
                          </p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Reason:</span> {request.reason}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Received: {new Date(request.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsCompleted(request.id)}
                          disabled={isUpdating}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Completed
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
              {completedRequests.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No completed consultations</div>
              ) : (
                <div className="space-y-6">
                  {completedRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{request.patientName}</h3>
                            {getRequestTypeBadge(request.type)}
                          </div>
                          <p className="text-sm text-slate-500">{request.email}</p>
                          <p className="text-sm text-slate-500">{request.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {request.date} at {request.time}
                          </p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Reason:</span> {request.reason}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Completed: {request.completedAt ? new Date(request.completedAt).toLocaleString() : "Unknown"}
                        </p>
                        {request.doctorNotes && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-md">
                            <p className="text-sm font-medium text-blue-800">Doctor Notes:</p>
                            <p className="text-sm text-blue-700">{request.doctorNotes}</p>
                          </div>
                        )}
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
              {requests.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No consultations found</div>
              ) : (
                <div className="space-y-6">
                  {requests
                    .filter(
                      (req) =>
                        searchTerm === "" ||
                        req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        req.reason.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{request.patientName}</h3>
                              {getRequestTypeBadge(request.type)}
                            </div>
                            <p className="text-sm text-slate-500">{request.email}</p>
                            <p className="text-sm text-slate-500">{request.phone}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {request.date} at {request.time}
                            </p>
                            <span
                              className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                                request.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : request.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-slate-600">
                            <span className="font-medium">Reason:</span> {request.reason}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Received: {new Date(request.createdAt).toLocaleString()}
                          </p>
                          {request.completedAt && (
                            <p className="text-xs text-slate-400 mt-1">
                              Completed: {new Date(request.completedAt).toLocaleString()}
                            </p>
                          )}
                          {request.doctorNotes && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-md">
                              <p className="text-sm font-medium text-blue-800">Doctor Notes:</p>
                              <p className="text-sm text-blue-700">{request.doctorNotes}</p>
                            </div>
                          )}
                        </div>
                        {request.status === "pending" && (
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsCompleted(request.id)}
                              disabled={isUpdating}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </Button>
                          </div>
                        )}
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
