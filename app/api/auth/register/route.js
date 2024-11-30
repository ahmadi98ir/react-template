// app/api/auth/register/route.js
import { db } from '../../../../lib/db';

import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  // Check if the username is already taken
  const [existingUsers] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (existingUsers.length > 0) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new admin into the database
  await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

  return NextResponse.json({ message: 'Admin user created successfully' });
}
