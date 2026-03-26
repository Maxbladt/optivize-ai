export const dynamic = 'force-dynamic';
import { teamleaderRequest } from '@lib/teamleader';

export async function GET() {
  try {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;

    const allTasks = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await teamleaderRequest('tasks.list', {
        filter: { completed: false, due_by: lastDayStr },
        sort: [{ field: 'due_on', order: 'asc' }],
        page: { size: 100, number: page },
      });
      if (data.error) {
        return Response.json(data, { status: data.error === 'not_connected' ? 401 : 502 });
      }
      allTasks.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 5) break;
    }

    return Response.json({ data: allTasks });
  } catch (err) {
    console.error('Tasks error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
