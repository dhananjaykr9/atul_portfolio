import { PrismaClient } from '@prisma/client'

// Robust singleton for PrismaClient to handle Vercel's build/runtime lifecycle
const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

// We use a Proxy to lazy-load the Prisma client only when a query is actually called.
// This prevents Prisma from trying to connect during the Vercel build phase
// because no queries are executed then (due to force-dynamic).
export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    if (!globalForPrisma.prisma) {
      if (process.env.NEXT_PHASE === 'phase-production-build') {
        return ({} as any)[prop]
      }
      globalForPrisma.prisma = prismaClientSingleton()
    }
    return (globalForPrisma.prisma as any)[prop]
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
