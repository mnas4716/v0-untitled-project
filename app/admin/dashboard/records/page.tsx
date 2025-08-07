"use client"

import { useState } from "react"
import { Search, Filter, Download, FileText, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock medical records data
const records = [
  {
    id: "R1001",
    patientId: "P1001",
    patientName: "James Smith",
    type: "Consultation",
    date: "2023-05-10",
    doctor: "Dr. Johnson",
    description: "Regular checkup for hypertension management",
    status: "completed",
    notes:
      "Blood pressure: 130/85. Patient reports feeling well. Medication is effective. Continue current treatment plan.",
    attachments: ["Blood Test Results", "Prescription"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "R1002",
    patientId: "P1002",
    patientName: "Sarah Williams",
    type: "Lab Test",
    date: "2023-05-05",
    doctor: "Dr. Miller",
    description: "Annual blood work",
    status: "completed",
    notes: "All results within normal range. Slight elevation in cholesterol (205 mg/dL). Recommended dietary changes.",
    attachments: ["Lab Results"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "R1003",
    patientId: "P1003",
    patientName: "Michael Brown",
    type: "Prescription",
    date: "2023-04-28",
    doctor: "Dr. Johnson",
    description: "Arthritis medication renewal",
    status: "completed",
    notes: "Renewed prescription for Meloxicam 15mg daily for 90 days. Patient reports good pain control.",
    attachments: ["Prescription"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "R1004",
    patientId: "P1004",
    patientName: "Emily Davis",
    type: "Consultation",
    date: "2023-05-12",
    doctor: "Dr. Wilson",
    description: "New patient initial consultation",
    status: "pending",
    notes: "Waiting for patient history forms to be completed.",
    attachments: [],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "R1005",
    patientId: "P1005",
    patientName: "Robert Jones",
    type: "Procedure",
    date: "2023-03-15",
    doctor: "Dr. Miller",
    description: "ECG and stress test",
    status: "completed",
    notes: "ECG shows normal sinus rhythm. Stress test negative for ischemia. Recommended continued exercise program.",
    attachments: ["ECG Results", "Stress Test Report"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "R1006",
    patientId: "P1006",
    patientName: "Jennifer Garcia",
    type: "Imaging",
    date: "2023-04-22",
    doctor: "Dr. Wilson",
    description: "Chest X-ray",
    status: "completed",
    notes: "No acute findings. Lungs clear. Heart size normal.",
    attachments: ["X-ray Images", "Radiology Report"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "R1007",
    patientId: "P1007",
    patientName: "David Martinez",
    type: "Consultation",
    date: "2023-05-08",
    doctor: "Dr. Johnson",
    description: "Mental health follow-up",
    status: "completed",
    notes:
      "Patient reports improved mood with current medication. Sleep has improved. Continue current treatment plan.",
    attachments: ["Prescription", "Mental Health Assessment"],
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function RecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<(typeof records)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Filter records based on search term and type
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || record.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesType
  })

  const handleViewRecord = (record: (typeof records)[0]) => {
    setSelectedRecord(record)
    setIsViewDialogOpen(true)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#00473e]">Medical Records</h1>
          <p className="text-[#007d73]">Access and manage patient medical records</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export Records
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search records..."
                  className="pl-9 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Records</SelectItem>
                  <SelectItem value="consultation">Consultations</SelectItem>
                  <SelectItem value="lab test">Lab Tests</SelectItem>
                  <SelectItem value="prescription">Prescriptions</SelectItem>
                  <SelectItem value="procedure">Procedures</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={record.avatar || "/placeholder.svg"} alt={record.patientName} />
                            <AvatarFallback>{record.patientName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{record.patientName}</div>
                            <div className="text-xs text-gray-500">{record.patientId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{record.description}</TableCell>
                      <TableCell>
                        {record.status === "completed" ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewRecord(record)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Record</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuItem>Print Record</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete Record</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {filteredRecords.length} of {records.length} records
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Record Details Dialog */}
      {selectedRecord && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Medical Record Details</DialogTitle>
              <DialogDescription>Record ID: {selectedRecord.id}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={selectedRecord.avatar || "/placeholder.svg"} alt={selectedRecord.patientName} />
                    <AvatarFallback>{selectedRecord.patientName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedRecord.patientName}</h3>
                    <p className="text-sm text-gray-500">{selectedRecord.patientId}</p>
                  </div>
                </div>

                <Badge
                  className={
                    selectedRecord.status === "completed"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }
                >
                  {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Record Type</p>
                  <p className="font-medium">{selectedRecord.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">{selectedRecord.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{selectedRecord.description}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <div className="p-3 bg-gray-50 rounded-md">
                  <p>{selectedRecord.notes}</p>
                </div>
              </div>

              {selectedRecord.attachments.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Attachments</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecord.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button className="bg-[#00473e] hover:bg-[#00695f]">Download PDF</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
