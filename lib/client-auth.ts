"use client"

// Client-side authentication utilities
// This replaces NextAuth.js with a simple localStorage-based authentication system

// Types
export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  dob?: string
}

export interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin"
}

// User authentication
export function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null

  try {
    const userStr = localStorage.getItem("user")
    if (!userStr) return null
    return JSON.parse(userStr)
  } catch (error) {
    console.error("Error parsing user from storage:", error)
    return null
  }
}

export function setUserInStorage(user: User): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("user", JSON.stringify(user))
  } catch (error) {
    console.error("Error setting user in storage:", error)
  }
}

export function removeUserFromStorage(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("user")
}

// Admin authentication
export function getAdminFromStorage(): AdminUser | null {
  if (typeof window === "undefined") return null

  try {
    const adminStr = localStorage.getItem("adminUser")
    if (!adminStr) return null
    return JSON.parse(adminStr)
  } catch (error) {
    console.error("Error parsing admin from storage:", error)
    return null
  }
}

export function setAdminInStorage(admin: AdminUser): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("adminUser", JSON.stringify(admin))
  } catch (error) {
    console.error("Error setting admin in storage:", error)
  }
}

export function removeAdminFromStorage(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminUser")
}

// This file contains client-side authentication utilities
// that replace the server-side NextAuth.js functionality

// Function to sign in a user with email/password (for admin)
export function signInWithCredentials(email: string, password: string): boolean {
  // For demo purposes, hardcode the admin credentials
  if (email === "moe@freedoc.com.au" && password === "admin123") {
    // Store admin info in localStorage
    localStorage.setItem(
      "admin",
      JSON.stringify({
        email,
        name: "Admin User",
        role: "admin",
      }),
    )
    return true
  }
  return false
}

// Function to sign in a user with OTP (for regular users)
export function signInWithOTP(email: string, otp: string): boolean {
  // Get the stored OTP from localStorage
  const storedOTP = localStorage.getItem(`otp_${email}`)

  // Check if OTP matches
  if (storedOTP === otp) {
    // Store user info in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        name: email.split("@")[0], // Simple name extraction from email
        role: "user",
      }),
    )

    // Clear the OTP after successful login
    localStorage.removeItem(`otp_${email}`)

    return true
  }
  return false
}

// Function to request an OTP for a user
export function requestOTP(email: string): string {
  // For demo purposes, generate a simple 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Store the OTP in localStorage
  localStorage.setItem(`otp_${email}`, otp)

  return otp
}

// Function to sign out a user
export function signOut(userType: "user" | "admin" = "user"): void {
  localStorage.removeItem(userType)
}

// Function to get the current user
export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null
  }

  const user = localStorage.getItem("user")
  const admin = localStorage.getItem("admin")

  if (user) {
    return JSON.parse(user)
  }

  if (admin) {
    return JSON.parse(admin)
  }

  return null
}

// Function to check if a user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false
  }

  return localStorage.getItem("user") !== null || localStorage.getItem("admin") !== null
}

// Function to check if a user is an admin
export function isAdmin(): boolean {
  if (typeof window === "undefined") {
    return false
  }

  const admin = localStorage.getItem("admin")
  return admin !== null
}

// Function to store a consultation request
export function storeConsultation(consultation: any): void {
  // Get existing consultations
  const existingConsultationsStr = localStorage.getItem("consultations")
  const existingConsultations = existingConsultationsStr ? JSON.parse(existingConsultationsStr) : []

  // Add the new consultation with a status
  const newConsultation = {
    ...consultation,
    id: `consult_${Date.now()}`,
    date: new Date().toISOString(),
    status: "pending",
  }

  // Update the consultations list
  const updatedConsultations = [newConsultation, ...existingConsultations]

  // Store back in localStorage
  localStorage.setItem("consultations", JSON.stringify(updatedConsultations))
}

// Function to get all consultations
export function getConsultations() {
  if (typeof window === "undefined") {
    return []
  }

  const consultationsStr = localStorage.getItem("consultations")
  return consultationsStr ? JSON.parse(consultationsStr) : []
}
