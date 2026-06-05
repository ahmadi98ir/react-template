import { db } from '@/drizzle/db'
import { contacts, projects, posts } from '@/drizzle/schema'
import { desc, count } from 'drizzle-orm'

export default async function AdminHome() {
  let recentContacts: { id: string; name: string; subject: string | null }[] = []
  let projectCount = 0
  let postCount = 0

  try {
    const [contactRows, [{ value: pCount }], [{ value: bCount }]] = await Promise.all([
      db.select({ id: contacts.id, name: contacts.name, subject: contacts.subject })
        .from(contacts).orderBy(desc(contacts.createdAt)).limit(5),
      db.select({ value: count() }).from(projects),
      db.select({ value: count() }).from(posts),
    ])
    recentContacts = contactRows
    projectCount = Number(pCount)
    postCount = Number(bCount)
  } catch { /* DB not yet available */ }

  return (
    <div>
      <h1>داشبورد</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        <div style={{ padding: 16, border: '1px solid #eee' }}>پروژه‌ها: {projectCount}</div>
        <div style={{ padding: 16, border: '1px solid #eee' }}>پست‌ها: {postCount}</div>
        <div style={{ padding: 16, border: '1px solid #eee' }}>پیام‌های اخیر: {recentContacts.length}</div>
      </div>
      <h3 style={{ marginTop: 24 }}>آخرین پیام‌ها</h3>
      <ul>
        {recentContacts.map((c) => (
          <li key={c.id}>{c.name} - {c.subject}</li>
        ))}
      </ul>
    </div>
  )
}
