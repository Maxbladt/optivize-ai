import { NextResponse } from 'next/server';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'optivaize-indexnow-key';

export async function GET() {
  return new NextResponse(INDEXNOW_KEY, {
    headers: { 'Content-Type': 'text/plain' },
  });
}

export async function POST(request) {
  try {
    const { urls } = await request.json();
    if (!urls || !urls.length) {
      return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });
    }

    const payload = {
      host: 'optivaize.nl',
      key: INDEXNOW_KEY,
      keyLocation: 'https://optivaize.nl/api/indexnow',
      urlList: urls,
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ status: res.status, submitted: urls.length });
  } catch (err) {
    return NextResponse.json({ error: 'IndexNow submission failed' }, { status: 500 });
  }
}
