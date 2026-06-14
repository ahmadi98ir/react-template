import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import { updateProject } from '@/app/actions/projects';
import ProjectForm from '@/components/admin/ProjectForm';
import type { I18n } from '@/drizzle/schema';

interface Props { params: Promise<{ id: string }> }

async function handleUpdate(id: string, fd: FormData) {
  'use server';
  await updateProject(id, fd);
  redirect('/admin/projects');
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  let project: typeof projects.$inferSelect | undefined;

  try {
    [project] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  } catch { /* DB not available */ }

  if (!project) return notFound();

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 800, margin: 0, marginBottom: 4 }}>ویرایش پروژه</h1>
        <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>
          {(project.title as I18n)?.fa || (project.title as I18n)?.en}
        </p>
      </div>
      <ProjectForm
        action={handleUpdate.bind(null, id)}
        submitLabel="ذخیره تغییرات"
        initialData={{
          id:             project.id,
          slug:           project.slug,
          title:          project.title as I18n,
          description:    project.description as I18n,
          category:       project.category ?? undefined,
          tags:           project.tags as string[],
          projectUrl:     project.projectUrl,
          githubUrl:      project.githubUrl,
          coverImageUrl:  project.coverImageUrl,
          featured:       project.featured,
          published:      project.published,
          order:          project.order,
        }}
      />
    </div>
  );
}
