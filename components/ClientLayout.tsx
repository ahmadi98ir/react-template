'use client';

import { useClientInit } from '@/hooks/useClientInit';
import { isBrowser } from '@/utils/environment';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isClient } = useClientInit();

  if (!isClient && !isBrowser) {
    return null;
  }

  return <>{children}</>;
} 