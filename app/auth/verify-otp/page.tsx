"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authenticateUser } from "@/lib/auth-utils"
import { getConsultRequestsByEmail } from "@/lib/database-service"

export default function VerifyOTPPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState("")
  const [sentOtp, setSentOtp] = useState("")

  // Check if email is in URL params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const emailParam = params.get("email")
      if (emailParam) {
        setEmail(emailParam)
      }
    }
  }, [])

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Check if user has any consultation requests
      const consultRequests = getConsultRequestsByEmail(email)
      if (!consultRequests || consultRequests.length === 0) {
        setError("This email is not registered. Please submit a consultation request first.")
        setIsLoading(false)
        return
      }

      // Generate a random 6-digit OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(newOtp)
      setSentOtp(newOtp)

      // In a real app, we would send the OTP via email
      // For demo purposes, we'll just log it to the console
      console.log(`OTP for ${email}: ${newOtp}`)

      // Move to OTP verification step
      setStep(2)
    } catch (error) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Verify OTP
      if (otp === generatedOtp || otp === "123456") {
        // Use the shared authentication function
        const result = await authenticateUser(email)

        if (!result.success) {
          setError(result.message || "Authentication failed. Please try again.")
          setIsLoading(false)
          return
        }

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError("Invalid OTP. Please try again.")
      }
    } catch (error) {
      setError("An error occurred during verification. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // For development, auto-fill OTP if available
  const handleAutoFillOtp = () => {
    if (sentOtp) {
      setOtp(sentOtp)
    } else {
      setOtp("123456") // Default test OTP
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center bg-slate-50 py-12">
        <div className="container max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-2">
                <Logo className="h-12 w-12" />
              </div>
              <CardTitle className="text-2xl font-bold">Verify Your Identity</CardTitle>
              <CardDescription>
                {step === 1
                  ? "Enter your email to receive a verification code"
                  : "Enter the verification code sent to your email"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>
                    {error}
                    {error.includes("not registered") && (
                      <div className="mt-2">
                        <Link href="/consult" className="text-white underline">
                          Submit a consultation request
                        </Link>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Development helper - show the OTP */}
              {step === 2 && process.env.NODE_ENV !== "production" && (
                <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                  <AlertDescription className="text-yellow-800">
                    <strong>Development Mode:</strong> Your OTP is{" "}
                    <code className="bg-yellow-100 px-1 rounded">{sentOtp}</code> or use{" "}
                    <code className="bg-yellow-100 px-1 rounded">123456</code>
                  </AlertDescription>
                </Alert>
              )}

              {step === 1 ? (
                <form onSubmit={handleRequestOTP}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send Verification Code"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="otp">Verification Code</Label>
                        {process.env.NODE_ENV !== "production" && (
                          <button
                            type="button"
                            onClick={handleAutoFillOtp}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Auto-fill (Dev Only)
                          </button>
                        )}
                      </div>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify and Continue"}
                    </Button>
                    <div className="text-center">
                      <Button
                        variant="link"
                        className="text-sm text-slate-500 hover:text-slate-700"
                        onClick={() => setStep(1)}
                      >
                        Back to email
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-slate-500">
                Don't have an account yet?{" "}
                <Link href="/consult" className="text-blue-600 hover:text-blue-800">
                  Submit a consultation request
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
