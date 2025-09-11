import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const form = await req.formData();
    // Extract basic fields (names are in Farsi in the form labels, but we read by ids)
    const name = form.get('نام و نام خانوادگی') || form.get('name') || '';
    const email = form.get('آدرس ایمیل') || form.get('email') || '';
    const phone = form.get('تلفن شما') || form.get('phone_number') || '';
    const subject = form.get('subject') || '';
    const message = form.get('message') || '';

    // TODO: send email or persist to DB
    // For now, just acknowledge and redirect back with a success flag.
    const url = new URL('/contact?success=1', req.url);
    return NextResponse.redirect(url, { status: 303 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}

