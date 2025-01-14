'use client';
import React, { ReactNode } from 'react';

import NotFound from '@/app/not-found';
import useAuth from '@/hooks/useAuth';

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();

  if (isAdmin().loading) {
    return (
      <div className="w-full h-screen flex gap-12 p-12">
        <div className="w-[220px] bg-slate-600/50 animate-pulse h-full max-h-[60vh]"></div>
        <div className="h-[400px] flex-auto w-1/6 bg-slate-600/50 mt-12 animate-pulse"></div>
      </div>
    );
  }

  if (isAdmin().value) {
    return children;
  }
  return <NotFound />;
};

export default ProtectedAdminRoute;
