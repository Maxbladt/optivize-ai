export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';
import { verifyToken, unauthorized } from '@lib/auth';

export async function GET(request, { params }) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const { id } = await params;
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (result.rows.length === 0) return Response.json({ error: 'Blog not found' }, { status: 404 });
    return Response.json(result.rows[0]);
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const { id } = await params;
    const {
      slug, title, meta_description, meta_keywords, excerpt,
      content_html, featured_image, author, published, published_at
    } = await request.json();

    const result = await pool.query(
      `UPDATE blogs SET
        slug=$1, title=$2, meta_description=$3, meta_keywords=$4, excerpt=$5,
        content_html=$6, featured_image=$7, author=$8, published=$9, published_at=$10,
        updated_at=NOW()
       WHERE id=$11 RETURNING *`,
      [slug, title, meta_description, meta_keywords, excerpt,
        content_html, featured_image, author, published,
        published_at || (published ? new Date().toISOString() : null), id]
    );
    if (result.rows.length === 0) return Response.json({ error: 'Blog not found' }, { status: 404 });
    return Response.json(result.rows[0]);
  } catch (err) {
    console.error('Update blog error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const { id } = await params;
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return Response.json({ error: 'Blog not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
