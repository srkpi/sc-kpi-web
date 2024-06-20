import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/cn";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['300', '400', '700'],
});

const title = 'Студентська Рада | КПІ ім. Ігоря Сікорського'
const description =  "Студентська рада КПІ — це ком'юніті згуртованих та ініціативних студентів, які роблять КПІ кращим."

export const metadata: Metadata = {
  title,
  description,
    openGraph: {
      title,
        description,
        type: "website",
        images: '',
        url: 'https://sckpi.vercel.app/'
    }
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
              "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
        {children}
      </body>
    </html>
  );
}
