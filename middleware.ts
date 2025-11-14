import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value

  let isValidToken = false
  let userRole = 'caterer'

  if (authToken) {
    const decoded = verifyToken(authToken)
    if (decoded) {
      isValidToken = true
      userRole = (decoded as any).role || 'caterer'
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isValidToken || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/booking')) {
    if (!isValidToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/booking/:path*'],
}
