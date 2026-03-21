import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

function normalizeDatabaseUrl(url: string) {
  const cleanedUrl = url.trim().replace(/^['"]|['"]$/g, '')

  if (
    cleanedUrl.includes('<project-ref>') ||
    cleanedUrl.includes('<region>') ||
    cleanedUrl.includes('YOUR_PASSWORD')
  ) {
    throw new Error(
      'DATABASE_URL still contains placeholder values. Replace <project-ref>, <region>, and YOUR_PASSWORD with your real Supabase connection details.'
    )
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(cleanedUrl)
  } catch {
    throw new Error(
      'DATABASE_URL is not a valid URL. If your database password contains special characters like @, :, /, ?, or #, URL-encode the password before saving it in .env.'
    )
  }

  if (parsedUrl.searchParams.get('sslmode') === 'require') {
    // Preserve the current secure behavior expected by pg while silencing the deprecation warning.
    parsedUrl.searchParams.set('sslmode', 'verify-full')
  }

  return parsedUrl.toString()
}

const normalizedDatabaseUrl = normalizeDatabaseUrl(databaseUrl)

type GlobalPrismaCache = typeof globalThis & {
  __teacherPortfolioPrisma__?: PrismaClient
}

const globalCache = globalThis as GlobalPrismaCache

const prisma =
  globalCache.__teacherPortfolioPrisma__ ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: normalizedDatabaseUrl,
    }),
  })

if (process.env.NODE_ENV !== 'production') {
  globalCache.__teacherPortfolioPrisma__ = prisma
}

export { prisma }
