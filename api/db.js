import mysql from 'mysql2/promise';

// Railway MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || process.env.RAILWAY_MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || process.env.RAILWAY_MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || process.env.RAILWAY_MYSQL_USER,
  password: process.env.MYSQL_PASSWORD || process.env.RAILWAY_MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || process.env.RAILWAY_MYSQL_DATABASE || 'railway',
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

export default pool;
