import 'server-only';

import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

type GlobalPgCache = typeof globalThis & {
  __teacherPortfolioPgPool__?: Pool;
};

const globalCache = globalThis as GlobalPgCache;

function normalizeDatabaseUrl(url: string) {
  if (
    url.includes('<project-ref>') ||
    url.includes('<region>') ||
    url.includes('YOUR_PASSWORD')
  ) {
    throw new Error(
      'DATABASE_URL still contains placeholder values. Replace <project-ref>, <region>, and YOUR_PASSWORD with your real Supabase connection details.'
    );
  }

  const parsedUrl = new URL(url);

  if (parsedUrl.searchParams.get('sslmode') === 'require') {
    parsedUrl.searchParams.set('sslmode', 'verify-full');
  }

  return parsedUrl.toString();
}

export const pgPool =
  globalCache.__teacherPortfolioPgPool__ ??
  new Pool({
    connectionString: normalizeDatabaseUrl(databaseUrl),
  });

if (process.env.NODE_ENV !== 'production') {
  globalCache.__teacherPortfolioPgPool__ = pgPool;
}
