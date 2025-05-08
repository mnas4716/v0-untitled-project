"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Calendar, User, FileText, Settings, Home, LogOut } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { Logo } from "@/components/logo"

const navItems = [
  { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/dashboard" },
  { name: "Appointments", icon: <Calendar className="w-5 h-5" />, path: "/dashboard/appointments" },
  { name: "Profile", icon: <User className="w-5 h-5" />, path: "/dashboard/profile" },
  { name: "Certificates", icon: <FileText className="w-5 h-5" />, path: "/dashboard/certificates" },
  { name: "Prescriptions", icon: <FileText className="w-5 h-5" />, path: "/dashboard/prescriptions" },
  { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/dashboard/settings" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      if (typeof window === "undefined") return false

      const storedUser = localStorage.getItem("user")
      if (!storedUser) {
        router.push("/auth/signin")
        return false
      }

      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        return true
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
        router.push("/auth/signin")
        return false
      }
    }

    const authStatus = checkAuth()
    setIsAuthenticated(authStatus)
    setIsLoading(false)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    router.push("/auth/signin")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex md:flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">FreeDoc</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md transition ${
                    pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 px-4 py-2 rounded-md hover:bg-slate-100 w-full transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <DashboardHeader user={user} onSignOut={handleSignOut} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
