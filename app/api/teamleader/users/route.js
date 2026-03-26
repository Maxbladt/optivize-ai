export const dynamic = 'force-dynamic';
import { teamleaderRequest } from '@lib/teamleader';

export async function GET() {
  try {
    const data = await teamleaderRequest('users.list', {
      page: { size: 100, number: 1 },
    });
    if (data.error) {
      return Response.json(data, { status: data.error === 'not_connected' ? 401 : 502 });
    }
    return Response.json(data);
  } catch (err) {
    console.error('Users error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
