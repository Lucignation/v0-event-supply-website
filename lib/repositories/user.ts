import { queryOne } from "../db";

interface User {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    business_name: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    password_hash: string;
}

export const UserRepository = {
    async findByUserId(userId: string): Promise<Omit<User, 'password_hash'> | null> {
        const user = await queryOne<User>(
            `SELECT * FROM users WHERE id = $1`,
            [userId]
        );
        
        if (!user) return null;
        
        const { password_hash, ...userWithoutPassword }: any = user;
        return userWithoutPassword;
    },

    async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
        const user = await queryOne<User>(
            `UPDATE users SET full_name = $2, email = $3, phone = $4, business_name = $5 WHERE id = $1 RETURNING *`,
            [userId, data.full_name, data.email, data.phone, data.business_name]
        );
        
        if (!user) return null;
        
        const { password_hash, ...userWithoutPassword }: any = user;
        return userWithoutPassword;
    }
}
