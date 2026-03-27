export const dynamic = 'force-dynamic';
import { verifyToken, unauthorized } from '@lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  if (!verifyToken(request)) return unauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) return Response.json({ error: 'No file uploaded' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);
    const name = file.name.replace(ext, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${name}_${Date.now()}${ext}`;

    // Write to pictures_good/ which is served via /uploads/ rewrite
    const uploadsDir = path.join(process.cwd(), 'pictures_good');
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, filename), buffer);

    return Response.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error('Upload error:', err);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
