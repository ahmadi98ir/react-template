import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';

const DynamicBlogDetails = dynamic(() => import('@/components/BlogDetails'), {
  ssr: false
});

export default function BlogDetailsPage() {
  return (
    <ClientOnly>
      <DynamicBlogDetails />
    </ClientOnly>
  );
}