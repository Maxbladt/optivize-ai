export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';
import { verifyToken, unauthorized } from '@lib/auth';

export async function PUT(request, { params }) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const { id } = await params;
    const {
      slug, title_nl, title_en, company, preview_nl, preview_en,
      description_nl, description_en, results_nl, results_en,
      detailed_results_nl, detailed_results_en,
      logo, image, partner_logos, published, sort_order
    } = await request.json();

    const result = await pool.query(
      `UPDATE cases SET
        slug=$1, title_nl=$2, title_en=$3, company=$4, preview_nl=$5, preview_en=$6,
        description_nl=$7, description_en=$8, results_nl=$9, results_en=$10,
        detailed_results_nl=$11, detailed_results_en=$12,
        logo=$13, image=$14, partner_logos=$15, published=$16, sort_order=$17,
        updated_at=NOW()
       WHERE id=$18 RETURNING *`,
      [slug, title_nl, title_en, company, preview_nl, preview_en,
        description_nl, description_en, JSON.stringify(results_nl), JSON.stringify(results_en),
        JSON.stringify(detailed_results_nl), JSON.stringify(detailed_results_en),
        logo, image, JSON.stringify(partner_logos || []), published, sort_order || 0, id]
    );
    if (result.rows.length === 0) return Response.json({ error: 'Case not found' }, { status: 404 });
    return Response.json(result.rows[0]);
  } catch (err) {
    console.error('Update case error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const { id } = await params;
    const result = await pool.query('DELETE FROM cases WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return Response.json({ error: 'Case not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
