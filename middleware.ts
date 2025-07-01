
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function verifyJWTToken(token: string): boolean {
  try {
    // Simple JWT verification without library
    const parts = token.split('.')
    if (parts.length !== 3) return false
    
    const payload = JSON.parse(atob(parts[1]))
    const now = Math.floor(Date.now() / 1000)
    
    // Check if token is expired
    return payload.exp > now
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  // Protect API routes that need authentication
  if (request.nextUrl.pathname.startsWith('/api/orders') || 
      request.nextUrl.pathname.startsWith('/api/profile')) {
    
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }
    
    if (!verifyJWTToken(token)) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      )
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/orders/:path*', '/api/profile/:path*']
}