export const dynamic = 'force-dynamic';
import { verifyToken, unauthorized } from '@lib/auth';
import { pool } from '@lib/db';

export async function GET(request, { params }) {
  if (!verifyToken(request)) return unauthorized();

  try {
    const { sessionId } = await params;
    const messages = await pool.query(
      'SELECT agent_id, role, content, created_at FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC',
      [sessionId]
    );
    return Response.json(messages.rows);
  } catch (err) {
    console.error('Conversation detail error:', err);
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
