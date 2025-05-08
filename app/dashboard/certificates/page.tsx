import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
// Import the DashboardHeader component
import { DashboardHeader } from "@/components/dashboard-header"

export default function CertificatesPage() {
  // Sample certificates data - in a real app, this would come from a database
  const certificates = [
    {
      id: "cert-001",
      type: "Medical Certificate",
      reason: "Acute respiratory infection",
      startDate: "2023-05-10",
      endDate: "2023-05-12",
      doctor: "Dr. Sarah Johnson",
      status: "active",
    },
    {
      id: "cert-002",
      type: "Medical Certificate",
      reason: "Lower back pain",
      startDate: "2023-04-15",
      endDate: "2023-04-20",
      doctor: "Dr. Michael Chen",
      status: "expired",
    },
    {
      id: "cert-003",
      type: "Fitness Certificate",
      reason: "Annual health check",
      startDate: "2023-03-22",
      endDate: "2024-03-22",
      doctor: "Dr. Emily Wilson",
      status: "active",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activePage="certificates" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Medical Certificates</h1>
          <Link href="/medical-certificate">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <FileText className="h-4 w-4 mr-2" /> Request New Certificate
            </Button>
          </Link>
        </div>

        {certificates.length > 0 ? (
          <div className="space-y-4">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div
                    className={`w-full md:w-2 ${certificate.status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{certificate.type}</h3>
                          <Badge
                            variant={certificate.status === "active" ? "default" : "secondary"}
                            className={certificate.status === "active" ? "bg-green-500" : ""}
                          >
                            {certificate.status === "active" ? "Active" : "Expired"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500 mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {certificate.startDate} to {certificate.endDate}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">Doctor: {certificate.doctor}</p>
                        <p className="text-gray-600 text-sm">Reason: {certificate.reason}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex gap-2">
                        <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                        {certificate.status === "expired" && (
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            Request Renewal
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
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No certificates yet</h3>
              <p className="text-gray-500 mb-6">You don't have any medical certificates.</p>
              <Link href="/medical-certificate">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Request a Certificate</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
