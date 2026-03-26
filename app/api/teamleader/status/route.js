export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT expires_at FROM teamleader_tokens WHERE id = 1');
    return Response.json({ connected: result.rows.length > 0 });
  } catch {
    return Response.json({ connected: false });
  }
}
