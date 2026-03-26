import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};

export async function GET(request, { params }) {
  const filePath = (await params).path.join('/');

  // Try pictures_good directory first (volume mount in Docker)
  const picturesGoodPath = path.join(process.cwd(), 'pictures_good', filePath);

  const tryPaths = [picturesGoodPath];

  for (const tryPath of tryPaths) {
    try {
      await fs.promises.access(tryPath, fs.constants.R_OK);
      const data = await fs.promises.readFile(tryPath);
      const ext = path.extname(tryPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      return new NextResponse(data, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=2592000',
        },
      });
    } catch {
      continue;
    }
  }

  return new NextResponse('Not found', { status: 404 });
}
