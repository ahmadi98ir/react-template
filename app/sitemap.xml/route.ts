import { prisma } from '@/lib/prisma'

export async function GET() {
  const base = process.env.NEXTAUTH_URL || 'https://ahmadi98.ir'
  const items: string[] = [
    '/', '/about', '/contact', '/projects', '/blog'
  ]
  const projects = await prisma.project.findMany({ where: { published: true } })
  const posts = await prisma.blogPost.findMany({ where: { published: true } })
  const urls = [
    ...items.map((p) => `${base}${p}`),
    ...projects.map((p) => `${base}/projects/${p.slug}`),
    ...posts.map((b) => `${base}/blog/${b.slug}`),
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `<url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>`
  return new Response(body, { status: 200, headers: { 'Content-Type': 'application/xml' } })
}

