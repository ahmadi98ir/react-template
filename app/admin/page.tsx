import { prisma } from '@/lib/prisma'

export default async function AdminHome() {
  const [contacts, projects, posts] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.project.count(),
    prisma.blogPost.count(),
  ])

  return (
    <div>
      <h1>داشبورد</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        <div style={{ padding: 16, border: '1px solid #eee' }}>پروژه‌ها: {projects}</div>
        <div style={{ padding: 16, border: '1px solid #eee' }}>پست‌ها: {posts}</div>
        <div style={{ padding: 16, border: '1px solid #eee' }}>پیام‌های اخیر: {contacts.length}</div>
      </div>
      <h3 style={{ marginTop: 24 }}>آخرین پیام‌ها</h3>
      <ul>
        {contacts.map((c) => (
          <li key={c.id}>{c.name} - {c.subject}</li>
        ))}
      </ul>
    </div>
  )
}

