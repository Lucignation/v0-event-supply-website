import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value
  const role = request.cookies.get('userRole')?.value
  // console.log(role);
  // console.log(authToken)

  let isValidToken = false
  let userRole = 'caterer'

  if (authToken) {
    const decoded = verifyToken(authToken)
    // console.log(decoded)
    if (decoded) {
      isValidToken = true
      userRole = (decoded as any).role || 'caterer'
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // console.log(role)
    if (!isValidToken || role !== 'admin') {
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
