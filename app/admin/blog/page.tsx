import { db } from '@/drizzle/db'
import { posts } from '@/drizzle/schema'
import { desc } from 'drizzle-orm'
import type { I18n } from '@/drizzle/schema'

export default async function BlogAdmin() {
  let allPosts: (typeof posts.$inferSelect)[] = []
  try {
    allPosts = await db.select().from(posts).orderBy(desc(posts.publishedAt))
  } catch { /* DB not yet available */ }

  return (
    <div>
      <h1>بلاگ</h1>
      <ul>
        {allPosts.map(p => {
          const title = (p.title as I18n)?.fa || (p.title as I18n)?.en || 'بدون عنوان'
          return (
            <li key={p.id}>{title} — {p.published ? 'منتشر شده' : 'پیش‌نویس'}</li>
          )
        })}
      </ul>
    </div>
  )
}
