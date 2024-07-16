import type { Metadata } from 'next';
import { Roboto as FontSans } from 'next/font/google';

import { cn } from '@/lib/cn';

import './globals.css';

const fontSans = FontSans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
  display: 'auto',
});

const title = 'Студентська Рада | КПІ ім. Ігоря Сікорського';
const description =
  "Студентська рада КПІ — це ком'юніті згуртованих та ініціативних студентів, які роблять КПІ кращим.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    images: '',
    url: 'https://sckpi.vercel.app/',
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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
