import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';

const DynamicServices = dynamic(() => import('@/components/Services'), {
  ssr: false
});

export default function ServicesPage() {
  return (
    <ClientOnly>
      <DynamicServices />
    </ClientOnly>
  );
}