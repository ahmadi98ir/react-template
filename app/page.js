import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';

// Dynamic imports
const DynamicHome = dynamic(() => import('@/components/Home'), {
  ssr: false
});

export default function HomePage() {
  return (
    <ClientOnly>
      <DynamicHome />
    </ClientOnly>
  );
}