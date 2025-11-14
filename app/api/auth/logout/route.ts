import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Clear authentication cookie/token
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
    
    response.cookies.set({
      name: 'authToken',
      value: '',
      expires: new Date(0),
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    )
  }
}
