'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import moment from 'moment'
import { formatCurrency } from '@/util/helper'
import { StatusBadge } from '@/components/StatusBadge/StatusBadge'
import { useUserDetail } from '@/hooks/useUserDetail'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { useFilters } from '@/hooks/useFilters'
import Pagination from '@/components/Pagination/Pagination'

export default function CatererDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview');
  const [updatingUser, setUpdatingUser] = useState(false);
  const [pagination, setPagination] = useState<any>({})
  const { filters, setFilters } = useFilters()

  const { data: userDetail } = useUserDetail();

  const [userDetails, setUserDetails] = useState<any>({
    business_name: userDetail?.user.business_name || '',
    full_name: userDetail?.user.full_name || '',

    email: userDetail?.user.email || '',
    phone: userDetail?.user.phone || '',
    address: userDetail?.user.address || '',
    city: userDetail?.user.city || '',
    state: userDetail?.user.state || '',
    country: userDetail?.user.country || '',
    zip_code: userDetail?.user.zip_code || '',
  })

  console.log(userDetail);

  useEffect(() => {
    setUserDetails({
      business_name: userDetail?.user.business_name || '',
      full_name: userDetail?.user.full_name || '',
      email: userDetail?.user.email || '',
      phone: userDetail?.user.phone || '',
      address: userDetail?.user.address || '',
      city: userDetail?.user.city || '',
      state: userDetail?.user.state || '',
      country: userDetail?.user.country || '',
      zip_code: userDetail?.user.zip_code || '',
    })
  }, [userDetail])

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const response = await fetch(`/api/bookings/list?page=${filters.page}&limit=${filters.limit}`)
        
        if (!response.ok) {
          router.push('/login')
          return
        }

        const data = await response.json();
        console.log(data, "data");
        
        setBookings(data.bookings || [])
        setPagination(data.pagination)
        setUser({ authenticated: true })
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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  if (loading) {
    return  <div className="min-h-screen flex items-center justify-center">
    <Loader className="animate-spin" />
  </div>
  }

  if (!user?.authenticated) {
    return null
  }

  const updateUser = async () => {
    try {
      setUpdatingUser(true)
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      })
      if (!response.ok) {
        toast.error('Failed to update user')
      }
      const data = await response.json()
      toast.success('User updated successfully')
      setUserDetails(data.user)
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Error updating user')
    } finally {
      setUpdatingUser(false)
    }
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
                <div className="text-4xl font-bold text-accent">₦{bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (Number(b.total_amount || 0)), 0).toLocaleString()}</div>
                <p className="text-foreground/70 text-sm mt-2">Total Spent</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{bookings.filter(b => b.status === 'completed').length}</div>
                <p className="text-foreground/70 text-sm mt-2">Completed Orders</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{bookings.filter(b => b.status === 'pending').length}</div>
                <p className="text-foreground/70 text-sm mt-2">Pending Orders</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{bookings.filter(b => b.status === 'confirmed').length}</div>
                <p className="text-foreground/70 text-sm mt-2">Confirmed Orders</p>
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
                <Link href="/browse-products">
                  <Button variant="outline" className="w-full">
                    Browse Products
                  </Button>
                </Link>
                <Link href="/booking-history">
                  <Button variant="outline" className="w-full">
                    View History
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Recent Orders</h2>
              {bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.slice(0, 3).map((booking, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div>
                        <p className="font-semibold">{booking.event_type || 'Event'}</p>
                        <p className="text-sm text-foreground/70">{moment(booking.event_date).format('MMMM Do, YYYY')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">{ formatCurrency(booking.total_amount)}</p>
                        <p className="text-sm text-foreground/70"><StatusBadge status={booking.status || 'pending'} statusLabel={booking.status || 'pending'} /></p>
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
                      <p className="font-semibold">{booking.event_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Amount</p>
                      <p className="font-bold text-accent">{formatCurrency(booking.total_amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Status</p>
                      <StatusBadge status={booking.status || 'pending'} statusLabel={booking.status || 'pending'} />
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
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Profile Settings</h2>
              <form className="space-y-4">
              <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full border border-border rounded-md p-2"
                    onChange={(e) => setUserDetails({ ...userDetails, full_name: e.target.value })}
                    value={userDetails.full_name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Business Name</label>
                  <input
                    type="text"
                    placeholder="Your catering business name"
                    className="w-full border border-border rounded-md p-2"
                    onChange={(e) => setUserDetails({ ...userDetails, business_name: e.target.value })}
                    value={userDetails.business_name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Contact Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    value={userDetails.email}
                    className="w-full border border-border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+234 (0)800 123 4567"
                    onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                    value={userDetails.phone}
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
                <Button onClick={updateUser} disabled={updatingUser} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6">
                  {updatingUser ? 'Updating...' : 'Save Changes'}
                </Button>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
