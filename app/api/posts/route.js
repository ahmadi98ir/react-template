// app/api/posts/route.js
import { db } from '../../../lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

function requireAuth() {
  const token = cookies().get('token')?.value;
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Server misconfigured: JWT_SECRET missing');
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export async function POST(req) {
  const user = requireAuth();
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  const { title, content, image } = await req.json();
  const [result] = await db.query(
    'INSERT INTO posts (title, content, image) VALUES (?, ?, ?)',
    [title, content, image]
  );
  return new Response(JSON.stringify({ id: result.insertId }), { status: 201 });
}

export async function GET() {
  const [rows] = await db.query('SELECT * FROM posts');
  return new Response(JSON.stringify(rows), { status: 200 });
}

export async function PUT(req) {
  const user = requireAuth();
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  const { id, title, content, image } = await req.json();
  await db.query(
    'UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?',
    [title, content, image, id]
  );
  return new Response(JSON.stringify({ message: 'Post updated' }), { status: 200 });
}

export async function DELETE(req) {
  const user = requireAuth();
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  const { id } = await req.json();
  await db.query('DELETE FROM posts WHERE id = ?', [id]);
  return new Response(JSON.stringify({ message: 'Post deleted' }), { status: 200 });
}
