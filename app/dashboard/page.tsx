'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function CatererDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const response = await fetch('/api/bookings/list')
        
        if (!response.ok) {
          router.push('/login')
          return
        }

        const data = await response.json()
        setBookings(data.bookings || [])
        setUser({ authenticated: true })
      } catch (error) {
        console.error('Error fetching bookings:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndFetchData()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user?.authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Aquoryx Dashboard</h1>
            <p className="text-primary-foreground/80 text-sm">Caterer Portal</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'bookings'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            Profile
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{bookings.length}</div>
                <p className="text-foreground/70 text-sm mt-2">Total Bookings</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-accent">₦{bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toLocaleString()}</div>
                <p className="text-foreground/70 text-sm mt-2">Total Spent</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{bookings.filter(b => b.status === 'completed').length}</div>
                <p className="text-foreground/70 text-sm mt-2">Completed Orders</p>
              </Card>
            </div>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/booking">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    New Booking
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Browse Products
                </Button>
                <Button variant="outline" className="w-full">
                  View History
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Recent Orders</h2>
              {bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.slice(0, 3).map((booking, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div>
                        <p className="font-semibold">{booking.eventType || 'Event'}</p>
                        <p className="text-sm text-foreground/70">{booking.eventDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">₦{booking.totalAmount?.toLocaleString()}</p>
                        <p className="text-sm text-foreground/70">{booking.status || 'pending'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-foreground/70 text-center py-8">No bookings yet. <Link href="/booking" className="text-primary hover:underline font-semibold">Create your first booking</Link></p>
              )}
            </Card>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-foreground/60">Booking ID</p>
                      <p className="font-semibold font-mono">{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Event Type</p>
                      <p className="font-semibold">{booking.eventType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Amount</p>
                      <p className="font-bold text-accent">₦{booking.totalAmount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Status</p>
                      <p className={`font-semibold px-3 py-1 rounded-full text-sm w-fit ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status}
                      </p>
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
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Profile Settings</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Business Name</label>
                  <input
                    type="text"
                    placeholder="Your catering business name"
                    defaultValue="Sample Catering"
                    className="w-full border border-border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Contact Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+234 (0)800 123 4567"
                    className="w-full border border-border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Preferred Location</label>
                  <select className="w-full border border-border rounded-md p-2">
                    <option>Lagos Island</option>
                    <option>Lagos Mainland</option>
                    <option>Abuja</option>
                    <option>Other</option>
                  </select>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6">
                  Save Changes
                </Button>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
