'use server';

import { db } from '@/drizzle/db';
import { skills } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error('Unauthorized');
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const name = (formData.get('name') as string)?.trim();
  const category = (formData.get('category') as string)?.trim();
  const proficiency = parseInt(formData.get('proficiency') as string || '80', 10);
  const orderVal = parseInt(formData.get('order') as string || '0', 10);
  if (!name || !category) throw new Error('name and category are required');
  await db.insert(skills).values({ name, category, proficiency, order: orderVal });
  revalidatePath('/admin/skills');
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAdmin();
  const name = (formData.get('name') as string)?.trim();
  const category = (formData.get('category') as string)?.trim();
  const proficiency = parseInt(formData.get('proficiency') as string || '80', 10);
  const orderVal = parseInt(formData.get('order') as string || '0', 10);
  const visible = formData.get('visible') === 'on';
  await db.update(skills).set({ name, category, proficiency, order: orderVal, visible }).where(eq(skills.id, id));
  revalidatePath('/admin/skills');
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  await db.delete(skills).where(eq(skills.id, id));
  revalidatePath('/admin/skills');
}
