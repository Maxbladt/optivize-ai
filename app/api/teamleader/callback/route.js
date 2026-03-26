export const dynamic = 'force-dynamic';
import { pool } from '@lib/db';
import { TEAMLEADER_CLIENT_ID, TEAMLEADER_CLIENT_SECRET, TEAMLEADER_REDIRECT_URI } from '@lib/teamleader';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return Response.json({ error: error || 'No authorization code received' }, { status: 400 });
  }

  try {
    const resp = await fetch('https://focus.teamleader.eu/oauth2/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: TEAMLEADER_CLIENT_ID,
        client_secret: TEAMLEADER_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: TEAMLEADER_REDIRECT_URI,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('Token exchange failed:', text);
      return Response.json({ error: 'Token exchange failed' }, { status: 400 });
    }

    const data = await resp.json();
    const expiresAt = new Date(Date.now() + data.expires_in * 1000);

    await pool.query(
      `INSERT INTO teamleader_tokens (id, access_token, refresh_token, expires_at)
       VALUES (1, $1, $2, $3)
       ON CONFLICT (id) DO UPDATE SET access_token = $1, refresh_token = $2, expires_at = $3, updated_at = NOW()`,
      [data.access_token, data.refresh_token, expiresAt]
    );

    redirect('/stats/123121221213213?connected=true');
  } catch (err) {
    if (err?.digest?.startsWith('NEXT_REDIRECT')) throw err;
    console.error('OAuth callback error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
