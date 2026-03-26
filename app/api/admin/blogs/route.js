export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';
import { verifyToken, unauthorized } from '@lib/auth';

export async function GET(request) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    return Response.json(result.rows);
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const {
      slug, title, meta_description, meta_keywords, excerpt,
      content_html, featured_image, author, published, published_at
    } = await request.json();

    const result = await pool.query(
      `INSERT INTO blogs (slug, title, meta_description, meta_keywords, excerpt,
        content_html, featured_image, author, published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [slug, title, meta_description, meta_keywords, excerpt,
        content_html, featured_image, author || 'Optivaize', published || false,
        published_at || (published ? new Date().toISOString() : null)]
    );
    return Response.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error('Create blog error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
