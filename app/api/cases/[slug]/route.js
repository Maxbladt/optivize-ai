export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const result = await pool.query('SELECT * FROM cases WHERE slug = $1', [slug]);
    if (result.rows.length === 0) return Response.json({ error: 'Case not found' }, { status: 404 });
    return Response.json(result.rows[0]);
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
