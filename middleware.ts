import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value
  const userRole = request.cookies.get('userRole')?.value

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!authToken || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/booking')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/booking/:path*'],
}
