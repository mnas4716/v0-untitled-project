import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pill, Calendar, Download, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
// Import the DashboardHeader component
import { DashboardHeader } from "@/components/dashboard-header"

export default function PrescriptionsPage() {
  // Sample prescriptions data - in a real app, this would come from a database
  const prescriptions = [
    {
      id: "rx-001",
      medication: "Amoxicillin 500mg",
      date: "2023-05-12",
      doctor: "Dr. Sarah Johnson",
      status: "active",
      refills: 2,
      instructions: "Take one capsule three times daily with food.",
    },
    {
      id: "rx-002",
      medication: "Lisinopril 10mg",
      date: "2023-04-28",
      doctor: "Dr. Michael Chen",
      status: "active",
      refills: 5,
      instructions: "Take one tablet daily in the morning.",
    },
    {
      id: "rx-003",
      medication: "Ibuprofen 400mg",
      date: "2023-03-15",
      doctor: "Dr. Emily Wilson",
      status: "expired",
      refills: 0,
      instructions: "Take one tablet every 6 hours as needed for pain.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activePage="prescriptions" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Prescriptions</h1>
          <Link href="/prescription">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Pill className="h-4 w-4 mr-2" /> Request New Prescription
            </Button>
          </Link>
        </div>

        {prescriptions.length > 0 ? (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div
                    className={`w-full md:w-2 ${prescription.status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{prescription.medication}</h3>
                          <Badge
                            variant={prescription.status === "active" ? "default" : "secondary"}
                            className={prescription.status === "active" ? "bg-green-500" : ""}
                          >
                            {prescription.status === "active" ? "Active" : "Expired"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500 mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Prescribed: {prescription.date}</span>
                          </div>
                          <div className="flex items-center">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            <span>Refills: {prescription.refills}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">Doctor: {prescription.doctor}</p>
                        <p className="text-gray-600 text-sm">{prescription.instructions}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex gap-2">
                        <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                        {prescription.status === "active" && prescription.refills > 0 && (
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            Request Refill
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Pill className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No prescriptions yet</h3>
              <p className="text-gray-500 mb-6">You don't have any prescriptions.</p>
              <Link href="/prescription">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Request a Prescription</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
