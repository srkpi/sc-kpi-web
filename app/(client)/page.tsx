import dynamic from 'next/dynamic';

const HomeComponent = dynamic(() => import('@/components/dynamic-pages/home/'));

export default async function Home() {
  return <HomeComponent />;
}
