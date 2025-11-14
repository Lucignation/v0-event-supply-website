// Server-side only - uses jsonwebtoken for JWT operations
import { createBrowserClient } from '@supabase/ssr'

// Only import jsonwebtoken on the server side
const getJWT = async () => {
  if (typeof window !== 'undefined') {
    return null
  }
  try {
    const jwt = await import('jsonwebtoken')
    return jwt
  } catch (error) {
    return null
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

// Only use on server side
export async function generateToken(payload: any) {
  if (typeof window !== 'undefined') {
    throw new Error('generateToken should only be called on the server')
  }
  const jwt = await getJWT()
  if (!jwt) throw new Error('JWT library not available')
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export async function verifyToken(token: string) {
  if (typeof window !== 'undefined') {
    return null
  }
  try {
    const jwt = await getJWT()
    if (!jwt) return null
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Password hashing functions - can be used on server
export async function hashPassword(password: string) {
  if (typeof window !== 'undefined') {
    throw new Error('hashPassword should only be called on the server')
  }
  const bcryptjs = await import('bcryptjs')
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

export async function comparePassword(password: string, hash: string) {
  if (typeof window !== 'undefined') {
    throw new Error('comparePassword should only be called on the server')
  }
  const bcryptjs = await import('bcryptjs')
  return bcryptjs.compare(password, hash)
}
