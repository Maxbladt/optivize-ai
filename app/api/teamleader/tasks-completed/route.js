export const dynamic = 'force-dynamic';
import { teamleaderRequest } from '@lib/teamleader';

export async function GET() {
  try {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const firstDay = `${threeMonthsAgo.getFullYear()}-${String(threeMonthsAgo.getMonth() + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;

    const allTasks = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
      const data = await teamleaderRequest('tasks.list', {
        filter: { completed: true, due_from: firstDay, due_by: lastDayStr },
        page: { size: 100, number: page },
      });
      if (data.error) return Response.json(data, { status: data.error === 'not_connected' ? 401 : 502 });
      allTasks.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 10) break;
    }

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const filtered = allTasks.filter(t => {
      if (!t.completed_at) return false;
      return new Date(t.completed_at) >= monthStart;
    });

    return Response.json({ data: filtered });
  } catch (err) {
    console.error('Completed tasks error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
