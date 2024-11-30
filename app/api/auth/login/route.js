// app/api/auth/login/route.js
import { db } from '../../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = 'your_jwt_secret'; // Use environment variables in production

export async function POST(req) {
  const { username, password } = await req.json();

  // Find the admin in the database
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  const admin = rows[0];

  if (!admin) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Verify the password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Create JWT
  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
    expiresIn: '1h',
  });

  // Set JWT as a cookie
  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, { httpOnly: true, maxAge: 60 * 60 });

  return response;
}
