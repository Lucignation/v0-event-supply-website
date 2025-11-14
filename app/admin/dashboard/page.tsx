'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function AdminDashboard() {
  const router = useRouter()
  const [userRole, setUserRole] = useState('')
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const role = localStorage.getItem('userRole')

    if (!token || role !== 'admin') {
      router.push('/login')
      return
    }

    setUserRole(role)
    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/data')
      const data = await response.json()
      setOrders(data.orders || [])
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    router.push('/')
  }

  const handleConfirmDelivery = (orderId: string) => {
    alert(`Delivery confirmed for order ${orderId}`)
    // TODO: Call API to update order status
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Aquoryx Admin</h1>
            <p className="text-primary-foreground/80 text-sm">Management Dashboard</p>
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
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {['orders', 'products', 'pricing', 'customers'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold border-b-2 transition capitalize whitespace-nowrap ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground/60 hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{orders.length}</div>
                <p className="text-foreground/70 text-sm mt-2">Total Orders</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-accent">{orders.filter(o => o.status === 'pending').length}</div>
                <p className="text-foreground/70 text-sm mt-2">Pending</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{orders.filter(o => o.status === 'completed').length}</div>
                <p className="text-foreground/70 text-sm mt-2">Completed</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-accent">₦{orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()}</div>
                <p className="text-foreground/70 text-sm mt-2">Revenue</p>
              </Card>
            </div>

            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Orders</h2>
                <Input placeholder="Search orders..." className="w-48" />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold">Caterer</th>
                      <th className="text-left py-3 px-4 font-semibold">Event Type</th>
                      <th className="text-left py-3 px-4 font-semibold">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => (
                      <tr key={i} className="border-b border-border hover:bg-background transition">
                        <td className="py-3 px-4 font-mono text-xs">{order.id}</td>
                        <td className="py-3 px-4">{order.caterer || 'N/A'}</td>
                        <td className="py-3 px-4">{order.eventType}</td>
                        <td className="py-3 px-4 font-bold text-accent">₦{order.totalAmount?.toLocaleString()}</td>
                        <td className="py-3 px-4">{order.eventDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleConfirmDelivery(order.id)}
                            className="text-primary hover:underline font-semibold text-sm"
                          >
                            Confirm
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Products</h2>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                + Add Product
              </Button>
            </div>

            <Card className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, i) => (
                  <Card key={i} className="p-6">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-accent font-bold mb-4">₦{product.price}</p>
                    <p className="text-foreground/70 text-sm mb-4">Category: {product.category}</p>
                    <p className="text-foreground/70 text-sm mb-6">Stock: {product.stock}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                      <Button variant="outline" size="sm" className="flex-1">Delete</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Update Pricing</h2>
            <div className="space-y-4 max-w-2xl">
              {[
                { name: 'Water 500ml', price: 100 },
                { name: 'Water 1.5L', price: 250 },
                { name: 'Cola 500ml', price: 150 },
                { name: 'Ice Block Large', price: 2000 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <label className="flex-1 font-semibold">{item.name}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground/70">₦</span>
                    <Input
                      type="number"
                      defaultValue={item.price}
                      className="w-24"
                    />
                  </div>
                </div>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6">
                Save Pricing
              </Button>
            </div>
          </Card>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Customers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Business Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold">Orders</th>
                    <th className="text-left py-3 px-4 font-semibold">Total Spent</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Premium Catering', email: 'hello@premium.ng', phone: '+234 800 111 2222', orders: 12, spent: 450000, status: 'Active' },
                    { name: 'Elite Events', email: 'info@elite.ng', phone: '+234 800 333 4444', orders: 8, spent: 320000, status: 'Active' },
                    { name: 'Luxury Parties', email: 'contact@luxury.ng', phone: '+234 800 555 6666', orders: 5, spent: 180000, status: 'Inactive' },
                  ].map((customer, i) => (
                    <tr key={i} className="border-b border-border hover:bg-background transition">
                      <td className="py-3 px-4 font-semibold">{customer.name}</td>
                      <td className="py-3 px-4">{customer.email}</td>
                      <td className="py-3 px-4">{customer.phone}</td>
                      <td className="py-3 px-4">{customer.orders}</td>
                      <td className="py-3 px-4 font-bold text-accent">₦{customer.spent.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
