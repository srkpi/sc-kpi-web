'use client';
import React, { ReactNode } from 'react';

import NotFound from '@/app/not-found';
import useAuth from '@/hooks/useAuth';

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();
  if (isAdmin()) {
    return children;
  }
  return <NotFound />;
};

export default ProtectedAdminRoute;
