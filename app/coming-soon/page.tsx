"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ComingSoonPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main page
    router.replace("/")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting to main page...</p>
      </div>
    </div>
  )
}
