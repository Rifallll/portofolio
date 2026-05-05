import pool from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const [rows] = await pool.query(
      'SELECT * FROM experience ORDER BY created_at DESC'
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.error('DB Error /api/experience:', err);
    return res.status(500).json({ error: 'Database error', detail: err.message });
  }
}
