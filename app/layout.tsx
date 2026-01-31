import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toast/toaster';
import { cn } from '@/lib/cn';

import { PostHogProvider } from './providers';

import './globals.css';

const title = {
  template: '%s | КПІ ім. Ігоря Сікорського',
  default: 'Студентська Рада | КПІ ім. Ігоря Сікорського',
};
const description =
  "Студентська рада КПІ — це ком'юніті згуртованих та ініціативних студентів, які роблять КПІ кращим.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    images: [
      {
        url: 'https://sc.kpi.ua/images/Logo.svg',
        secureUrl: 'https://sc.kpi.ua/images/Logo.svg',
        type: 'image/svg+xml',
        width: 1200,
        height: 630,
        alt: "Preview image for Student's Council website",
      },
    ],
    url: 'https://sc.kpi.ua',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen-dvh flex flex-col bg-background font-sans antialiased',
        )}
      >
        <PostHogProvider>
          {children}
          <Toaster />
        </PostHogProvider>
      </body>
      <GoogleAnalytics gaId={process.env.GA_ID ?? ''} />
    </html>
  );
}
