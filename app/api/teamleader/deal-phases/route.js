export const dynamic = 'force-dynamic';
import { teamleaderRequest } from '@lib/teamleader';

export async function GET() {
  try {
    const pipelinesResp = await teamleaderRequest('pipelines.list', {});
    if (pipelinesResp.error) {
      return Response.json(pipelinesResp, { status: pipelinesResp.error === 'not_connected' ? 401 : 502 });
    }
    const pipelines = pipelinesResp.data || [];

    const allPhases = [];
    for (const pl of pipelines) {
      const phasesResp = await teamleaderRequest('dealPhases.list', {
        filter: { pipeline_id: pl.id },
      });
      if (phasesResp.data) {
        allPhases.push(...phasesResp.data);
      }
    }
    return Response.json({ data: allPhases });
  } catch (err) {
    console.error('Deal phases error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
