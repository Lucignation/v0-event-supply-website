// import { neon } from '@neondatabase/serverless'

// const sql = neon(process.env.DATABASE_URL!)

// export async function query(sqlString: string, params?: any[]) {
//   try {
//     // For dynamic queries, use sql.query() with parameterized values
//     const result = await sql.query(sqlString, params || [])
//     return { rows: result }
//   } catch (error) {
//     console.error('[DB Query Error]', error)
//     throw error
//   }
// }

// export async function execute(sqlString: string, params?: any[]) {
//   try {
//     const result = await sql.query(sqlString, params || [])
//     return { success: true, rows: result }
//   } catch (error) {
//     console.error('[DB Execute Error]', error)
//     throw error
//   }
// }

// export async function getUserByEmail(email: string) {
//   try {
//     const result = await sql`SELECT * FROM public.users WHERE email = ${email}`
//     return result[0] || null
//   } catch (error) {
//     console.error('[DB Query Error]', error)
//     throw error
//   }
// }

// export async function createUser(userData: {
//   email: string
//   password_hash: string
//   full_name: string
//   business_name: string
//   phone: string
//   role?: string
// }) {
//   try {
//     const result = await sql`
//       INSERT INTO public.users (email, password_hash, full_name, business_name, phone, role, created_at, updated_at)
//       VALUES (${userData.email}, ${userData.password_hash}, ${userData.full_name}, ${userData.business_name}, ${userData.phone}, ${userData.role || 'caterer'}, NOW(), NOW())
//       RETURNING id, email, full_name, business_name, role
//     `
//     return result[0]
//   } catch (error) {
//     console.error('[DB Execute Error]', error)
//     throw error
//   }
// }

// export async function verifyUser(email: string, password: string) {
//   try {
//     const user = await sql`SELECT * FROM public.users WHERE email = ${email}`
//     if (!user || user.length === 0) return null

//     const bcrypt = require('bcryptjs')
//     const isValid = await bcrypt.compare(password, user[0].password_hash)
//     if (!isValid) return null

//     return {
//       id: user[0].id,
//       email: user[0].email,
//       full_name: user[0].full_name,
//       business_name: user[0].business_name,
//       role: user[0].role,
//     }
//   } catch (error) {
//     console.error('[DB Query Error]', error)
//     throw error
//   }
// }


// lib/db.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function query(sqlString: string, params?: any[]) {
  try {
    const result = await sql.query(sqlString, params || []);
    return { rows: result };
  } catch (error) {
    console.error('[DB Query Error]', error);
    throw error;
  }
}

export async function execute(sqlString: string, params?: any[]) {
  try {
    const result = await sql.query(sqlString, params || []);
    return { success: true, rows: result };
  } catch (error) {
    console.error('[DB Execute Error]', error);
    throw error;
  }
}

// Fixed helper functions with proper typing
export async function queryRows<T = any>(
  sqlString: string,
  params?: any[]
): Promise<T[]> {
  const result = await query(sqlString, params);
  return result.rows as T[];
}

export async function queryOne<T = any>(
  sqlString: string,
  params?: any[]
): Promise<T | null> {
  const result = await query(sqlString, params);
  const row = result.rows[0];
  return row ? (row as T) : null;
}

// Keep your existing user functions
export async function getUserByEmail(email: string) {
  try {
    const result = await sql`SELECT * FROM public.users WHERE email = ${email}`;
    return result[0] || null;
  } catch (error) {
    console.error('[DB Query Error]', error);
    throw error;
  }
}

export async function createUser(userData: {
  email: string;
  password_hash: string;
  full_name: string;
  business_name: string;
  phone: string;
  role?: string;
}) {
  try {
    const result = await sql`
      INSERT INTO public.users (email, password_hash, full_name, business_name, phone, role, created_at, updated_at)
      VALUES (${userData.email}, ${userData.password_hash}, ${userData.full_name}, ${userData.business_name}, ${userData.phone}, ${userData.role || 'caterer'}, NOW(), NOW())
      RETURNING id, email, full_name, business_name, role
    `;
    return result[0];
  } catch (error) {
    console.error('[DB Execute Error]', error);
    throw error;
  }
}

export async function verifyUser(email: string, password: string) {
  try {
    const user = await sql`SELECT * FROM public.users WHERE email = ${email}`;
    if (!user || user.length === 0) return null;

    const bcrypt = require('bcryptjs');
    const isValid = await bcrypt.compare(password, user[0].password_hash);
    if (!isValid) return null;

    return {
      id: user[0].id,
      email: user[0].email,
      full_name: user[0].full_name,
      business_name: user[0].business_name,
      role: user[0].role,
    };
  } catch (error) {
    console.error('[DB Query Error]', error);
    throw error;
  }
}
