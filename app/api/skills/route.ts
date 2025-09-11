import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({ name: z.string(), level: z.number().min(1).max(5), category: z.string().optional(), order: z.number().optional() })

export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(skills)
}

export async function POST(req: Request) {
  const json = await req.json()
  const data = schema.parse(json)
  const created = await prisma.skill.create({ data })
  return NextResponse.json(created, { status: 201 })
}

export async function PUT(req: Request) {
  const json = await req.json()
  const { id, ...rest } = json
  const updated = await prisma.skill.update({ where: { id }, data: rest })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await prisma.skill.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

