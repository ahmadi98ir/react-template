import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const data = await req.json()
  const created = await prisma.blogPost.create({ data })
  return NextResponse.json(created, { status: 201 })
}

export async function PUT(req: Request) {
  const { id, ...rest } = await req.json()
  const updated = await prisma.blogPost.update({ where: { id }, data: rest })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await prisma.blogPost.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
