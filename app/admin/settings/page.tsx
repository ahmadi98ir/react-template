import { prisma } from '@/lib/prisma'

async function setSettings(formData: FormData) {
  'use server'
  const theme = String(formData.get('theme') || 'system') as any
  const gtagId = String(formData.get('gtagId') || '')
  await prisma.siteSetting.upsert({
    where: { id: 'default-settings' },
    update: { theme, gtagId },
    create: { id: 'default-settings', theme, gtagId },
  })
}

export default async function SettingsAdmin() {
  const s = await prisma.siteSetting.findUnique({ where: { id: 'default-settings' } })
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

