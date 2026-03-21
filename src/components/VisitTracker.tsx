'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ignoredPrefixes = ['/admin', '/api', '/_next'];

export function VisitTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || ignoredPrefixes.some((prefix) => pathname.startsWith(prefix))) {
      return;
    }

    if (lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;

    void fetch('/api/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {
      // Ignore background analytics failures so page rendering is never affected.
    });
  }, [pathname]);

  return null;
}
