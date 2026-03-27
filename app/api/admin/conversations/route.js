export const dynamic = 'force-dynamic';
import { verifyToken, unauthorized } from '@lib/auth';
import { pool } from '@lib/db';

export async function GET(request) {
  if (!verifyToken(request)) return unauthorized();

  try {
    const sessions = await pool.query(`
      SELECT
        m.session_id,
        m.agent_id,
        COUNT(*) as message_count,
        MIN(m.created_at) as first_message,
        MAX(m.created_at) as last_message,
        (SELECT content FROM chat_messages m2 WHERE m2.session_id = m.session_id AND m2.role = 'user' ORDER BY m2.created_at ASC LIMIT 1) as first_user_message,
        s.device,
        s.language as user_language,
        s.page_url,
        s.screen_width,
        s.screen_height,
        s.ip,
        s.referrer,
        s.user_agent,
        s.created_at as session_created
      FROM chat_messages m
      LEFT JOIN chat_sessions s ON s.session_id = m.session_id
      GROUP BY m.session_id, m.agent_id, s.device, s.language, s.page_url, s.screen_width, s.screen_height, s.ip, s.referrer, s.user_agent, s.created_at
      ORDER BY MAX(m.created_at) DESC
      LIMIT 100
    `);

    return Response.json(sessions.rows);
  } catch (err) {
    console.error('Conversations list error:', err);
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
