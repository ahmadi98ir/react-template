import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'

export async function GET() {
  const items = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || 'unknown'
  const rl = rateLimit({ id: `contact:${ip}`, limit: 5, windowMs: 60_000 })
  if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  const form = await req.formData()
  const name = (form.get('نام و نام خانوادگی') || form.get('name') || '').toString()
  const email = (form.get('آدرس ایمیل') || form.get('email') || '').toString()
  const subject = (form.get('subject') || '').toString()
  const message = (form.get('message') || '').toString()
  await prisma.contactMessage.create({ data: { name, email, subject, message } })
  const url = new URL('/contact?success=1', req.url)
  return NextResponse.redirect(url, { status: 303 })
}

