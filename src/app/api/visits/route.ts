import { NextResponse } from 'next/server';
import { createVisit } from '@/lib/visit-store';

export const dynamic = 'force-dynamic';

function getClientIp(forwardedFor: string | null) {
  if (!forwardedFor) {
    return null;
  }

  return forwardedFor.split(',')[0]?.trim().slice(0, 120) || null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = typeof body?.path === 'string' ? body.path.trim() : '';

    if (!path || path.startsWith('/admin') || path.startsWith('/api') || path.startsWith('/_next')) {
      return NextResponse.json({ ok: true });
    }

    await createVisit({
      path: path.slice(0, 200),
      ip: getClientIp(request.headers.get('x-forwarded-for')),
      userAgent: request.headers.get('user-agent')?.slice(0, 500) || null,
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
