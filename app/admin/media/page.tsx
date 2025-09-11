import { prisma } from '@/lib/prisma'

export default async function MediaAdmin() {
  const items = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <h1>مدیا</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {items.map(m => (
          <figure key={m.id} style={{ border: '1px solid #eee', padding: 8 }}>
            {m.kind === 'image' ? <img src={m.url} alt={m.alt || ''} style={{ width: '100%', height: 120, objectFit: 'cover' }} /> : m.url}
            <figcaption style={{ fontSize: 12 }}>{m.url}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

