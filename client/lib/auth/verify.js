import { jwtVerify } from 'jose';

export async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    return await jwtVerify(token, secret);
  } catch (error) {
    return null;
  }
}