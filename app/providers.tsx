'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(
      process.env.NEXT_PUBLIC_POSTHOG_KEY ||
        'phc_SyMCx6wcYBDpb1Sn0dCzL5JsOu1iC5Kmi4C8Wt6aFrv',
      {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        person_profiles: 'always',
        defaults: '2025-11-30',
      },
    );
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
