"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TestEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    type: "consultation",
    includeConsultationData: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, includeConsultationData: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      // Sample consultation data
      const consultationData = formData.includeConsultationData
        ? {
            action: "Consultation",
            consultationType: "telehealth",
            firstName: formData.firstName,
            lastName: "Doe",
            email: formData.email,
            phone: "0412 345 678",
            dob: "1990-01-01",
            reason: "This is a test consultation request.",
            timestamp: new Date().toISOString(),
          }
        : null

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          type: formData.type,
          consultationData,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error sending test email:", error)
      setResult({ error: "Failed to send email" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Test Email Functionality</h1>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Send Test Email</CardTitle>
              <CardDescription>Use this form to test the email functionality</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter recipient email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter recipient name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email Type</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="consultation" id="consultation" />
                      <Label htmlFor="consultation" className="font-normal">
                        Consultation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medical-certificate" id="medical-certificate" />
                      <Label htmlFor="medical-certificate" className="font-normal">
                        Medical Certificate
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prescription" id="prescription" />
                      <Label htmlFor="prescription" className="font-normal">
                        Prescription
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="signup" id="signup" />
                      <Label htmlFor="signup" className="font-normal">
                        Sign Up
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="signin" id="signin" />
                      <Label htmlFor="signin" className="font-normal">
                        Sign In
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeConsultationData"
                    checked={formData.includeConsultationData}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="includeConsultationData" className="font-normal">
                    Include consultation data (forward to moe@freedoc.com.au)
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Test Email"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {result && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-100 p-4 rounded-md overflow-auto text-sm">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
