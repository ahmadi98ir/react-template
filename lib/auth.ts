import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/drizzle/db';
import * as schema from '@/drizzle/schema';

export const auth = betterAuth({
  // Fall back to NEXTAUTH_* so existing Coolify env vars keep working.
  // Without a secret better-auth throws at import time in production,
  // crashing the whole server (every request 500s).
  secret:
    process.env.BETTER_AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    process.env.JWT_SECRET,
  baseURL:
    process.env.BETTER_AUTH_URL ??
    process.env.NEXTAUTH_URL ??
    'https://ahmadi98.ir',

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user:         schema.users,
      session:      schema.sessions,
      account:      schema.accounts,
      verification: schema.verifications,
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 12,
  },

  session: {
    expiresIn:   60 * 60 * 24 * 30,  // 30 days
    updateAge:   60 * 60 * 24,        // refresh if older than 1 day
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },

  advanced: {
    cookiePrefix: 'ahmadi98',
    useSecureCookies: process.env.NODE_ENV === 'production',
  },

  trustedOrigins: (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? '')
    .split(',')
    .filter(Boolean),
});

export type Session = typeof auth.$Infer.Session;
export type User    = typeof auth.$Infer.Session.user;
