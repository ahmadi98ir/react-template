import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { token } = await req.json()
  const user = await prisma.user.findUnique({ where: { id: session.user.id as string } })
  if (!user?.totpSecret) return NextResponse.json({ error: '2FA not enabled' }, { status: 400 })
  const { authenticator } = await import('otplib')
  const valid = authenticator.verify({ token, secret: user.totpSecret })
  if (!valid) return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  return NextResponse.json({ ok: true })
}

