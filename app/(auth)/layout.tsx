import AnimatedBackground from '@/components/auth/AnimatedBackground';
import AnimatedLogo from '@/components/auth/AnimatedLogo';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnimatedLogo />
      <main className="relative min-h-screen-dvh w-full overflow-x-hidden flex">
        {children}
      </main>
      <AnimatedBackground />
    </>
  );
}
