import 'server-only';

import { pgPool } from '@/lib/pg';

export type VisitRecord = {
  id: string;
  path: string;
  ip: string | null;
  userAgent: string | null;
  visitedAt: Date;
  visitedAtLabel?: string;
};

let visitTableReady: Promise<void> | null = null;

async function ensureVisitTable() {
  if (!visitTableReady) {
    visitTableReady = pgPool
      .query(`
        CREATE TABLE IF NOT EXISTS "Visit" (
          "id" TEXT PRIMARY KEY,
          "path" TEXT NOT NULL,
          "ip" TEXT,
          "userAgent" TEXT,
          "visitedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `)
      .then(async () => {
        const visitedAtTypeResult = await pgPool.query<{ data_type: string }>(
          `
            SELECT data_type
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'Visit'
              AND column_name = 'visitedAt'
            LIMIT 1;
          `
        );

        if (visitedAtTypeResult.rows[0]?.data_type === 'timestamp without time zone') {
          await pgPool.query(`
            ALTER TABLE "Visit"
            ALTER COLUMN "visitedAt" TYPE TIMESTAMPTZ
            USING "visitedAt" AT TIME ZONE 'UTC';
          `);
        }

        await pgPool.query(
          'CREATE INDEX IF NOT EXISTS "Visit_path_visitedAt_idx" ON "Visit" ("path", "visitedAt");'
        );
        await pgPool.query(
          'CREATE INDEX IF NOT EXISTS "Visit_visitedAt_idx" ON "Visit" ("visitedAt");'
        );
      });
  }

  await visitTableReady;
}

function isVisitStoreConnectionError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes('connection timeout') ||
    message.includes('connection terminated unexpectedly') ||
    message.includes("can't reach database server") ||
    message.includes('max client connections reached')
  );
}

function mapRow(row: {
  id: string;
  path: string;
  ip: string | null;
  userAgent: string | null;
  visitedAt: Date;
  visitedAtLabel?: string | null;
}) {
  return {
    id: row.id,
    path: row.path,
    ip: row.ip,
    userAgent: row.userAgent,
    visitedAt: new Date(row.visitedAt),
    visitedAtLabel: row.visitedAtLabel ?? undefined,
  } satisfies VisitRecord;
}

function generateId() {
  return crypto.randomUUID();
}

export async function getVisitMetrics(limit: number) {
  try {
    await ensureVisitTable();

    const countResult = await pgPool.query<{ count: string }>(
      'SELECT COUNT(*)::text AS count FROM "Visit";'
    );

    const visitsResult = await pgPool.query<VisitRecord>(
      `SELECT "id", "path", "ip", "userAgent", "visitedAt",
              TO_CHAR("visitedAt" AT TIME ZONE 'Asia/Kolkata', 'DD Mon YYYY, HH12:MI am') AS "visitedAtLabel"
       FROM "Visit"
       ORDER BY "visitedAt" DESC
       LIMIT $1;`,
      [limit]
    );

    return {
      enabled: true,
      totalVisits: Number(countResult.rows[0]?.count ?? 0),
      visits: visitsResult.rows.map(mapRow),
    };
  } catch (error) {
    if (!isVisitStoreConnectionError(error)) {
      throw error;
    }

    visitTableReady = null;

    return {
      enabled: false,
      totalVisits: 0,
      visits: [] as VisitRecord[],
    };
  }
}

export async function createVisit(data: Omit<VisitRecord, 'id' | 'visitedAt'>) {
  try {
    await ensureVisitTable();

    const result = await pgPool.query<VisitRecord>(
      `
        INSERT INTO "Visit" ("id", "path", "ip", "userAgent")
        VALUES ($1, $2, $3, $4)
        RETURNING "id", "path", "ip", "userAgent", "visitedAt";
      `,
      [generateId(), data.path, data.ip, data.userAgent]
    );

    return mapRow(result.rows[0]);
  } catch (error) {
    if (!isVisitStoreConnectionError(error)) {
      throw error;
    }

    visitTableReady = null;

    return null;
  }
}
