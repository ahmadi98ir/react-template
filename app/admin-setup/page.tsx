import SetupForm from './SetupForm';
import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';
import { count } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function SetupPage() {
  // Redirect away if setup is already done
  try {
    const [{ value }] = await db.select({ value: count() }).from(users);
    if (Number(value) > 0) redirect('/auth/login');
  } catch { /* DB not reachable yet — show form anyway */ }

  return <SetupForm />;
}
