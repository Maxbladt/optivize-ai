import { pool } from './db.js';

const TEAMLEADER_CLIENT_ID = process.env.TEAMLEADER_CLIENT_ID;
const TEAMLEADER_CLIENT_SECRET = process.env.TEAMLEADER_CLIENT_SECRET;
const TEAMLEADER_REDIRECT_URI = process.env.TEAMLEADER_REDIRECT_URI || 'https://optivaize.nl/api/teamleader/callback';

export async function refreshTeamleaderToken(refreshToken) {
  const resp = await fetch('https://focus.teamleader.eu/oauth2/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: TEAMLEADER_CLIENT_ID,
      client_secret: TEAMLEADER_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    console.error('Token refresh failed:', resp.status, text);
    return null;
  }
  const data = await resp.json();
  const newExpiresAt = new Date(Date.now() + data.expires_in * 1000);
  await pool.query(
    'UPDATE teamleader_tokens SET access_token = $1, refresh_token = $2, expires_at = $3, updated_at = NOW() WHERE id = 1',
    [data.access_token, data.refresh_token, newExpiresAt]
  );
  return data.access_token;
}

export async function getValidToken() {
  const result = await pool.query('SELECT * FROM teamleader_tokens WHERE id = 1');
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  const expiresAt = new Date(row.expires_at);
  if (expiresAt.getTime() - Date.now() < 5 * 60 * 1000) {
    try {
      return await refreshTeamleaderToken(row.refresh_token);
    } catch (err) {
      console.error('Token refresh error:', err);
      return null;
    }
  }
  return row.access_token;
}

export async function teamleaderRequest(endpoint, body = {}) {
  const token = await getValidToken();
  if (!token) return { error: 'not_connected' };

  let resp = await fetch(`https://api.focus.teamleader.eu/${endpoint}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (resp.status === 401) {
    const row = (await pool.query('SELECT refresh_token FROM teamleader_tokens WHERE id = 1')).rows[0];
    if (!row) return { error: 'not_connected' };
    const newToken = await refreshTeamleaderToken(row.refresh_token);
    if (!newToken) return { error: 'not_connected' };
    resp = await fetch(`https://api.focus.teamleader.eu/${endpoint}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${newToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  if (!resp.ok) {
    const text = await resp.text();
    console.error(`Teamleader API error (${endpoint}):`, resp.status, text);
    return { error: 'api_error', status: resp.status, details: text };
  }
  return resp.json();
}

export { TEAMLEADER_CLIENT_ID, TEAMLEADER_CLIENT_SECRET, TEAMLEADER_REDIRECT_URI };
