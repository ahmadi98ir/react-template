'use client';

import { useClientInit } from '@/hooks/useClientInit';

export default function RootLayout({ children }) {
  useClientInit();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ahmadi98</title>
      </head>
      <body>
        <div id="preloader" />
        {children}
        <div className="scroll-top">
          <i className="fas fa-angle-up" />
        </div>
      </body>
    </html>
  );
}