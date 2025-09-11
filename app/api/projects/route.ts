import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const items = await prisma.project.findMany({ where: { published: true }, orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const data = await req.json()
  const created = await prisma.project.create({ data })
  return NextResponse.json(created, { status: 201 })
}

export async function PUT(req: Request) {
  const { id, ...rest } = await req.json()
  const updated = await prisma.project.update({ where: { id }, data: rest })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

