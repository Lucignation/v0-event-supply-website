import { queryRows, queryOne } from '@/lib/db';

export interface Customer {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  bookings?: Booking[];
}

interface Booking {
  id: string;
  event_type?: string;
  event_date?: Date;
  event_time?: string;
  guest_count?: number;
  location?: string;
  address?: string;
  total_amount?: number;
  status: string;
  payment_status: string;
  created_at: Date;
}

export const CustomerRepository = {
  async findAll(): Promise<Customer[]> {
    return queryRows<Customer>(
      `SELECT id, full_name, business_name, email, phone, role, created_at, updated_at 
       FROM public.users 
       WHERE role = 'caterer' 
       ORDER BY business_name`
    );
  },

  async findAllWithBookings(page: number = 1, limit: number = 10): Promise<{ customers: Customer[], total: number }> {
    const offset = (page - 1) * limit;
    
    // Count total customers
    const countResult = await queryRows<{ count: string }>(
      `SELECT COUNT(*) as count 
       FROM public.users 
       WHERE role = 'caterer'`
    );
    const total = parseInt(countResult[0]?.count || '0', 10);
    
    // Get paginated customers with their bookings
    const customers = await queryRows<Customer>(
      `SELECT id, full_name, business_name, email, phone, role, created_at, updated_at 
       FROM public.users 
       WHERE role = 'caterer' 
       ORDER BY business_name
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
  
    // Get bookings for each customer
    for (const customer of customers) {
      const bookings = await queryRows<Booking>(
        `SELECT * FROM public.bookings 
         WHERE user_id = $1 
         ORDER BY created_at DESC`,
        [customer.id]
      );
      customer.bookings = bookings;
    }
  
    return { customers, total };
  },

  async findById(customerId: string): Promise<Customer | null> {
    return queryOne<Customer>(
      `SELECT id, full_name, business_name, email, phone, role, created_at, updated_at 
       FROM public.users 
       WHERE id = $1`,
      [customerId]
    );
  },

  async findByIdWithBookings(customerId: string): Promise<Customer | null> {
    const customer = await queryOne<Customer>(
      `SELECT id, full_name, business_name, email, phone, role, created_at, updated_at 
       FROM public.users 
       WHERE id = $1`,
      [customerId]
    );

    if (!customer) return null;

    const bookings = await queryRows<Booking>(
      `SELECT id, event_type, event_date, event_time, guest_count, 
              location, address, total_amount, status, payment_status, created_at
       FROM public.bookings
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [customerId]
    );

    return {
      ...customer,
      bookings,
    };
  },

  async search(searchTerm: string): Promise<Customer[]> {
    return queryRows<Customer>(
      `SELECT id, full_name, business_name, email, phone, role, created_at, updated_at 
       FROM public.users 
       WHERE role = 'caterer' 
       AND (full_name ILIKE $1 OR business_name ILIKE $1 OR email ILIKE $1)
       ORDER BY business_name`,
      [`%${searchTerm}%`]
    );
  },

  async searchWithBookings(searchTerm: string): Promise<Customer[]> {
    const customers = await queryRows<Customer>(
      `SELECT id, full_name, business_name, email, phone, role, created_at, updated_at 
       FROM public.users 
       WHERE role = 'caterer' 
       AND (full_name ILIKE $1 OR business_name ILIKE $1 OR email ILIKE $1)
       ORDER BY business_name`,
      [`%${searchTerm}%`]
    );

    const customersWithBookings = await Promise.all(
      customers.map(async (customer) => {
        const bookings = await queryRows<Booking>(
          `SELECT id, event_type, event_date, event_time, guest_count, 
                  location, address, total_amount, status, payment_status, created_at
           FROM public.bookings
           WHERE user_id = $1
           ORDER BY created_at DESC`,
          [customer.id]
        );

        return {
          ...customer,
          bookings,
        };
      })
    );

    return customersWithBookings;
  },

  async delete(customerId: string): Promise<boolean> {
    const result = await queryRows(
      'DELETE FROM public.users WHERE id = $1 RETURNING id',
      [customerId]
    );
    return result.length > 0;
  },
};