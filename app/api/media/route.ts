import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(media)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await prisma.media.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

