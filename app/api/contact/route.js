export const runtime = 'edge';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (message.length > 2000) {
      return Response.json({ error: 'Message too long' }, { status: 400 });
    }

    // Log to server console (visible in Coolify logs).
    // To wire up email delivery, set CONTACT_WEBHOOK_URL in env and
    // this endpoint will forward the payload there.
    const payload = { name, email, message, ts: new Date().toISOString() };
    console.log('[contact]', JSON.stringify(payload));

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
