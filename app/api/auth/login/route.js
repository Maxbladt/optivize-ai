export const dynamic = 'force-dynamic';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { password } = await request.json();
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return Response.json({ token });
  }
  return Response.json({ error: 'Invalid password' }, { status: 401 });
}
