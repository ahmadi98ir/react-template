import { prisma } from '@/lib/prisma'

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
  return (
    <div>
      <h1>پروژه‌ها</h1>
      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.title} — {p.published ? 'منتشر شده' : 'پیش‌نویس'}</li>
        ))}
      </ul>
    </div>
  )
}

