// hooks/useBookings.ts
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings");
      if (!res.ok) toast.error("Failed to fetch bookings");
      return res.json();
    }
  });
}
