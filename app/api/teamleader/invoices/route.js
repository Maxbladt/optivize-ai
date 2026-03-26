export const dynamic = 'force-dynamic';
import { teamleaderRequest } from '@lib/teamleader';

export async function GET() {
  try {
    const now = new Date();
    const firstDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastDayStr = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;

    const allInvoices = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await teamleaderRequest('invoices.list', {
        filter: { invoice_date_after: firstDay, invoice_date_before: lastDayStr },
        page: { size: 100, number: page },
      });
      if (data.error) {
        return Response.json(data, { status: data.error === 'not_connected' ? 401 : 502 });
      }
      allInvoices.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 10) break;
    }

    return Response.json({ data: allInvoices });
  } catch (err) {
    console.error('Invoices error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
