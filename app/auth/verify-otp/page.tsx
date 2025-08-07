"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { requestOTP, verifyOTP } from "@/app/actions"
import { authenticateUser } from "@/lib/auth-utils"

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [devOtp, setDevOtp] = useState("")

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await requestOTP(email)

    if (result.success) {
      setStep(2)
      if (result.otp) {
        setDevOtp(result.otp)
      }
    } else {
      setError(result.message || "Failed to send OTP. Please try again.")
    }
    setIsLoading(false)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await verifyOTP(email, otp)

    if (result.success) {
      await authenticateUser(email)
      router.push("/dashboard")
    } else {
      setError(result.message || "Invalid OTP. Please try again.")
      setIsLoading(false)
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
                  : `Enter the verification code sent to ${email}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {step === 2 && devOtp && (
                <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                  <AlertDescription className="text-yellow-800">
                    <strong>Development Mode:</strong> Your OTP is{" "}
                    <code className="bg-yellow-100 px-1 rounded">{devOtp}</code>
                  </AlertDescription>
                </Alert>
              )}
              {step === 1 ? (
                <form onSubmit={handleRequestOTP} className="space-y-4">
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
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify and Continue"}
                  </Button>
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-slate-500 hover:text-slate-700"
                      onClick={() => {
                        setStep(1)
                        setError("")
                        setOtp("")
                      }}
                    >
                      Use a different email
                    </Button>
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
