import { db } from '@/drizzle/db'
import { contacts } from '@/drizzle/schema'
import { desc } from 'drizzle-orm'

export default async function ContactsAdmin() {
  let items: (typeof contacts.$inferSelect)[] = []
  try {
    items = await db.select().from(contacts).orderBy(desc(contacts.createdAt))
  } catch { /* DB not yet available */ }

  return (
    <div>
      <h1>پیام‌ها</h1>
      <table>
        <thead><tr><th>نام</th><th>ایمیل</th><th>موضوع</th><th>تاریخ</th></tr></thead>
        <tbody>
          {items.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.subject}</td>
              <td>{new Date(c.createdAt).toLocaleString('fa-IR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
