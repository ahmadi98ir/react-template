import { db } from '@/drizzle/db';
import { contacts } from '@/drizzle/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, locale = 'fa' } = body as Record<string, string>;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (message.length > 2000) {
      return Response.json({ error: 'Message too long' }, { status: 400 });
    }

    const ip = request.headers.get('cf-connecting-ip')
      ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? null;

    await db.insert(contacts).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      locale,
      ipAddress: ip,
    });

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, locale, ts: new Date().toISOString() }),
      }).catch(() => {});
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
