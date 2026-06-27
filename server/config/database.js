// config/database.js
import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'serenbanka',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;