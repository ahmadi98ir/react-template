import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions as any)
  if (!session) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Admin</h1>
        <p>برای دسترسی، ابتدا وارد شوید.</p>
        <Link href="/auth/login">ورود</Link>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, padding: 20, borderInlineEnd: '1px solid #ddd' }}>
        <h3>مدیریت</h3>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
            <li><Link href="/admin">داشبورد</Link></li>
            <li><Link href="/admin/profile">پروفایل</Link></li>
            <li><Link href="/admin/skills">مهارت‌ها</Link></li>
            <li><Link href="/admin/projects">پروژه‌ها</Link></li>
            <li><Link href="/admin/blog">بلاگ</Link></li>
            <li><Link href="/admin/media">مدیا</Link></li>
            <li><Link href="/admin/contacts">پیام‌ها</Link></li>
            <li><Link href="/admin/settings">تنظیمات</Link></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  )
}

