'use client';
import dynamic from 'next/dynamic';

const ProjectGridIsotop = dynamic(
  () => import('@/components/ProjectGridIsotop'),
  { ssr: false }
);

export default function ProjectGridIsotopClient() {
  return <ProjectGridIsotop />;
}
