"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"

interface DashboardHeaderProps {
  activePage?: string
}

export function DashboardHeader({ activePage }: DashboardHeaderProps) {
  const router = useRouter()
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/dashboard/appointments" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Certificates", path: "/dashboard/certificates" },
    { name: "Prescriptions", path: "/dashboard/prescriptions" },
  ]

  const handleSignOut = () => {
    // Clear user data from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("admin")
    }
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
                <Logo className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">FreeDoc</span>
              </div>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-md transition ${
                        activePage === item.name.toLowerCase()
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
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
                <span>Sign Out</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 flex justify-center md:justify-start">
          <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
            <Logo className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold hidden md:inline">FreeDoc</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                activePage === item.name.toLowerCase()
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto">
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
