'use server';

import { db } from '@/drizzle/db';
import { contacts } from '@/drizzle/schema';
import { headers } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  name:    z.string().min(2).max(255),
  email:   z.string().email().max(255),
  phone:   z.string().max(50).optional(),
  subject: z.string().max(500).optional(),
  message: z.string().min(10).max(5000),
  locale:  z.enum(['fa', 'en', 'fr', 'ar']).default('fa'),
});

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; errors: Record<string, string[]> }
  | { status: 'serverError'; message: string };

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name:    formData.get('name'),
    email:   formData.get('email'),
    phone:   formData.get('phone') || undefined,
    subject: formData.get('subject') || undefined,
    message: formData.get('message'),
    locale:  formData.get('locale') ?? 'fa',
  });

  if (!parsed.success) {
    return { status: 'error', errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const headerStore = await headers();
    const ip =
      headerStore.get('x-forwarded-for')?.split(',')[0].trim() ??
      headerStore.get('x-real-ip') ??
      null;

    await db.insert(contacts).values({ ...parsed.data, ipAddress: ip });
    return { status: 'success' };
  } catch {
    return { status: 'serverError', message: 'Database error. Please try again.' };
  }
}
