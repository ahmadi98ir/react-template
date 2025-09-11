// lib/db.js
import mysql from 'mysql2/promise';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  // Fail fast with a clear error to avoid accidental connections with wrong defaults
  throw new Error(
    'Database environment variables are not set. Please configure DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME.'
  );
}

export const db = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

