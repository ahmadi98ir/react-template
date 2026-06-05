import { db } from '@/drizzle/db'
import { projects } from '@/drizzle/schema'
import { asc, desc } from 'drizzle-orm'
import type { I18n } from '@/drizzle/schema'

export default async function ProjectsAdmin() {
  let allProjects: (typeof projects.$inferSelect)[] = []
  try {
    allProjects = await db.select().from(projects).orderBy(asc(projects.order), desc(projects.createdAt))
  } catch { /* DB not yet available */ }

  return (
    <div>
      <h1>پروژه‌ها</h1>
      <ul>
        {allProjects.map(p => {
          const title = (p.title as I18n)?.fa || (p.title as I18n)?.en || 'بدون عنوان'
          return (
            <li key={p.id}>{title} — {p.published ? 'منتشر شده' : 'پیش‌نویس'}</li>
          )
        })}
      </ul>
    </div>
  )
}
