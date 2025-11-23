// app/api/migrate/route.ts (DELETE THIS FILE AFTER RUNNING ONCE!)
import { execute} from '@/lib/db'; // or however you import your db connection
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await execute(`
      ALTER TABLE public.bookings 
      ADD COLUMN phone_number TEXT
    `);
    
    return NextResponse.json({ message: 'Migration successful' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}