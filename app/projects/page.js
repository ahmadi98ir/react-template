import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';

const DynamicProjects = dynamic(() => import('@/components/Projects'), {
  ssr: false
});

export default function ProjectsPage() {
  return (
    <ClientOnly>
      <DynamicProjects />
    </ClientOnly>
  );
}