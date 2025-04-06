export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ClientOnly from '@/components/ClientOnly';
import Header from '@/layout/Header';
import ScrollTop from '@/components/ScrollTop';

export default function Home() {
  return (
    <>
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main>
        {/* محتوای اصلی */}
      </main>
      <ClientOnly>
        <ScrollTop />
      </ClientOnly>
    </>
  );
} 