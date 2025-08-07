"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the profile page
    router.replace("/dashboard/profile")
  }, [router])

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <p>Redirecting to profile page...</p>
      </div>
    </div>
  )
}
