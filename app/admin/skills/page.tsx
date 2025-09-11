import { prisma } from '@/lib/prisma'

async function addSkill(formData: FormData) {
  'use server'
  const name = String(formData.get('name') || '')
  const level = Number(formData.get('level') || 1)
  const category = String(formData.get('category') || '')
  await prisma.skill.create({ data: { name, level, category } })
}

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } })
  return (
    <div>
      <h1>مهارت‌ها</h1>
      <form action={addSkill} style={{ margin: '12px 0', display: 'flex', gap: 8 }}>
        <input name="name" placeholder="نام" />
        <input name="category" placeholder="دسته" />
        <input name="level" type="number" min={1} max={5} defaultValue={3} />
        <button type="submit">افزودن</button>
      </form>
      <ul>
        {skills.map(s => (
          <li key={s.id}>{s.name} — {s.category} — {s.level}/5</li>
        ))}
      </ul>
    </div>
  )
}

