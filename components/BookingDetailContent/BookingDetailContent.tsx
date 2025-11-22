'use client'

import { useSearchParams } from "next/navigation"
import ProtectedNavigation from "@/components/protected-navigation"
import BackArrow from "@/components/BackArrow/BackArrow"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { formatCurrency } from "@/util/helper"

export default function BookingDetailsContent() {
    const searchParams = useSearchParams()
    const bookingId = searchParams.get('id')
    const router = useRouter()

    useEffect(() => {
        if (!bookingId) {
            router.push('/bookings')
        }
    }, [bookingId, router])

    const { data: booking, isLoading, error } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: async () => {
            const res = await fetch(`/api/bookings/${bookingId}`)
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.message || 'Failed to fetch booking')
            }
            return res.json()
        },
        enabled: !!bookingId,
        retry: 1,
    })

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <ProtectedNavigation title="Aquoryn Dashboard" subtitle="Booking Details" />
                <main className="flex-1 py-8 bg-secondary">
                    <div className="container mx-auto px-4 flex items-center justify-center">
                        <Loader className="animate-spin h-8 w-8" />
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen flex flex-col">
                <ProtectedNavigation title="Aquoryn Dashboard" subtitle="Booking Details" />
                <main className="flex-1 py-8 bg-secondary">
                    <div className="container mx-auto px-4">
                        <BackArrow title="Back" />
                        <Card className="p-8 text-center">
                            <h2 className="text-xl font-semibold text-red-600 mb-2">
                                Booking Not Found
                            </h2>
                            <p className="text-foreground/70">
                                {error?.message || 'The booking you\'re looking for doesn\'t exist.'}
                            </p>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
    
    return (
        <div className="min-h-screen flex flex-col">
            <ProtectedNavigation title="Aquoryn Dashboard" subtitle="Booking Details" />
            <main className="flex-1 py-8 bg-secondary">
                <div className="container mx-auto px-4">
                    <BackArrow title="Back" />
                    
                    {/* Booking Info */}
                    <Card className="p-8 space-y-6 my-6">
                        <div>
                            <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
                            <div className="h-px bg-border mb-4" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-foreground/60 mb-1">Booking ID</p>
                                <p className="font-medium">{booking.id}</p>
                            </div>

                            <div>
                                <p className="text-sm text-foreground/60 mb-1">Status</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div>
                                <p className="text-sm text-foreground/60 mb-1">Event Date</p>
                                <p className="font-medium">
                                    {booking.event_date 
                                        ? moment(booking.event_date).format('MMMM DD, YYYY')
                                        : 'N/A'
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-foreground/60 mb-1">Event Time</p>
                                <p className="font-medium">{booking.event_time || 'N/A'}</p>
                            </div>

                            <div>
                                <p className="text-sm text-foreground/60 mb-1">Event Type</p>
                                <p className="font-medium">{booking.event_type || 'N/A'}</p>
                            </div>

                            <div>
                                <p className="text-sm text-foreground/60 mb-1">Guest Count</p>
                                <p className="font-medium">{booking.guest_count || 'N/A'}</p>
                            </div>

                            <div>
                                <p className="text-sm text-foreground/60 mb-1">Total Amount</p>
                                <p className="font-bold text-lg text-accent">
                                    {formatCurrency(booking.total_amount)}
                                </p>
                            </div>

                            {booking.caterer_name && (
                                <div>
                                    <p className="text-sm text-foreground/60 mb-1">Caterer</p>
                                    <p className="font-medium">{booking.caterer_name}</p>
                                    {booking.business_name && (
                                        <p className="text-sm text-foreground/70">{booking.business_name}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {booking.notes && (
                            <div>
                                <p className="text-sm text-foreground/60 mb-1">Notes</p>
                                <p className="text-foreground/80">{booking.notes}</p>
                            </div>
                        )}

                        <div className="pt-4">
                            <p className="text-xs text-foreground/50">
                                Created: {moment(booking.created_at).format('MMMM DD, YYYY [at] h:mm A')}
                            </p>
                        </div>
                    </Card>

                    {/* Booking Items */}
                    {booking.booking_items && booking.booking_items.length > 0 && (
                        <Card className="p-8 mb-6">
                            <h2 className="text-xl font-bold mb-4">Order Items</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Product</th>
                                            <th className="text-left py-2">Category</th>
                                            <th className="text-right py-2">Quantity</th>
                                            <th className="text-right py-2">Unit Price</th>
                                            <th className="text-right py-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {booking.booking_items.map((item: any) => (
                                            <tr key={item.id} className="border-b">
                                                <td className="py-3">{item.product_name || 'N/A'}</td>
                                                <td className="py-3">{item.category || 'N/A'}</td>
                                                <td className="text-right py-3">{item.quantity}</td>
                                                <td className="text-right py-3">{formatCurrency(item.unit_price)}</td>
                                                <td className="text-right py-3 font-semibold">
                                                    {formatCurrency(item.subtotal)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}

                    {/* Deliveries */}
                    {booking.deliveries && booking.deliveries.length > 0 && (
                        <Card className="p-8">
                            <h2 className="text-xl font-bold mb-4">Deliveries</h2>
                            <div className="space-y-4">
                                {booking.deliveries.map((delivery: any) => (
                                    <div key={delivery.id} className="border rounded-lg p-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-foreground/60">Status</p>
                                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                                                    delivery.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                    delivery.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                                                    delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {delivery.status}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-foreground/60">Delivery Date</p>
                                                <p className="font-medium mt-1">
                                                    {delivery.delivery_date 
                                                        ? moment(delivery.scheduled_date).format('MMM DD, YYYY')
                                                        : 'Not scheduled'
                                                    }
                                                </p>
                                            </div>
                                            {/* {delivery.rider_name && (
                                                <div>
                                                    <p className="text-sm text-foreground/60">Rider</p>
                                                    <p className="font-medium mt-1">{delivery.rider_name}</p>
                                                    {delivery.rider_phone && (
                                                        <p className="text-sm text-foreground/70">{delivery.rider_phone}</p>
                                                    )}
                                                </div>
                                            )}
                                            {delivery.delivery_address && (
                                                <div>
                                                    <p className="text-sm text-foreground/60">Delivery Address</p>
                                                    <p className="font-medium mt-1">{delivery.delivery_address}</p>
                                                </div>
                                            )} */}
                                        </div>
                                        {delivery.driver_notes && (
                                            <div className="mt-4">
                                                <p className="text-sm text-foreground/60">Notes</p>
                                                <p className="text-foreground/80 mt-1">{delivery.driver_notes}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}