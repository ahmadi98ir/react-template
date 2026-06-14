import { db } from '@/drizzle/db';
import { contacts } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';
import { markContactRead, deleteContact } from '@/app/actions/contacts';

const card: React.CSSProperties = {
  background: 'rgba(6,12,40,0.7)', border: '1px solid rgba(255,255,255,0.06)',
  backdropFilter: 'blur(16px)', borderRadius: 14, padding: 0, overflow: 'hidden',
};

export default async function ContactsAdmin() {
  let items: (typeof contacts.$inferSelect)[] = [];
  try {
    items = await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  } catch { /* DB not yet available */ }

  const unread = items.filter(c => !c.read).length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 800, margin: 0, marginBottom: 4 }}>پیام‌ها</h1>
        <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>
          {items.length} پیام — <span style={{ color: '#00f3ff' }}>{unread} خوانده‌نشده</span>
        </p>
      </div>

      {items.length === 0 ? (
        <div style={{ ...card, padding: 48, textAlign: 'center' }}>
          <p style={{ color: '#475569', fontSize: 14 }}>هیچ پیامی دریافت نشده است.</p>
        </div>
      ) : (
        <div style={card}>
          {items.map((c, i) => (
            <div key={c.id} style={{
              padding: '18px 24px',
              borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              display: 'flex', gap: 16, alignItems: 'flex-start',
              background: c.read ? 'transparent' : 'rgba(0,243,255,0.02)',
            }}>
              {/* Unread dot */}
              <div style={{ paddingTop: 5, flexShrink: 0 }}>
                {!c.read && <span style={{ display: 'block', width: 7, height: 7, borderRadius: '50%', background: '#00f3ff' }} />}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ color: c.read ? '#94a3b8' : '#e2e8f0', fontWeight: c.read ? 500 : 700, fontSize: 14 }}>{c.name}</span>
                    <a href={`mailto:${c.email}`} style={{ color: '#475569', fontSize: 12, textDecoration: 'none' }}>{c.email}</a>
                    {c.locale && (
                      <span style={{ fontSize: 10, color: '#475569', background: 'rgba(255,255,255,0.04)', borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace' }}>{c.locale}</span>
                    )}
                  </div>
                  <span style={{ color: '#334155', fontSize: 11, flexShrink: 0 }}>
                    {new Date(c.createdAt).toLocaleString('fa-IR')}
                  </span>
                </div>
                {c.subject && (
                  <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{c.subject}</div>
                )}
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{c.message}</p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <form action={markContactRead.bind(null, c.id, !c.read)}>
                  <button type="submit" style={{
                    padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: c.read ? 'rgba(255,255,255,0.04)' : 'rgba(0,243,255,0.08)',
                    border: c.read ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,243,255,0.15)',
                    color: c.read ? '#64748b' : '#00f3ff', cursor: 'pointer',
                  }}>
                    {c.read ? 'خوانده‌نشده' : 'خوانده‌شده'}
                  </button>
                </form>
                <form action={deleteContact.bind(null, c.id)}>
                  <button
                    type="submit"
                    onClick={e => { if (!confirm('این پیام حذف شود؟')) e.preventDefault(); }}
                    style={{
                      padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                      background: 'rgba(255,59,59,0.06)', border: '1px solid rgba(255,59,59,0.12)',
                      color: '#f87171', cursor: 'pointer',
                    }}
                  >حذف</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
