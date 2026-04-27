export const dynamic = 'force-dynamic';

import { pool } from '@lib/db';
import { getCase } from '@lib/voice-cases';

const SESSIONS_PER_IP_PER_HOUR = 3;
const SESSION_DURATION_SECONDS = 180; // 3 minute hard cap

function getClientIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: 'OpenAI API key niet geconfigureerd' }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  const caseKey = body?.case;
  const useCase = getCase(caseKey);
  if (!useCase) {
    return Response.json({ error: 'Onbekende use case' }, { status: 400 });
  }

  const ip = getClientIp(request);

  const { rows } = await pool.query(
    "SELECT COUNT(*)::int AS n FROM voice_assistant_sessions WHERE ip = $1 AND created_at > NOW() - INTERVAL '1 hour'",
    [ip]
  );
  if (rows[0].n >= SESSIONS_PER_IP_PER_HOUR) {
    return Response.json(
      {
        error: 'Demo limiet bereikt',
        message: 'Je hebt het maximum aantal demo gesprekken voor dit uur bereikt. Probeer het over een uur opnieuw of neem contact met ons op.',
      },
      { status: 429 }
    );
  }

  const instructions = typeof useCase.instructions === 'function'
    ? useCase.instructions()
    : useCase.instructions;

  const sessionConfig = {
    type: 'realtime',
    model: 'gpt-realtime',
    instructions,
    audio: {
      output: { voice: useCase.voice || 'marin' },
    },
    tools: useCase.tools,
    tool_choice: 'auto',
  };

  let openaiResp;
  try {
    openaiResp = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expires_after: { anchor: 'created_at', seconds: 600 },
        session: sessionConfig,
      }),
    });
  } catch (err) {
    console.error('OpenAI fetch error:', err);
    return Response.json({ error: 'Kon geen verbinding maken met de spraakservice' }, { status: 502 });
  }

  if (!openaiResp.ok) {
    const text = await openaiResp.text();
    console.error('OpenAI error', openaiResp.status, text);
    return Response.json({ error: 'Spraakservice gaf een fout terug', details: text }, { status: 502 });
  }

  const data = await openaiResp.json();

  await pool.query(
    'INSERT INTO voice_assistant_sessions (ip, case_key) VALUES ($1, $2)',
    [ip, caseKey]
  );

  return Response.json({
    client_secret: data.value || data.client_secret?.value || data.client_secret,
    expires_at: data.expires_at || data.client_secret?.expires_at,
    model: 'gpt-realtime',
    case: caseKey,
    max_session_seconds: SESSION_DURATION_SECONDS,
  });
}
