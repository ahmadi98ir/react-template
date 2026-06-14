import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';
import { count } from 'drizzle-orm';
import { auth } from '@/lib/auth';

/**
 * One-time admin setup endpoint.
 * Works ONLY when the users table is completely empty.
 * After the first user is created this route permanently returns 403.
 *
 * POST /api/admin/setup
 * Body: { name, email, password }
 */
export async function POST(request: Request) {
  try {
    // Guard: reject if ANY user already exists
    const [{ value: userCount }] = await db.select({ value: count() }).from(users);
    if (Number(userCount) > 0) {
      return Response.json(
        { error: 'Setup already complete. This endpoint is disabled.' },
        { status: 403 }
      );
    }

    const body = await request.json() as { name?: string; email?: string; password?: string };
    const { name = 'Admin', email, password } = body;

    if (!email || !password) {
      return Response.json({ error: 'email and password are required' }, { status: 400 });
    }

    if (password.length < 12) {
      return Response.json({ error: 'Password must be at least 12 characters' }, { status: 400 });
    }

    // Use BetterAuth's built-in sign-up to ensure password is hashed correctly
    const result = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    if (!result || 'error' in result) {
      return Response.json({ error: 'Registration failed', detail: result }, { status: 400 });
    }

    return Response.json({
      ok: true,
      message: 'Admin account created. You can now log in at /auth/login',
      email,
    });
  } catch (err) {
    console.error('[setup]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/** GET: check if setup is still needed */
export async function GET() {
  try {
    const [{ value: userCount }] = await db.select({ value: count() }).from(users);
    const setupNeeded = Number(userCount) === 0;
    return Response.json({ setupNeeded });
  } catch {
    return Response.json({ setupNeeded: true });
  }
}
