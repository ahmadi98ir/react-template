import { db } from '@/drizzle/db'
import { skills } from '@/drizzle/schema'
import { asc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

async function addSkill(formData: FormData) {
  'use server'
  const name = String(formData.get('name') || '')
  const category = String(formData.get('category') || '')
  const proficiency = Number(formData.get('proficiency') || 80)
  await db.insert(skills).values({ name, category, proficiency })
  revalidatePath('/admin/skills')
}

export default async function SkillsPage() {
  let allSkills: (typeof skills.$inferSelect)[] = []
  try {
    allSkills = await db.select().from(skills).orderBy(asc(skills.order))
  } catch { /* DB not yet available */ }

  return (
    <div>
      <h1>مهارت‌ها</h1>
      <form action={addSkill} style={{ margin: '12px 0', display: 'flex', gap: 8 }}>
        <input name="name" placeholder="نام" required />
        <input name="category" placeholder="دسته" required />
        <input name="proficiency" type="number" min={0} max={100} defaultValue={80} placeholder="مهارت %" />
        <button type="submit">افزودن</button>
      </form>
      <ul>
        {allSkills.map(s => (
          <li key={s.id}>{s.name} — {s.category} — {s.proficiency}%</li>
        ))}
      </ul>
    </div>
  )
}
