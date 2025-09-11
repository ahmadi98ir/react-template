import { prisma } from '@/lib/prisma'

export default async function ContactsAdmin() {
  const items = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <h1>پیام‌ها</h1>
      <table>
        <thead><tr><th>نام</th><th>ایمیل</th><th>موضوع</th><th>تاریخ</th></tr></thead>
        <tbody>
          {items.map(c => (
            <tr key={c.id}><td>{c.name}</td><td>{c.email}</td><td>{c.subject}</td><td>{new Date(c.createdAt).toLocaleString('fa-IR')}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

