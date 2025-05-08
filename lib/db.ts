import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Configure neon to use WebSocket for better performance
neonConfig.fetchConnectionCache = true

// Create a SQL client
const sql = neon(process.env.DATABASE_URL!)

// Create a drizzle client
export const db = drizzle(sql)

// Export the sql client for raw queries
export { sql }
