export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';

export async function POST(request) {
  try {
    const { sessionId, agentId, messages, meta } = await request.json();
    if (!sessionId || !agentId || !messages?.length) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Get IP from headers
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const client = await pool.connect();
    try {
      // Upsert session with metadata + IP
      await client.query(`
        INSERT INTO chat_sessions (session_id, user_agent, device, page_url, referrer, screen_width, screen_height, language, ip, last_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
        ON CONFLICT (session_id) DO UPDATE SET last_active = NOW(), page_url = COALESCE($4, chat_sessions.page_url), ip = COALESCE($9, chat_sessions.ip)
      `, [
        sessionId,
        meta?.userAgent || null,
        meta?.device || null,
        meta?.pageUrl || null,
        meta?.referrer || null,
        meta?.screenWidth || null,
        meta?.screenHeight || null,
        meta?.language || null,
        ip,
      ]);

      // Save messages
      for (const msg of messages) {
        await client.query(
          'INSERT INTO chat_messages (session_id, agent_id, role, content, created_at) VALUES ($1, $2, $3, $4, $5)',
          [sessionId, agentId, msg.role, msg.content, msg.timestamp ? new Date(msg.timestamp) : new Date()]
        );
      }
    } finally {
      client.release();
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Chat save error:', err);
    return Response.json({ error: 'Save failed' }, { status: 500 });
  }
}
