import { db } from '@/drizzle/db';
import { projects, posts, contacts, skills } from '@/drizzle/schema';
import { eq, count, desc } from 'drizzle-orm';
import Link from 'next/link';

const card: React.CSSProperties = {
  background: 'rgba(6,12,40,0.7)',
  border: '1px solid rgba(255,255,255,0.06)',
  backdropFilter: 'blur(16px)',
  borderRadius: 14,
  padding: 24,
};

export default async function AdminDashboard() {
  let projectCount = 0, postCount = 0, unreadCount = 0, skillCount = 0;
  let recentContacts: (typeof contacts.$inferSelect)[] = [];

  try {
    [[{ value: projectCount }], [{ value: postCount }], [{ value: unreadCount }], [{ value: skillCount }], recentContacts] = await Promise.all([
      db.select({ value: count() }).from(projects),
      db.select({ value: count() }).from(posts),
      db.select({ value: count() }).from(contacts).where(eq(contacts.read, false)),
      db.select({ value: count() }).from(skills),
      db.select().from(contacts).orderBy(desc(contacts.createdAt)).limit(5),
    ]);
  } catch { /* DB not available */ }

  const stats = [
    { num: projectCount, label: 'پروژه',     href: '/admin/projects',  color: '#00f3ff' },
    { num: postCount,    label: 'پست',        href: '/admin/blog',      color: '#9d00ff' },
    { num: unreadCount,  label: 'پیام جدید',  href: '/admin/contacts',  color: '#00f3ff' },
    { num: skillCount,   label: 'مهارت',      href: '/admin/skills',    color: '#9d00ff' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#e2e8f0', fontSize: 24, fontWeight: 800, margin: 0, marginBottom: 4 }}>داشبورد</h1>
        <p style={{ color: '#475569', fontSize: 14, margin: 0 }}>خلاصه وضعیت سایت</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{ ...card, borderColor: `${s.color}18`, textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: s.color, fontFamily: 'monospace', lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions + recent messages */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={card}>
          <h3 style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 16, marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            اقدام سریع
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/admin/projects/new', label: '+ پروژه جدید',   color: '#00f3ff' },
              { href: '/admin/blog/new',     label: '+ پست جدید',     color: '#9d00ff' },
              { href: '/admin/skills',       label: '+ مهارت جدید',   color: '#00f3ff' },
            ].map(a => (
              <Link key={a.href} href={a.href} style={{
                display: 'block', padding: '8px 14px', borderRadius: 8,
                background: `${a.color}10`, border: `1px solid ${a.color}20`,
                color: a.color, textDecoration: 'none', fontSize: 13, fontWeight: 600,
              }}>{a.label}</Link>
            ))}
          </div>
        </div>

        <div style={card}>
          <h3 style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 16, marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            آخرین پیام‌ها
          </h3>
          {recentContacts.length === 0 ? (
            <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>پیامی وجود ندارد.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentContacts.map(c => (
                <Link key={c.id} href="/admin/contacts" style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div>
                      <span style={{ color: c.read ? '#475569' : '#e2e8f0', fontSize: 13, fontWeight: c.read ? 400 : 600 }}>
                        {c.name}
                      </span>
                      {!c.read && <span style={{ marginRight: 6, fontSize: 8, color: '#00f3ff' }}>●</span>}
                    </div>
                    <span style={{ color: '#334155', fontSize: 11 }}>
                      {new Date(c.createdAt).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
