import { db } from '@/drizzle/db'
import { projects, posts } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://ahmadi98.ir'
  const staticPaths = ['/', '/about', '/contact', '/projects', '/blog']

  let allProjects: { slug: string }[] = []
  let allPosts: { slug: string }[] = []
  try {
    ;[allProjects, allPosts] = await Promise.all([
      db.select({ slug: projects.slug }).from(projects).where(eq(projects.published, true)),
      db.select({ slug: posts.slug }).from(posts).where(eq(posts.published, true)),
    ])
  } catch { /* DB not yet available */ }

  const urls = [
    ...staticPaths.map((p) => `${base}${p}`),
    ...allProjects.map((p) => `${base}/projects/${p.slug}`),
    ...allPosts.map((b) => `${base}/blog/${b.slug}`),
  ]

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((u) => `<url><loc>${u}</loc></url>`),
    '</urlset>',
  ].join('\n')

  return new Response(body, { status: 200, headers: { 'Content-Type': 'application/xml' } })
}
