'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import ProtectedNavigation from '@/components/protected-navigation'
import { products } from '@/data/product'

export default function BookingPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    location: '',
    address: '',
    phoneNumber: '',
  })
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const locations = [
    'Lagos Island',
    'Lagos Mainland',
    'Abuja',
    'Ogun State',
    'Oyo State',
    'Kaduna',
    'Ibadan',
  ]

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleProductChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev => {
      const updated = { ...prev }
      if (quantity === 0) {
        delete updated[productId]
      } else {
        updated[productId] = quantity
      }
      return updated
    })
  }

  const calculateTotal = () => {
    return Object.entries(selectedProducts).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId)
      return total + (product?.price || 0) * quantity
    }, 0)
  }

  const handleSubmitBooking = async () => {
    if (!formData.eventType || !formData.eventDate || !formData.location || Object.keys(selectedProducts).length === 0) {
      setError('Please fill in all required fields and select at least one product')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          eventTime: formData.eventTime,
          guestCount: formData.guestCount,
          location: formData.location,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
          products: selectedProducts,
          totalAmount: calculateTotal(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed')
      }

      router.push(`/booking/confirmation?id=${data.bookingId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navigation /> */}
      <ProtectedNavigation title="Event Booking" subtitle="Book your event supplies" />
      <main className="flex-1 py-8 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Step Indicator */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    s <= step ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            <Card className="p-8">
              {/* Step 1: Event Details */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Event Details</h2>
                  {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded mb-6 text-sm">{error}</div>}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Event Type</label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full border border-border rounded-md p-2"
                        required
                      >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="conference">Conference</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Event Date</label>
                        <Input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Event Time</label>
                        <Input
                          type="time"
                          name="eventTime"
                          value={formData.eventTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Expected Guest Count</label>
                      <Input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        placeholder="e.g., 100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Delivery Location</label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full border border-border rounded-md p-2"
                        required
                      >
                        <option value="">Select location</option>
                        {locations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Contact Number(Preferably WhatsApp)</label>
                      <Input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+234 (0)800 123 4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Address</label>
                      <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address and apartment/suite number"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Select Products */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Select Products</h2>
                  
                  <div className="space-y-6">
                    {['Water', 'Soft Drinks', 'Ice', 'Disposables'].map(category => (
                      <div key={category}>
                        <h3 className="font-bold text-lg text-primary mb-3">{category}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {products.filter(p => p.category === category).map(product => (
                            <Card key={product.id} className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold">{product.name}</h4>
                                  <p className="text-accent font-bold">₦{product.price}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleProductChange(product.id, (selectedProducts[product.id] || 0) - 1)}
                                  className="px-2 py-1 border border-border rounded hover:bg-secondary"
                                >
                                  −
                                </button>
                                <input
                                  type="number"
                                  min="0"
                                  value={selectedProducts[product.id] || 0}
                                  onChange={(e) => handleProductChange(product.id, parseInt(e.target.value) || 0)}
                                  className="w-12 text-center border border-border rounded"
                                />
                                <button
                                  onClick={() => handleProductChange(product.id, (selectedProducts[product.id] || 0) + 1)}
                                  className="px-2 py-1 border border-border rounded hover:bg-secondary"
                                >
                                  +
                                </button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Payment */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="font-bold mb-3">Event Details</h3>
                      <div className="space-y-2 text-sm text-foreground/70">
                        <p><span className="font-semibold">Type:</span> {formData.eventType}</p>
                        <p><span className="font-semibold">Date:</span> {formData.eventDate}</p>
                        <p><span className="font-semibold">Location:</span> {formData.location}</p>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-bold mb-3">Order Summary</h3>
                      <div className="space-y-2 text-sm">
                        {Object.entries(selectedProducts).map(([productId, quantity]) => {
                          const product = products.find(p => p.id === productId)
                          return (
                            <div key={productId} className="flex justify-between">
                              <span>{product?.name} × {quantity}</span>
                              <span className="font-semibold">₦{((product?.price || 0) * quantity).toLocaleString()}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg">Total Amount:</span>
                        <span className="text-2xl font-bold text-accent">₦{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmitBooking}
                      disabled={loading}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {loading ? 'Processing...' : 'Proceed to Payment'}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
