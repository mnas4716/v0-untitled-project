"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Menu, X } from "lucide-react"

interface SiteHeaderProps {
  activePage?: "home" | "medical-certificate" | "prescription" | "telehealth" | "mental-health" | "how-it-works"
}

// Update the SiteHeader component to include the UserNav
export function SiteHeader({ activePage }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/consult">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">Consult Now</Button>
            </Link>
            <button
              className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 mt-1">
          <Link
            href="/medical-certificate"
            className={`text-slate-700 hover:text-blue-600 font-medium transition-colors ${
              activePage === "medical-certificate" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
            }`}
          >
            Medical Certificate
          </Link>
          <Link
            href="/prescription"
            className={`text-slate-700 hover:text-blue-600 font-medium transition-colors ${
              activePage === "prescription" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
            }`}
          >
            Online Prescription
          </Link>
          <Link
            href="/mental-health"
            className={`text-slate-700 hover:text-blue-600 font-medium transition-colors ${
              activePage === "mental-health" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
            }`}
          >
            Mental Health
          </Link>
          <Link
            href="/telehealth"
            className={`text-slate-700 hover:text-blue-600 font-medium transition-colors ${
              activePage === "telehealth" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
            }`}
          >
            Telehealth
          </Link>
          <Link
            href="/how-it-works"
            className={`text-slate-700 hover:text-blue-600 font-medium transition-colors ${
              activePage === "how-it-works" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : ""
            }`}
          >
            How It Works
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-3 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/medical-certificate"
                className={`text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 ${
                  activePage === "medical-certificate" ? "text-blue-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Medical Certificate
              </Link>
              <Link
                href="/prescription"
                className={`text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 ${
                  activePage === "prescription" ? "text-blue-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Online Prescription
              </Link>
              <Link
                href="/mental-health"
                className={`text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 ${
                  activePage === "mental-health" ? "text-blue-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Mental Health
              </Link>
              <Link
                href="/telehealth"
                className={`text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 ${
                  activePage === "telehealth" ? "text-blue-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Telehealth
              </Link>
              <Link
                href="/how-it-works"
                className={`text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 ${
                  activePage === "how-it-works" ? "text-blue-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/auth/signin"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
