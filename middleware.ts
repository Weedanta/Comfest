import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/jwt'

export function middleware(request: NextRequest) {
  // Protect API routes that need authentication
  if (request.nextUrl.pathname.startsWith('/api/orders') || 
      request.nextUrl.pathname.startsWith('/api/order') ||
      request.nextUrl.pathname.startsWith('/api/profile')) {
    
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const payload = verifyJWT(token)
    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Add user info to headers for API routes to use
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user-id', payload.userId)
    requestHeaders.set('user-email', payload.email)
    requestHeaders.set('user-role', payload.role)
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/orders/:path*', '/api/order/:path*', '/api/profile/:path*']
}