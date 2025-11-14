import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, password, businessName, phone } = body

    if (!fullName || !email || !password || !businessName || !phone) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Hash password and save to database
    // TODO: Send verification email
    
    return NextResponse.json(
      { 
        message: 'Account created successfully. Please check your email to verify.',
        userId: 'temp-id',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
