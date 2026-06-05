'use client';
import dynamic from 'next/dynamic';

const ProjectMasonryIsotop = dynamic(
  () => import('@/components/ProjectMasonryIsotop'),
  { ssr: false }
);

export default function ProjectMasonryIsotopClient() {
  return <ProjectMasonryIsotop />;
}
