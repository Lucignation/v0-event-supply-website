import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { UserRepository } from '@/lib/repositories/user';

export const GET = async (request: NextRequest) => {
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

        const user = await UserRepository.findByUserId(userId);

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
          { message: 'An error occurred while fetching user.' },
          { status: 500 }
        );
    }
}

export const PUT = async (request: NextRequest) => {
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

        const user = await UserRepository.updateUser(userId, body);

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
          { message: 'An error occurred while updating user.' },
          { status: 500 }
        );
    }
}