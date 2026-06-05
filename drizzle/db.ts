import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof drizzle> | null | undefined;
}

function createDb(): ReturnType<typeof drizzle> | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  // `prepare: false` is required for Neon/Supabase transaction-pool mode
  const client = postgres(url, { prepare: false });
  return drizzle(client, { schema });
}

// Cast to non-null — all callers already wrap db operations in try/catch
export const db = (globalThis.__db !== undefined
  ? globalThis.__db
  : (globalThis.__db = createDb())) as ReturnType<typeof drizzle>;

if (process.env.NODE_ENV !== 'production') {
  globalThis.__db = db;
}
