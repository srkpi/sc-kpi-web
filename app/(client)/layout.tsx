import { Roboto as FontSans } from 'next/font/google';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
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
        <Header />
        <main className="pt-[28px] lg:pt-[50px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
