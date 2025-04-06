"use client";
import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = pool;

export async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to execute query.');
  }
}

export async function closePool() {
  await pool.end();
}

// Middleware برای بررسی اتصال به پایگاه داده
export async function checkDatabaseConnection(req, res, next) {
  try {
    await pool.getConnection();
    return next();
  } catch (error) {
    console.error('Database Connection Error:', error);
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}