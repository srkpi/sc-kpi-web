import { getUserInfo } from '@/app/actions/auth.actions';
import Footer from '@/components/footer/footer';
import { Header } from '@/components/header/header';

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();

  return (
    <>
      <Header user={user} />
      <main className="pt-[41px] lg:pt-[84px] flex-auto">{children}</main>
      <Footer />
    </>
  );
}
