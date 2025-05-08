import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FreeDoc - Online Doctor Consultations",
  description:
    "Get online doctor consultations, prescriptions, and medical certificates from the comfort of your home.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // We're using localStorage-based authentication, not NextAuth.js
  // No SessionProvider is needed
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
