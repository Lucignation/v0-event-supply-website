// hooks/useCustomers.ts  ← Fix filename
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner"; // Optional: for user feedback
import { useRouter } from "next/navigation";

// Types
interface Customer {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
  bookings?: any[]; // Add proper Booking type if needed
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface CustomersResponse {
  customers: Customer[];
  pagination: PaginationMeta;
}

interface CustomersFilters {
  page?: number;
  limit?: number;
}

export function useCustomers({ page = 1, limit = 10 }: CustomersFilters = {}) {
  const router = useRouter()
  return useQuery<CustomersResponse>({
    queryKey: ["customers", page, limit],
    queryFn: async () => {
      const res = await fetch(`/api/customers?page=${page}&limit=${limit}`);
      if(res.status === 401){
        router.push('/login')
      }
      
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Failed to fetch customers" }));
        toast.error(error.message || "Failed to fetch customers");
        throw new Error(error.message || "Failed to fetch customers");
      }
      
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // Optional: Cache data for 5 minutes
    retry: 2, // Optional: Retry failed requests twice
  });
}