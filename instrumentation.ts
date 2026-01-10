import { getPostHogServer } from './lib/posthog-server';

export function register() {
  // No-op for initialization
}

type NodeHeaders = {
  cookie?: string | string[];
  [key: string]: unknown;
};

export const onRequestError = async (
  err: Error,
  request: { headers?: NodeHeaders } | undefined,
) => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const posthog = getPostHogServer();
    let distinctId = null;

    if (request?.headers?.cookie) {
      const cookieString = Array.isArray(request.headers.cookie)
        ? request.headers.cookie.join('; ')
        : request.headers.cookie;

      const postHogCookieMatch = cookieString.match(
        /ph_phc_.*?_posthog=([^;]+)/,
      );

      if (postHogCookieMatch?.[1]) {
        try {
          const decodedCookie = decodeURIComponent(postHogCookieMatch[1]);
          const postHogData = JSON.parse(decodedCookie);
          distinctId = postHogData.distinct_id;
        } catch (e) {
          console.error('Error parsing PostHog cookie:', e);
        }
      }
    }

    await posthog.captureException(err, distinctId || undefined);
  }
};
