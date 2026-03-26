import jwt from 'jsonwebtoken';

export function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
