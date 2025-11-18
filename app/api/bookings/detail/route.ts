import { NextRequest, NextResponse } from "next/server"
import { BookingRepository } from "@/lib/repositories/bookings"
import { verifyToken } from "@/lib/auth"

export default async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const bookingId = searchParams.get('id')
        
        if (!bookingId) {
            return NextResponse.json(
                { message: 'Booking ID is required' },
                { status: 400 }
            )
        }

        const authToken = request.cookies.get('authToken')?.value
        if (!authToken) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const decoded = await verifyToken(authToken)
        if (!decoded) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 }
            )
        }

        const userId = (decoded as any).userId

        const booking = await BookingRepository.findById(bookingId)
        if (!booking) {
            return NextResponse.json(
                { message: 'Booking not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(booking)
    } catch (error) {
        console.error('Error fetching booking details:', error)
        return NextResponse.json(
            { message: 'An error occurred while fetching booking details' },
            { status: 500 }
        )
    }
}