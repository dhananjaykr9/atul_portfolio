import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // During build, we don't need a real Prisma Client
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return {} as PrismaClient
  }

  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
