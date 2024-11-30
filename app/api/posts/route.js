// app/api/posts/route.js
import { db } from '../../../lib/db';

export async function POST(req) {
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
  const { id, title, content, image } = await req.json();
  await db.query(
    'UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?',
    [title, content, image, id]
  );
  return new Response(JSON.stringify({ message: 'Post updated' }), { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  await db.query('DELETE FROM posts WHERE id = ?', [id]);
  return new Response(JSON.stringify({ message: 'Post deleted' }), { status: 200 });
}

