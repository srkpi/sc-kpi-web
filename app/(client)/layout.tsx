import { Roboto as FontSans } from 'next/font/google';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { cn } from '@/lib/cn';

const fontSans = FontSans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
  display: 'auto',
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
        <Header />
        <main className="pt-[52.6px] lg:pt-[84px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
