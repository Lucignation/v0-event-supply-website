// hooks/useBookings.ts
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseBookingsParams {
  page?: number;
  limit?: number;
}

export function useBookings({ page = 1, limit = 10 }: UseBookingsParams = {}) {
  const router = useRouter()
  return useQuery({
    queryKey: ["bookings", page, limit],
    queryFn: async () => {
      const res = await fetch(`/api/bookings?page=${page}&limit=${limit}`);
      if(res.status === 401){
        router.push('/login')
      }
      // console.log(res)
      if (!res.ok) toast.error("Failed to fetch bookings");
      return res.json();
    }
  });
}
