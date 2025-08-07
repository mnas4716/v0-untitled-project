import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Memoization cache for frequently used class name combinations
const classNameCache: Record<string, string> = {}

export function cn(...inputs: ClassValue[]) {
  // Create a cache key from the inputs
  const cacheKey = JSON.stringify(inputs)

  // Return cached result if available
  if (classNameCache[cacheKey]) {
    return classNameCache[cacheKey]
  }

  // Calculate the result and cache it
  const result = twMerge(clsx(inputs))
  classNameCache[cacheKey] = result

  return result
}

// Date formatting with caching for performance
const dateFormatCache: Record<string, string> = {}

export function formatDate(input: string | number): string {
  const cacheKey = String(input)

  if (dateFormatCache[cacheKey]) {
    return dateFormatCache[cacheKey]
  }

  const date = new Date(input)
  const result = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  dateFormatCache[cacheKey] = result
  return result
}

export function formatDateTime(input: string | number): string {
  const cacheKey = `dt_${String(input)}`

  if (dateFormatCache[cacheKey]) {
    return dateFormatCache[cacheKey]
  }

  const date = new Date(input)
  const result = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  dateFormatCache[cacheKey] = result
  return result
}

// Pre-generate common characters for random string generation
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
const charactersLength = characters.length

export function generateRandomString(length: number): string {
  let result = ""

  // Use Uint32Array for better randomness and performance
  const randomValues = new Uint32Array(length)
  window.crypto.getRandomValues(randomValues)

  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % charactersLength)
  }

  return result
}
