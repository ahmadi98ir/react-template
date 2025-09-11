import { prisma } from '@/lib/prisma'

async function saveProfile(formData: FormData) {
  'use server'
  const fullName = String(formData.get('fullName') || '')
  const title = String(formData.get('title') || '')
  const bioMarkdown = String(formData.get('bioMarkdown') || '')
  const location = String(formData.get('location') || '')
  await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: { fullName, title, bioMarkdown, location },
    create: { id: 'default-profile', fullName, title, bioMarkdown, location },
  })
}

export default async function ProfileAdmin() {
  const p = await prisma.profile.findUnique({ where: { id: 'default-profile' } })
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

