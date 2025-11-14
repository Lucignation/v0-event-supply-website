import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/db'
import { hashPassword, generateToken } from '@/lib/auth'

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

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      )
    }

    const password_hash = await hashPassword(password)
    const newUser = await createUser({
      email,
      password_hash,
      full_name: fullName,
      business_name: businessName,
      phone,
      role: 'caterer',
      // role: 'admin',
    })

    const token = await generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    })

    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        token,
        userId: newUser.id,
        role: newUser.role,
      },
      { status: 201 }
    )

    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
