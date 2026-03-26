export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, slug, title, meta_description, meta_keywords, excerpt, featured_image,
              author, published_at, created_at
       FROM blogs WHERE published = true
       ORDER BY published_at DESC`
    );
    return Response.json(result.rows);
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
