export const dynamic = 'force-dynamic';
import { teamleaderRequest } from '@lib/teamleader';

export async function GET() {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 0);

    const mondayStr = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}T00:00:00+00:00`;
    const sundayStr = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, '0')}-${String(sunday.getDate()).padStart(2, '0')}T23:59:59+00:00`;

    const allEntries = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
      const data = await teamleaderRequest('timeTracking.list', {
        filter: { started_after: mondayStr, started_before: sundayStr },
        page: { size: 100, number: page },
      });
      if (data.error) return Response.json(data, { status: data.error === 'not_connected' ? 401 : 502 });
      allEntries.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 5) break;
    }
    return Response.json({ data: allEntries });
  } catch (err) {
    console.error('Time tracking week error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
