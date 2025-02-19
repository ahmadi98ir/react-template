import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';

const DynamicContact = dynamic(() => import('@/components/Contact'), {
  ssr: false
});

export default function ContactPage() {
  return (
    <ClientOnly>
      <DynamicContact />
    </ClientOnly>
  );
}