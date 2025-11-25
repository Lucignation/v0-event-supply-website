'use client'

import BackArrow from "@/components/BackArrow/BackArrow"
import Footer from "@/components/footer"
import Pagination from "@/components/Pagination/Pagination"
import ProtectedNavigation from "@/components/protected-navigation"
import { StatusBadge } from "@/components/StatusBadge/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useBookings } from "@/hooks/useBookings"
import { useFilters } from "@/hooks/useFilters"
import { formatCurrency } from "@/util/helper"
import { Loader } from "lucide-react"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function BookingHistory() {
    const router = useRouter()
    const [pagination, setPagination] = useState<any>({})
    const { filters, setFilters } = useFilters()
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

     useEffect(() => {
        const checkAuthAndFetchData = async () => {
          try {
            const response = await fetch(`/api/bookings/list?page=${filters.page}&limit=${filters.limit}`)
            
            if (!response.ok) {
              router.push('/login')
              return
            }
    
            const data = await response.json();
            // console.log(data, "data");
            
            setBookings(data.bookings || [])
            setPagination(data.pagination)
          } catch (error) {
            console.error('Error fetching bookings:', error)
            toast.error('Error fetching bookings')
            router.push('/login')
          } finally {
            setLoading(false)
          }
        }
    
        checkAuthAndFetchData()
      }, [router])

      const handlePageChange = (page: number) => {
        setFilters({ ...filters, page })
      }

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )
      }

    return (
        <div className="min-h-screen flex flex-col">
            <ProtectedNavigation title="Resuply Dashboard" subtitle="Your booking history" />
            <main className="flex-1 py-8 bg-secondary">
                <div className="container mx-auto px-4">
                    <BackArrow title="Back" />
                    <div className="space-y-4 mt-6">
                        {bookings.length > 0 ? (
                            bookings.map((booking, i) => (
                            <Card key={i} className="p-6 hover:shadow-lg transition">
                                <div className="grid md:grid-cols-6 gap-4">
                                <div>
                                    <p className="text-sm text-foreground/60 mb-2">Booking ID</p>
                                    <p className="font-semibold font-mono">{booking.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60 mb-2">Event Type</p>
                                    <p className="font-semibold">{booking.event_type}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60 mb-2">Amount</p>
                                    <p className="font-bold text-accent">{formatCurrency(booking.total_amount)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60 mb-2">Status</p>
                                    <StatusBadge status={booking.status || 'pending'} statusLabel={booking.status || 'pending'} />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60 mb-2">Date</p>
                                    <p className="font-semibold">{moment(booking.created_at).format('Do MMM. YYYY')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60 mb-2">Actions</p>
                                    <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/booking/detail?id=${booking.id}`)}>View Booking</Button>
                                </div>
                                </div>
                            </Card>
                            ))
                        ) : (
                            <Card className="p-12 text-center">
                            <p className="text-foreground/70 mb-4">No bookings found</p>
                            <Link href="/booking">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Create Your First Booking
                                </Button>
                            </Link>
                            </Card>
                        )}
            
                        {
                            pagination.total > 0 && (
                            <Pagination
                                totalItems={pagination.total || 0}
                                itemsPerPage={filters.limit}
                                onPageChange={handlePageChange}
                                currentPage={filters.page}
                                />
                            )
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}