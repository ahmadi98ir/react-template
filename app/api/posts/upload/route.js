// app/api/posts/upload/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('files') || formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const mime = file.type;
    const size = file.size ?? 0;
    if (!ALLOWED_TYPES.has(mime)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }
    if (size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const ext = mime === 'image/png' ? '.png' : mime === 'image/webp' ? '.webp' : '.jpg';
    const random = crypto.randomBytes(8).toString('hex');
    const filename = `${Date.now()}-${random}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filepath, buffer);

    return NextResponse.json({ imageUrl: `/uploads/${filename}` }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
