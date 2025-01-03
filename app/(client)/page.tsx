import dynamic from 'next/dynamic';

const HomeComponent = dynamic(() => import('@/components/dynamic-pages/home/'));

export const dynamic = 'force-dynamic';

export default async function Home() {
  return <HomeComponent />;
}
