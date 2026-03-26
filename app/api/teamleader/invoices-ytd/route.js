export const dynamic = 'force-dynamic';
import { teamleaderRequest } from '@lib/teamleader';

export async function GET() {
  try {
    const now = new Date();
    const firstDay = `${now.getFullYear()}-01-01`;
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const allInvoices = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await teamleaderRequest('invoices.list', {
        filter: { invoice_date_after: firstDay, invoice_date_before: today },
        page: { size: 100, number: page },
      });
      if (data.error) {
        return Response.json(data, { status: data.error === 'not_connected' ? 401 : 502 });
      }
      allInvoices.push(...(data.data || []));
      const meta = data.meta;
      hasMore = meta && meta.page && (meta.page.number * meta.page.size < meta.matches);
      page++;
      if (page > 20) break;
    }

    return Response.json({ data: allInvoices });
  } catch (err) {
    console.error('Invoices YTD error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
