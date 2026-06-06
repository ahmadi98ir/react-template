import { db } from '@/drizzle/db'
import { profile } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

async function saveProfile(formData: FormData) {
  'use server'
  const fullName = String(formData.get('fullName') || '')
  const title = String(formData.get('title') || '')
  const bioMarkdown = String(formData.get('bioMarkdown') || '')
  const location = String(formData.get('location') || '')
  await db.insert(profile)
    .values({ id: 'default', fullName, title, bioMarkdown, location })
    .onConflictDoUpdate({ target: profile.id, set: { fullName, title, bioMarkdown, location } })
  revalidatePath('/admin/profile')
}

export default async function ProfileAdmin() {
  let p: typeof profile.$inferSelect | undefined
  try {
    const [found] = await db.select().from(profile).where(eq(profile.id, 'default')).limit(1)
    p = found
  } catch { /* DB not yet available */ }

  return (
    <div>
      <h1>Profile</h1>
      <form action={saveProfile} style={{ display: 'grid', gap: 8, maxWidth: 640 }}>
        <input name="fullName" placeholder="Full name" defaultValue={p?.fullName || ''} />
        <input name="title" placeholder="Title" defaultValue={p?.title || ''} />
        <input name="location" placeholder="Location" defaultValue={p?.location || ''} />
        <textarea name="bioMarkdown" placeholder="Bio (Markdown)" rows={8} defaultValue={p?.bioMarkdown || ''} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
