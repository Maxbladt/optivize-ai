export const dynamic = 'force-dynamic';
import { TEAMLEADER_CLIENT_ID, TEAMLEADER_REDIRECT_URI } from '@lib/teamleader';
import { redirect } from 'next/navigation';

export async function GET() {
  const params = new URLSearchParams({
    client_id: TEAMLEADER_CLIENT_ID,
    response_type: 'code',
    redirect_uri: TEAMLEADER_REDIRECT_URI,
  });
  redirect(`https://focus.teamleader.eu/oauth2/authorize?${params}`);
}
