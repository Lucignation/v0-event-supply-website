'use client'

import BackArrow from "@/components/BackArrow/BackArrow"
import Footer from "@/components/footer"
import ProtectedNavigation from "@/components/protected-navigation"

export default function BookingHistory() {
    return (
        <div className="min-h-screen flex flex-col">
            <ProtectedNavigation title="Booking History" subtitle="Your booking history" />
            <main className="flex-1 py-8 bg-secondary">
                <BackArrow title="Back" />
                <h1>Booking History</h1>
            </main>
            <Footer />
        </div>
    )
}