export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM cases WHERE published = true ORDER BY sort_order ASC, created_at DESC'
    );
    return Response.json(result.rows);
  } catch (err) {
    console.error('Get cases error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
