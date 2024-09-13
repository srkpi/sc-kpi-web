import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-[52.6px] lg:pt-[84px] flex-auto">{children}</main>
      <Footer />
    </>
  );
}
