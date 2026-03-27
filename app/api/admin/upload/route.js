export const dynamic = 'force-dynamic';
import { verifyToken, unauthorized } from '@lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'];

export async function POST(request) {
  if (!verifyToken(request)) return unauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) return Response.json({ error: 'No file uploaded' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);

    const ext = path.extname(file.name).toLowerCase();
    const name = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');

    const uploadsDir = path.join(process.cwd(), 'pictures_good');
    await mkdir(uploadsDir, { recursive: true });

    // Auto-convert images to WebP for faster loading
    if (IMAGE_EXTS.includes(ext)) {
      const filename = `${name}_${Date.now()}.webp`;
      const sharp = (await import('sharp')).default;
      buffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
      await writeFile(path.join(uploadsDir, filename), buffer);
      return Response.json({ url: `/uploads/${filename}` });
    }

    // Non-image files (PDF, etc.) saved as-is
    const filename = `${name}_${Date.now()}${ext}`;
    await writeFile(path.join(uploadsDir, filename), buffer);
    return Response.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error('Upload error:', err);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
