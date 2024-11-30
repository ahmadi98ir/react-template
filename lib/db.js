// lib/db.js
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: '65.109.179.201' ,
  port: 3306,
  user: 'root',
  password: 'Hajiazz021+8',
  database: 'ahmadi98',
});


