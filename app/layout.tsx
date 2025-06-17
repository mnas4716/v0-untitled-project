import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css" // Standard path for globals.css in Next.js App Router
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Freedoc.",
  description:
    "Australia's first truly free online doctor service. Get prescriptions, medical certificates, mental health support, and telehealth consultations online.",,
  // Next.js will automatically pick up icon.svg from the app directory to use as the favicon.
  // You can also explicitly define icons like this:
  // icons: {
  //   icon: '/icon.svg', // or specify different sizes/types
  // },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* The <head> tag is automatically managed by Next.js for metadata */}
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Setting default theme to light as per Freedoc's design
          enableSystem={false} // Disabling system preference to enforce light theme
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
