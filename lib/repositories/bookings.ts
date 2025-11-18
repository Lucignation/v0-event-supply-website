// lib/repositories/bookings.ts
import { queryRows, queryOne } from '@/lib/db';

export interface Booking {
  id: string;
  user_id: string;
  event_type?: string;
  event_date?: Date;
  event_time?: string;
  guest_count?: number;
  location?: string;
  address?: string;
  total_amount?: number;
  status: string;
  payment_status: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  // Joined fields
  caterer_name?: string;
  business_name?: string;
}

export const BookingRepository = {
  async findByUserId(userId: string): Promise<Booking[]> {
    return queryRows<Booking>(
      `SELECT b.*, 
              u.full_name as caterer_name, 
              u.business_name
       FROM public.bookings b
       JOIN public.users u ON b.user_id = u.id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [userId]
    );
  },


  async findById(bookingId: string): Promise<Booking | null> {
    return queryOne<Booking>(
      `SELECT b.*, 
              u.full_name as caterer_name, 
              u.business_name
       FROM public.bookings b
       JOIN public.users u ON b.user_id = u.id
       WHERE b.id = $1`,
      [bookingId]
    );
  },

  async findWithItems(bookingId: string) {
    const booking = await queryOne<Booking>(
      `SELECT b.*, 
              u.full_name as caterer_name, 
              u.business_name
       FROM public.bookings b
       JOIN public.users u ON b.user_id = u.id
       WHERE b.id = $1`,
      [bookingId]
    );

    if (!booking) return null;

    const items = await queryRows(
      `SELECT bi.*, 
              p.name as product_name,
              p.category,
              p.price
       FROM public.booking_items bi
       JOIN public.products p ON bi.product_id = p.id
       WHERE bi.booking_id = $1`,
      [bookingId]
    );

    return { ...booking, items };
  },

//   async create(data: {
//     userId: string;
//     eventType?: string;
//     eventDate?: Date;
//     eventTime?: string;
//     guestCount?: number;
//     location?: string;
//     address?: string;
//     totalAmount?: number;
//     notes?: string;
//   }): Promise<Booking> {
//     return queryOne<Booking>(
//       `INSERT INTO public.bookings (
//         user_id, event_type, event_date, event_time, 
//         guest_count, location, address, total_amount, notes,
//         created_at, updated_at
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
//       RETURNING *`,
//       [
//         data.userId,
//         data.eventType,
//         data.eventDate,
//         data.eventTime,
//         data.guestCount,
//         data.location,
//         data.address,
//         data.totalAmount,
//         data.notes,
//       ]
//     ) as Promise<Booking>;
//   },

async create(data: {
    userId: string;
    eventType?: string;
    eventDate?: Date;
    eventTime?: string;
    guestCount?: number;
    location?: string;
    address?: string;
    totalAmount?: number;
    notes?: string;
    items: Array<{
      productId: string;
      quantity: number;
      unitPrice: number;
    }>;
  }): Promise<Booking> {
  
    try {
  
      // 1. Insert booking
      const bookingRes = await queryOne(
        `
        INSERT INTO public.bookings (
          user_id, event_type, event_date, event_time,
          guest_count, location, address, total_amount, notes,
          status, payment_status,
          created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', 'unpaid', NOW(), NOW())
        RETURNING *
        `,
        [
          data.userId,
          data.eventType,
          data.eventDate,
          data.eventTime,
          data.guestCount,
          data.location,
          data.address,
          data.totalAmount,
          data.notes,
        ]
      );
  
      const booking = bookingRes;
      const bookingId = booking.id;
  
      // 2. Insert items
      for (const item of data.items) {
        await queryOne(
          `
          INSERT INTO public.booking_items (
            booking_id, product_id, quantity, unit_price, subtotal, created_at
          )
          VALUES ($1, $2, $3, $4, $5, NOW())
          `,
          [
            bookingId,
            item.productId,
            item.quantity,
            item.unitPrice,
            item.quantity * item.unitPrice,
          ]
        );
      }
  
      return booking;
    } catch (error) {
      throw error;
    }
  },
  
    
  async update(
    bookingId: string,
    data: Partial<{
      status: string;
      paymentStatus: string;
      eventDate: Date;
      guestCount: number;
      totalAmount: number;
    }>
  ): Promise<Booking | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(data.status);
    }
    if (data.paymentStatus !== undefined) {
      fields.push(`payment_status = $${paramIndex++}`);
      values.push(data.paymentStatus);
    }
    if (data.eventDate !== undefined) {
      fields.push(`event_date = $${paramIndex++}`);
      values.push(data.eventDate);
    }
    if (data.guestCount !== undefined) {
      fields.push(`guest_count = $${paramIndex++}`);
      values.push(data.guestCount);
    }
    if (data.totalAmount !== undefined) {
      fields.push(`total_amount = $${paramIndex++}`);
      values.push(data.totalAmount);
    }

    if (fields.length === 0) return null;

    fields.push(`updated_at = NOW()`);
    values.push(bookingId);

    return queryOne<Booking>(
      `UPDATE public.bookings 
       SET ${fields.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    );
  },

  async delete(bookingId: string): Promise<boolean> {
    const result = await queryRows(
      `DELETE FROM public.bookings WHERE id = $1 RETURNING id`,
      [bookingId]
    );
    return result.length > 0;
  },

  async getStats(userId: string) {
    return queryOne(
      `SELECT 
        COUNT(*) as total_bookings,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_bookings,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_bookings,
        COALESCE(SUM(total_amount), 0) as total_revenue,
        COALESCE(AVG(guest_count), 0) as avg_guest_count
       FROM public.bookings
       WHERE user_id = $1`,
      [userId]
    );
  },

  async findAll(page: number = 1, limit: number = 10): Promise<{bookings: Booking[], total: number}> {
    const offset = (page - 1) * limit;
    const countResult = await queryRows<{ count: string }>(
      `SELECT COUNT(*) as count FROM public.bookings`
    );
    const total = parseInt(countResult[0]?.count || '0', 10);

    const bookings = await queryRows<Booking>(
      `SELECT b.*, 
              u.full_name as caterer_name, 
              u.business_name,
              u.phone,
              u.email
       FROM public.bookings b
       JOIN public.users u ON b.user_id = u.id
       ORDER BY b.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return { bookings, total };
  },


  async updateStatus(bookingId: string, status: string): Promise<Booking | null> {
    return queryOne<Booking>(
      `UPDATE public.bookings 
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, bookingId]
    );
  },
};