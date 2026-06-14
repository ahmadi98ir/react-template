import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

const NAV = [
  { href: '/admin',          icon: '⊞', label: 'داشبورد' },
  { href: '/admin/projects', icon: '◈', label: 'پروژه‌ها' },
  { href: '/admin/skills',   icon: '◎', label: 'مهارت‌ها' },
  { href: '/admin/contacts', icon: '✉', label: 'پیام‌ها' },
  { href: '/admin/blog',     icon: '✎', label: 'بلاگ' },
  { href: '/admin/profile',  icon: '◉', label: 'پروفایل' },
  { href: '/admin/media',    icon: '⊡', label: 'مدیا' },
  { href: '/admin/settings', icon: '◌', label: 'تنظیمات' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <div style={{
        minHeight: '100vh', background: '#020617',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          background: 'rgba(6,12,40,0.8)',
          border: '1px solid rgba(0,243,255,0.15)',
          backdropFilter: 'blur(24px)',
          borderRadius: 16, padding: 40, textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 14 }}>
            برای دسترسی به پنل مدیریت وارد شوید.
          </p>
          <Link href="/auth/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 24px', borderRadius: 10,
            background: '#00f3ff', color: '#020617',
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}>
            ورود به سیستم
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#020617', direction: 'rtl' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: 'rgba(6,12,40,0.85)',
        borderLeft: '1px solid rgba(0,243,255,0.08)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column',
        padding: '24px 0',
        position: 'sticky', top: 0, height: '100vh',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: '#00f3ff', color: '#020617',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 11, fontFamily: 'monospace',
            }}>MA</span>
            <div>
              <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 13 }}>پنل مدیریت</div>
              <div style={{ color: '#475569', fontSize: 11 }}>احمدی ۹۸</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {NAV.map(({ href, icon, label }) => (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10, marginBottom: 2,
              color: '#94a3b8', textDecoration: 'none', fontSize: 13, fontWeight: 500,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,243,255,0.08)';
              (e.currentTarget as HTMLElement).style.color = '#00f3ff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#94a3b8';
            }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* User + signout */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 12, color: '#475569', marginBottom: 8 }}>
            {session.user.email}
          </div>
          <Link href="/" style={{ color: '#475569', fontSize: 12, textDecoration: 'none' }}>
            ← بازگشت به سایت
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0, padding: 32, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
