'use server';

import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema';
import type { I18n } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error('Unauthorized');
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const titleFa  = (formData.get('title_fa')  as string)?.trim();
  const titleEn  = (formData.get('title_en')  as string)?.trim();
  const descFa   = (formData.get('desc_fa')   as string)?.trim();
  const descEn   = (formData.get('desc_en')   as string)?.trim();
  const slug     = (formData.get('slug')       as string)?.trim().toLowerCase().replace(/\s+/g, '-');
  const category = (formData.get('category')  as string)?.trim();
  const tagsRaw  = (formData.get('tags')       as string)?.trim();
  const projectUrl  = (formData.get('project_url')  as string)?.trim() || null;
  const githubUrl   = (formData.get('github_url')   as string)?.trim() || null;
  const coverImageUrl = (formData.get('cover_image_url') as string)?.trim() || null;
  const featured = formData.get('featured') === 'on';
  const published = formData.get('published') === 'on';
  const orderVal = parseInt(formData.get('order') as string || '0', 10);

  if (!slug || !titleFa) throw new Error('slug and Persian title are required');

  const title: I18n = { fa: titleFa, en: titleEn || titleFa };
  const description: I18n = { fa: descFa || '', en: descEn || '' };
  const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

  await db.insert(projects).values({
    slug, title, description, category, tags,
    projectUrl, githubUrl, coverImageUrl,
    featured, published, order: orderVal,
  });

  revalidatePath('/admin/projects');
  revalidatePath('/fa');
  revalidatePath('/en');
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const titleFa  = (formData.get('title_fa')  as string)?.trim();
  const titleEn  = (formData.get('title_en')  as string)?.trim();
  const descFa   = (formData.get('desc_fa')   as string)?.trim();
  const descEn   = (formData.get('desc_en')   as string)?.trim();
  const slug     = (formData.get('slug')       as string)?.trim().toLowerCase().replace(/\s+/g, '-');
  const category = (formData.get('category')  as string)?.trim();
  const tagsRaw  = (formData.get('tags')       as string)?.trim();
  const projectUrl  = (formData.get('project_url')  as string)?.trim() || null;
  const githubUrl   = (formData.get('github_url')   as string)?.trim() || null;
  const coverImageUrl = (formData.get('cover_image_url') as string)?.trim() || null;
  const featured = formData.get('featured') === 'on';
  const published = formData.get('published') === 'on';
  const orderVal = parseInt(formData.get('order') as string || '0', 10);

  const title: I18n = { fa: titleFa, en: titleEn || titleFa };
  const description: I18n = { fa: descFa || '', en: descEn || '' };
  const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

  await db.update(projects).set({
    slug, title, description, category, tags,
    projectUrl, githubUrl, coverImageUrl,
    featured, published, order: orderVal,
    updatedAt: new Date(),
  }).where(eq(projects.id, id));

  revalidatePath('/admin/projects');
  revalidatePath('/fa');
  revalidatePath('/en');
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath('/admin/projects');
  revalidatePath('/fa');
  revalidatePath('/en');
}

export async function toggleProjectPublished(id: string, current: boolean) {
  await requireAdmin();
  await db.update(projects).set({ published: !current, updatedAt: new Date() }).where(eq(projects.id, id));
  revalidatePath('/admin/projects');
  revalidatePath('/fa');
  revalidatePath('/en');
}
