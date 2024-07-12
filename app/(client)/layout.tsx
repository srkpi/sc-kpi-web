import { Roboto as FontSans } from 'next/font/google';

import Footer from '@/components/footer/footer';
import { cn } from '@/lib/cn';

const fontSans = FontSans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
});

export default function ClientLayout({
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
        <Footer />
      </body>
    </html>
  );
}
