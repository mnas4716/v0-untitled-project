"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, ArrowRight, FileText, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { requestMedicalCertificate } from "../../actions"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function MedicalCertificateRequestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    reason: "",
    startDate: "",
    endDate: "",
  })
  const [files, setFiles] = useState<FileList | null>(null)
  const [fileError, setFileError] = useState("")
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files

    if (selectedFiles && selectedFiles.length > 0) {
      // Check file size (limit to 5MB per file)
      const tooLarge = Array.from(selectedFiles).some((file) => file.size > 5 * 1024 * 1024)

      if (tooLarge) {
        setFileError("Files must be less than 5MB each")
        e.target.value = ""
        setFiles(null)
        return
      }

      setFiles(selectedFiles)
      setFileError("")
    } else {
      setFiles(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      // Add files if any
      if (files) {
        Array.from(files).forEach((file, index) => {
          formDataObj.append(`file-${index}`, file)
        })
        formDataObj.append("fileCount", files.length.toString())
      } else {
        formDataObj.append("fileCount", "0")
      }

      const result = await requestMedicalCertificate(formDataObj)

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl)
      } else {
        setSubmitError(result.message || "An error occurred during submission")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Submission failed:", error)
      setSubmitError("An unexpected error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader activePage="services" />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <Link
          href="/medical-certificate"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Medical Certificate Information
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Request a Medical Certificate</h1>
          <p className="text-slate-600 mb-8">Fill in the details below to request a medical certificate</p>

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{submitError}</div>
          )}

          <div className="mb-8">
            <div className="relative flex items-center justify-between">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step >= i ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step > i ? <CheckCircle className="h-5 w-5" /> : i}
                  </div>
                  <span className="text-sm text-slate-600">
                    {i === 1 ? "Details" : i === 2 ? "Reason" : i === 3 ? "Dates" : "Documents"}
                  </span>
                </div>
              ))}
              <div className="absolute h-1 bg-slate-200 left-0 right-0 top-5 -z-10"></div>
              <div
                className="absolute h-1 bg-blue-600 left-0 top-5 -z-10 transition-all duration-300"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Card className="border-0 shadow-md rounded-2xl mb-6 overflow-hidden transform transition-all hover:shadow-lg">
                <CardHeader className="bg-blue-50">
                  <CardTitle>Your Details</CardTitle>
                  <CardDescription>Please provide your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                        className="border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                        className="border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      className="border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors rounded-lg"
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50">
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-0 shadow-md rounded-2xl mb-6 overflow-hidden transform transition-all hover:shadow-lg">
                <CardHeader className="bg-blue-50">
                  <CardTitle>Reason for Certificate</CardTitle>
                  <CardDescription>Please describe why you need a medical certificate</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Describe your symptoms or reason for needing a medical certificate..."
                    className="min-h-[150px] border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors rounded-lg"
                    required
                  />
                </CardContent>
                <CardFooter className="flex justify-between bg-slate-50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-0 shadow-md rounded-2xl mb-6 overflow-hidden transform transition-all hover:shadow-lg">
                <CardHeader className="bg-blue-50">
                  <CardTitle>Certificate Period</CardTitle>
                  <CardDescription>Please specify the start and end dates for your certificate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="border-slate-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-slate-50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 4 && (
              <Card className="border-0 shadow-md rounded-2xl overflow-hidden transform transition-all hover:shadow-lg">
                <CardHeader className="bg-blue-50">
                  <CardTitle>Upload Documents</CardTitle>
                  <CardDescription>Attach any relevant medical documents or photos (optional)</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-600 mb-2">Drag and drop files here, or click to select files</p>
                      <p className="text-xs text-slate-500 mb-4">
                        Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 5MB per file)
                      </p>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Select Files
                      </Button>
                    </div>

                    {fileError && <p className="text-sm text-red-500">{fileError}</p>}

                    {files && files.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-700">Selected Files:</p>
                        <ul className="space-y-1">
                          {Array.from(files).map((file, index) => (
                            <li key={index} className="text-sm text-slate-600 flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-blue-500" />
                              {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-slate-50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}{" "}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
