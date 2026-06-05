import { db } from '@/drizzle/db'
import { siteSettings } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

async function setSettings(formData: FormData) {
  'use server'
  const theme = String(formData.get('theme') || 'system') as 'dark' | 'light' | 'system'
  const gtagId = String(formData.get('gtagId') || '')
  await db.insert(siteSettings)
    .values({ id: 'default', theme, gtagId })
    .onConflictDoUpdate({ target: siteSettings.id, set: { theme, gtagId } })
  revalidatePath('/admin/settings')
}

export default async function SettingsAdmin() {
  let s: typeof siteSettings.$inferSelect | undefined
  try {
    const [found] = await db.select().from(siteSettings).where(eq(siteSettings.id, 'default')).limit(1)
    s = found
  } catch { /* DB not yet available */ }

  return (
    <div>
      <h1>تنظیمات</h1>
      <form action={setSettings} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <label>Theme
          <select name="theme" defaultValue={s?.theme || 'system'}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label>Google Tag ID
          <input name="gtagId" defaultValue={s?.gtagId || ''} />
        </label>
        <button type="submit">ذخیره</button>
      </form>
    </div>
  )
}
