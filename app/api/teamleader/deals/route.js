export const dynamic = 'force-dynamic';
import { teamleaderRequest } from '@lib/teamleader';

export async function GET() {
  try {
    const data = await teamleaderRequest('deals.list', {
      filter: { status: ['open'] },
      sort: [{ field: 'weighted_value', order: 'desc' }],
      page: { size: 50, number: 1 },
      include: 'lead.customer,responsible_user',
    });
    if (data.error) {
      return Response.json(data, { status: data.error === 'not_connected' ? 401 : 502 });
    }
    return Response.json(data);
  } catch (err) {
    console.error('Deals error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
