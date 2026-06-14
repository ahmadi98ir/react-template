'use server';

import { db } from '@/drizzle/db';
import { contacts } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error('Unauthorized');
}

export async function markContactRead(id: string, read: boolean) {
  await requireAdmin();
  await db.update(contacts).set({ read }).where(eq(contacts.id, id));
  revalidatePath('/admin/contacts');
}

export async function deleteContact(id: string) {
  await requireAdmin();
  await db.delete(contacts).where(eq(contacts.id, id));
  revalidatePath('/admin/contacts');
}
