'use client';

import { useClientInit } from '@/hooks/useClientInit';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useClientInit();

  return <>{children}</>;
} 