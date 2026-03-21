import 'server-only';

import { pgPool } from '@/lib/pg';

export type VisitRecord = {
  id: string;
  path: string;
  ip: string | null;
  userAgent: string | null;
  visitedAt: Date;
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

function mapRow(row: {
  id: string;
  path: string;
  ip: string | null;
  userAgent: string | null;
  visitedAt: Date;
}) {
  return {
    id: row.id,
    path: row.path,
    ip: row.ip,
    userAgent: row.userAgent,
    visitedAt: new Date(row.visitedAt),
  } satisfies VisitRecord;
}

function generateId() {
  return crypto.randomUUID();
}

export async function getVisitMetrics(limit: number) {
  await ensureVisitTable();

  const [countResult, visitsResult] = await Promise.all([
    pgPool.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM "Visit";'),
    pgPool.query<VisitRecord>(
      'SELECT "id", "path", "ip", "userAgent", "visitedAt" FROM "Visit" ORDER BY "visitedAt" DESC LIMIT $1;',
      [limit]
    ),
  ]);

  return {
    enabled: true,
    totalVisits: Number(countResult.rows[0]?.count ?? 0),
    visits: visitsResult.rows.map(mapRow),
  };
}

export async function createVisit(data: Omit<VisitRecord, 'id' | 'visitedAt'>) {
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
}
