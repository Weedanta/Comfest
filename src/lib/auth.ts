import { NextRequest } from 'next/server'

export interface AuthUser {
  userId: string
  email: string
  name: string
  role: string
  isAdmin: boolean
}

export function getUserFromRequest(request: NextRequest): AuthUser {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  
  if (!token) {
    throw new Error('No token provided')
  }
  
  try {
    // Manual JWT decode (server-side safe)
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid token format')
    }
    
    const payload = JSON.parse(atob(parts[1]))
    
    // Verify expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) {
      throw new Error('Token expired')
    }
    
    return {
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      isAdmin: payload.isAdmin
    }
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Helper untuk generate token (gunakan di API routes)
export function generateTokenPayload(user: any) {
  const now = Math.floor(Date.now() / 1000)
  
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isAdmin: user.isAdmin,
    iat: now,
    exp: now + (7 * 24 * 60 * 60) // 7 days
  }
}