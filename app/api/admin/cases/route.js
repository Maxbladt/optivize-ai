export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';
import { verifyToken, unauthorized } from '@lib/auth';

export async function GET(request) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const result = await pool.query('SELECT * FROM cases ORDER BY sort_order ASC, created_at DESC');
    return Response.json(result.rows);
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!verifyToken(request)) return unauthorized();
  try {
    const {
      slug, title_nl, title_en, company, preview_nl, preview_en,
      description_nl, description_en, results_nl, results_en,
      detailed_results_nl, detailed_results_en,
      logo, image, partner_logos, published, sort_order
    } = await request.json();

    const result = await pool.query(
      `INSERT INTO cases (slug, title_nl, title_en, company, preview_nl, preview_en,
        description_nl, description_en, results_nl, results_en,
        detailed_results_nl, detailed_results_en,
        logo, image, partner_logos, published, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
       RETURNING *`,
      [slug, title_nl, title_en, company, preview_nl, preview_en,
        description_nl, description_en, JSON.stringify(results_nl), JSON.stringify(results_en),
        JSON.stringify(detailed_results_nl), JSON.stringify(detailed_results_en),
        logo, image, JSON.stringify(partner_logos || []), published !== false, sort_order || 0]
    );
    return Response.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error('Create case error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
