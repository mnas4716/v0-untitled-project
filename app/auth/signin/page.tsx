"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Logo } from "@/components/logo"
import { setUserInStorage } from "@/lib/client-auth"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"email" | "otp">("email")
  const [error, setError] = useState<string | null>(null)
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null)

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStep("otp")
        // For development, show the OTP
        if (data.otp) {
          setGeneratedOtp(data.otp)
        }
      } else {
        setError(data.message || "Failed to send OTP. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // For development, accept any 6-digit OTP
      if (process.env.NODE_ENV !== "production" && /^\d{6}$/.test(otp)) {
        // Create a mock user
        const user = {
          id: "user_" + Date.now(),
          email,
          firstName: email.split("@")[0],
          lastName: "",
        }

        // Store user in localStorage
        setUserInStorage(user)

        // Redirect to dashboard
        router.push("/dashboard")
        return
      }

      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (data.success) {
        // Store user in localStorage
        setUserInStorage(data.user)

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError(data.message || "Invalid OTP. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // For development, auto-fill OTP if available
  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setOtp(generatedOtp)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activePage="signin" />
      <main className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Logo className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              {step === "email"
                ? "Enter your email to receive a one-time password"
                : "Enter the 6-digit code sent to your email"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">{error}</div>}

            {step === "email" ? (
              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Code"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="otp">One-Time Password</Label>
                    {generatedOtp && (
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
                    type="text"
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                    className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Sign In"}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Back to Email
                  </button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
