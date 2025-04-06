'use client';

import { useClientInit } from '@/hooks/useClientInit';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useClientInit();

  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  )
} 