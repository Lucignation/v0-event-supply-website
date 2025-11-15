// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BookingRepository } from '@/lib/repositories/bookings';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get('authToken')?.value;
    if (!authToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(authToken);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = (decoded as any).userId;

    // ✨ Clean and simple
    const bookings = await BookingRepository.findAll();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authToken = request.cookies.get('authToken')?.value;
    if (!authToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyToken(authToken);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = (decoded as any).userId;
    const body = await request.json();

    const booking = await BookingRepository.create({
      userId,
      eventType: body.eventType,
      eventDate: body.eventDate,
      eventTime: body.eventTime,
      guestCount: body.guestCount,
      location: body.location,
      address: body.address,
      totalAmount: body.totalAmount,
      notes: body.notes,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating booking' },
      { status: 500 }
    );
  }
}