import { Layers, User as UserIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

import { Sidebar } from '@/app/[locale]/(client)/profile/Sidebar';
import { getUserInfo } from '@/app/[locale]/actions/auth.actions';
import { BreadcrumbItemType, Breadcrumbs } from '@/components/ui/breadcrumb';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: UserIcon,
    href: '/profile',
    label: 'Персональний аккаунт',
  },
];

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();
  if (!user) {
    redirect('/');
  }
  return (
    <section className="_container sm:mt-6 mb-24">
      <div className="w-full flex flex-col md:flex-row md:justify-start md:items-center mb-12">
        <Breadcrumbs items={BREADCRUMBS_ITEMS} />
      </div>
      <div className="flex gap-5 flex-col sm:flex-row items-center sm:items-stretch">
        <Sidebar user={user} />
        {children}
      </div>
    </section>
  );
}
