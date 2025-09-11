import { prisma } from '@/lib/prisma'

export default async function BlogAdmin() {
  const posts = await prisma.blogPost.findMany({ orderBy: [{ publishedAt: 'desc' }] })
  return (
    <div>
      <h1>بلاگ</h1>
      <ul>
        {posts.map(p => (
          <li key={p.id}>{p.title} — {p.published ? 'منتشر شده' : 'پیش‌نویس'}</li>
        ))}
      </ul>
    </div>
  )
}

