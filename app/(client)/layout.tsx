import { checkIsAdmin, getUserInfo } from '@/app/actions/auth.actions';
import Footer from '@/components/footer/footer';
import { Header } from '@/components/header/header';

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();
  const isAdmin = user ? await checkIsAdmin() : false;

  return (
    <>
      <Header user={user} isAdmin={isAdmin} />
      <main className="pt-[41px] lg:pt-[84px] flex-auto">{children}</main>
      <Footer />
    </>
  );
}
