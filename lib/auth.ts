import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

export function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function hashPassword(password: string) {
  // TODO: Use bcrypt for password hashing
  return password
}

export async function comparePassword(password: string, hash: string) {
  // TODO: Use bcrypt for password comparison
  return password === hash
}
