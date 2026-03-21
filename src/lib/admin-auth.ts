import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ACCESS_COOKIE_NAME = 'teacher_portfolio_admin_access_token';
const REFRESH_COOKIE_NAME = 'teacher_portfolio_admin_refresh_token';

type SupabaseUser = {
  id: string;
  email?: string;
};

type SupabaseSessionResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: SupabaseUser;
};

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? '';
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? '';
}

function getAllowedAdminEmail() {
  return (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();
}

function getBaseHeaders() {
  const apikey = getSupabaseAnonKey();

  return {
    apikey,
    'Content-Type': 'application/json',
  };
}

function isEmailAllowed(email?: string) {
  const allowedEmail = getAllowedAdminEmail();

  if (!allowedEmail) {
    return true;
  }

  return (email ?? '').toLowerCase() === allowedEmail;
}

export function isAdminConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

async function fetchSupabaseUser(accessToken: string) {
  const response = await fetch(`${getSupabaseUrl()}/auth/v1/user`, {
    method: 'GET',
    headers: {
      ...getBaseHeaders(),
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as SupabaseUser;
}

async function refreshSupabaseSession(refreshToken: string) {
  const response = await fetch(`${getSupabaseUrl()}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: getBaseHeaders(),
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as SupabaseSessionResponse;
}

async function setSessionCookies(session: SupabaseSessionResponse) {
  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === 'production';

  cookieStore.set(ACCESS_COOKIE_NAME, session.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: session.expires_in,
  });

  cookieStore.set(REFRESH_COOKIE_NAME, session.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function signInWithSupabase(email: string, password: string) {
  const response = await fetch(`${getSupabaseUrl()}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: getBaseHeaders(),
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return { ok: false as const, reason: 'invalid-credentials' as const };
  }

  const session = (await response.json()) as SupabaseSessionResponse;

  if (!isEmailAllowed(session.user?.email)) {
    return { ok: false as const, reason: 'unauthorized-email' as const };
  }

  await setSessionCookies(session);

  return { ok: true as const };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE_NAME);
  cookieStore.delete(REFRESH_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

  if (accessToken) {
    const user = await fetchSupabaseUser(accessToken);

    if (user && isEmailAllowed(user.email)) {
      return true;
    }
  }

  if (!refreshToken) {
    return false;
  }

  const refreshedSession = await refreshSupabaseSession(refreshToken);

  if (!refreshedSession || !isEmailAllowed(refreshedSession.user?.email)) {
    return false;
  }

  await setSessionCookies(refreshedSession);
  return true;
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
}
