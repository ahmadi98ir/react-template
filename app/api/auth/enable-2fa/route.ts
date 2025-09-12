import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import type { Session } from 'next-auth'

export async function POST() {
  const session = (await getServerSession(authOptions as any)) as Session | null
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { authenticator } = await import('otplib')
  const secret = authenticator.generateSecret()
  const label = encodeURIComponent(`ahmadi98.ir:${session.user.email}`)
  const issuer = encodeURIComponent('ahmadi98.ir')
  const otpauth = `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}`

  await prisma.user.update({ where: { email: session.user.email as string }, data: { totpSecret: secret } })
  return NextResponse.json({ otpauth })
}
