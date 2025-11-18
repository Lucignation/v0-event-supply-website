'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import ProtectedNavigation from '@/components/protected-navigation'
import { formatCurrency } from '@/util/helper'
import moment from 'moment'
import { Modal } from '@/components/modal'
import { useBookings } from '@/hooks/useBookings'
import { useProducts } from '@/hooks/useProducts'
import { toast } from 'sonner'
import { useCustomers } from '@/hooks/useCaterer'
import { EyeIcon } from 'lucide-react'
import { useFilters } from '@/hooks/useFilters'
import Pagination from '@/components/Pagination/Pagination'

export default function AdminDashboard() {
  const router = useRouter()
  const [userRole, setUserRole] = useState('')
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [canAddProduct, setCanAddProduct] = useState(false)
  const [customers, setCustomers] = useState<any[]>([])
  const [addProductLoading, setAddProductLoading] = useState(false)
  const [addProduct, setAddProduct] = useState<any>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
  })
  const { filters, setFilters } = useFilters();

  const { filters: productsFilters, setFilters: setProductsFilters } = useFilters();

  const { filters: customersFilters, setFilters: setCustomersFilters } = useFilters();

  const { data: ordersData, isLoading: bookingsLoading, refetch: refetchBookings } = useBookings(filters);
  const { data: productsData, isLoading: productsLoading, refetch: refetchProducts } = useProducts(productsFilters);
  const { data: customersData, isLoading: customersLoading, refetch: refetchCustomers } = useCustomers(customersFilters);


  console.log(customersData)

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({
        ...filters,
        page: page,
      });
    },
    [filters]
  );

  const handleProductsPageChange = useCallback(
    (page: number) => {
      setProductsFilters({
        ...productsFilters,
        page: page,
      });
    },
    [productsFilters]
  );

  const handleCustomersPageChange = useCallback(
    (page: number) => {
      setCustomersFilters({
        ...customersFilters,
        page: page,
      });
    },
    [customersFilters]
  );

  

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const role = localStorage.getItem('userRole')

    if (!token || role !== 'admin') {
      router.push('/login')
      return
    }

    setUserRole(role)
    setOrders(ordersData?.bookings || [])
    setProducts(productsData?.products || [])
    setCustomers(customersData?.customers || [])
    // fetchData()
  }, [router, ordersData, productsData, customersData])

  // const fetchData = async () => {
  //   try {
  //     // const response = await fetch('/api/admin/data')
  //     const response = await fetch('/api/bookings')
  //     const productsResponse = await fetch('/api/products')

  //     if (!response.ok && !productsResponse.ok) {
  //       router.push('/login')
  //       return
  //     }

  //     const data = await response.json()
  //     const productData = await productsResponse.json()
  //     console.log(productData)
  //     setOrders(data.bookings || [])
  //     setProducts(data.products || [])
  //     setUser({ authenticated: true })
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }


  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/admin/data')

  //       if (!response.ok) {
  //         router.push('/login')
  //         return
  //       }

  //       const data = await response.json()
  //       setOrders(data.orders || [])
  //       setProducts(data.products || [])
  //       setUser({ authenticated: true })
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [router])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    router.push('/login')
  }

  const onEdit = (product: any) => {
    setEditProduct(product)
  }

  const handleConfirmDelivery = async (orderId: string) => {
    setLoadingUpdate(true)
    try {
      const response = await fetch(`/api/bookings/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId: orderId, status: 'confirmed' }),
      })
  
      if (!response.ok) {
        router.push('/login')
        return
      }
  
      const data = await response.json()
      setOpen(false)
      refetchBookings()
    } catch (error) {
      console.error('Error confirming delivery:', error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  if (bookingsLoading || productsLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const handleSavePricing = async () => {
    setLoadingUpdate(true)
    try {
      const response = await fetch(`/api/products/pricing`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      })
  
      if (!response.ok) {
        console.error('Error updating product:', response)
        toast.error('Error updating product')
        // router.push('/login')
        return
      }
  
      const data = await response.json()
      setOpen(false)
      refetchProducts()
    } catch (error) {
      toast.error('Error updating product')
      console.error('Error confirming delivery:', error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  const updateProduct = async () => {
    setLoadingUpdate(true)
    try {
      const response = await fetch(`/api/products/pricing`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProduct),
      })
  
      if (!response.ok) {
        toast.error('Error updating product')
        // router.push('/login')
        return
      }
  
      await response.json()
      toast.success('Product updated successfully')
      refetchProducts()
      setEditProduct(null)
    } catch (error) {
      toast.error('Error updating product')
      console.error('Error updating product:', error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  const handleAddProduct = async () => {
    setAddProductLoading(true)
    try {
      const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addProduct),
      })
  
      if (!response.ok) {
        toast.error('Error updating product')
        // router.push('/login')
        return
      }
  
      await response.json()
      toast.success('Product updated successfully')
      refetchProducts()
      setAddProduct(null)
      setCanAddProduct(false)
    } catch (error) {
      toast.error('Error updating product')
      console.error('Error updating product:', error)
    } finally {
      setAddProductLoading(false)
    }
  }

  //  if (!user?.authenticated) {
  //   return null
  // } 

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <ProtectedNavigation title="Aquoryx Admin" subtitle="Management Dashboard" />

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
                <div className="text-4xl font-bold text-primary">{orders?.length}</div>
                <p className="text-foreground/70 text-sm mt-2">Total Orders</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-accent">{orders?.length ? orders?.filter((o: any) => o.status === 'pending').length : 0}</div>
                <p className="text-foreground/70 text-sm mt-2">Pending</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{orders?.length ? orders?.filter((o: any) => o.status === 'confirmed').length : 0}</div>
                <p className="text-foreground/70 text-sm mt-2">Confirmed</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary">{orders?.length ? orders?.filter((o: any) => o.status === 'completed').length : 0}</div>
                <p className="text-foreground/70 text-sm mt-2">Completed</p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-accent">₦{orders?.length ? orders?.reduce((sum: any, o: any) => sum + (o.totalAmount || 0), 0).toLocaleString() : 0}</div>
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
                      <th className="text-left py-3 px-4 font-semibold">Time</th>
                      <th className="text-left py-3 px-4 font-semibold">Guest Count</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.length ? orders?.map((order: any, i: any) => (
                      <tr key={i} className="border-b border-border hover:bg-background transition">
                        <td className="py-3 px-4 font-mono text-xs">{order.id}</td>
                        <td className="py-3 px-4">{order.business_name || 'N/A'}</td>
                        <td className="py-3 px-4">{order.event_type}</td>
                        <td className="py-3 px-4 font-bold text-accent">{formatCurrency(order.total_amount)}</td>
                        <td className="py-3 px-4">{moment(order.event_date).format("MMMM D, YYYY")}</td>
                        <td className="py-3 px-4">{order.event_time}</td>
                        <td className="py-3 px-4">{order.guest_count}</td>
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
                            onClick={() => {setOpen(true); setSelectedOrder(order)}}
                            className="text-primary hover:underline font-semibold text-sm"
                          >
                            <EyeIcon />
                          </button>
                        </td>
                      </tr>
                    )) : null}
                  </tbody>
                </table>
                {ordersData?.pagination?.total > 0 && (
                  <div className="w-full mt-4">
                    <Pagination
                      totalItems={ordersData?.pagination?.total || 0}
                      itemsPerPage={filters.limit}
                      onPageChange={handlePageChange}
                      currentPage={filters.page}
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Products</h2>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setCanAddProduct(true)}>
                + Add Product
              </Button>
            </div>

            {!products?.length && !productsLoading ? <p>No products found</p> : (
              <Card className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.map((product: any, i: number) => (
                  <Card key={i} className="p-6">
                    {editProduct && editProduct.id === product.id ? <Input type="text" value={editProduct.name || ''} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} /> : <h3 className="font-semibold mb-2">{product.name}</h3>}
                    {editProduct && editProduct.id === product.id ? <Input type="number" value={editProduct.price || 0} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} /> :  <p className="text-accent font-bold mb-4">₦{product.price}</p>}
                    <p className="text-foreground/70 text-sm mb-4">Category: {product.category}</p>
                    {editProduct && editProduct.id === product.id ? <Input type="number" value={editProduct.stock || 0} onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })} /> : <p className="text-foreground/70 text-sm mb-6">Stock: {product.stock}</p>}
                    {editProduct && editProduct?.id === product.id ? <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditProduct(null)}>Cancel</Button>
                      <Button variant="default" size="sm" className="flex-1" onClick={updateProduct}>Update Product</Button>
                    </div> : 
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(product)}>Edit</Button>
                      <Button variant="destructive" size="sm" className="flex-1">Delete</Button>
                      
                    </div>}
                  </Card>
                ))}
              </div>
            </Card> 
            )}
            {productsData?.pagination?.total > 0 && <Pagination
              totalItems={productsData?.pagination?.total || 0}
              itemsPerPage={productsFilters.limit}
              onPageChange={handleProductsPageChange}
              currentPage={productsFilters.page}
            />  }
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          !products?.length && !productsLoading ? <p>No products found</p> : <Card className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Update Pricing</h2>
            <div className="space-y-4 max-w-2xl">
              {products?.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <label className="flex-1 font-semibold">{item.name}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground/70">₦</span>
                    <Input
                      type="number"
                      defaultValue={item.price}
                      className="w-24"
                      onChange={(e) => {
                        const newProducts = [...products];
                        newProducts[i].price = e.target.value;
                        setProducts(newProducts);
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6" onClick={handleSavePricing}>
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
                    <th className="text-left py-3 px-4 font-semibold">Bookings</th>
                    <th className="text-left py-3 px-4 font-semibold">Total Spent</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                {customers?.map((customer) => {
  const totalRevenue = customer.bookings?.reduce(
    (total: number, booking: any) => total + Number(booking.total_amount || 0), 
    0
  ) || 0;

  return (
    <tr 
      key={customer.id} 
      className="border-b border-border hover:bg-muted/50 transition cursor-pointer"
      onClick={() => router.push(`/customers/${customer.id}`)}
    >
      <td className="py-3 px-4 font-semibold">
        {customer.business_name || customer.full_name}
      </td>
      <td className="py-3 px-4">{customer.email}</td>
      <td className="py-3 px-4">{customer.phone}</td>
      <td className="py-3 px-4 text-center">
        {customer.bookings?.length || 0}
      </td>
      <td className="py-3 px-4 font-bold text-accent">
        ₦{totalRevenue.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
      </td>
      <td className="py-3 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          customer.bookings?.length ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {customer.bookings?.length ? 'Active' : 'Inactive'}
        </span>
      </td>
    </tr>
  );
})}
                </tbody>
              </table>
              { customersData?.pagination?.total! > 0 && (
                  <Pagination
                    totalItems={customersData?.pagination?.total || 0}
                    itemsPerPage={customersData?.pagination?.limit!}
                    onPageChange={handleCustomersPageChange}
                    currentPage={customersData?.pagination?.page!}
                  />
                ) }
            </div>
          </Card>
        )}
      </main>

      <Modal open={open} onOpenChange={setOpen} title={`Confirm Delivery for ${selectedOrder?.business_name}`}>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Event Date: {moment(selectedOrder?.event_date).format('MMMM DD, YYYY')}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Event Time: {selectedOrder?.event_time}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Guest Count: {selectedOrder?.guest_count}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Total Amount: {formatCurrency(selectedOrder?.total_amount)}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Event Location: {selectedOrder?.location}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Event Address: {selectedOrder?.address}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Caterer Phone: {selectedOrder?.phone}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Caterer Email: {selectedOrder?.email}
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6" onClick={() => handleConfirmDelivery(selectedOrder?.id)}>
          {loadingUpdate ? 'Confirming...' : 'Confirm Delivery'}
        </Button>
      </Modal>

      <Modal open={canAddProduct} onOpenChange={setCanAddProduct} title="Add Product">
        <div className="space-y-4">
          <Input type="text" placeholder="Product Name" value={addProduct?.name || ''} onChange={(e) => setAddProduct({ ...addProduct, name: e.target.value })} />
          <Input type="text" placeholder="Product Category" value={addProduct?.category || ''} onChange={(e) => setAddProduct({ ...addProduct, category: e.target.value })} />
          <Input type="number" placeholder="Product Price" value={addProduct?.price || ''} onChange={(e) => setAddProduct({ ...addProduct, price: e.target.value })} />
          <Input type="number" placeholder="Product Stock" value={addProduct?.stock || ''} onChange={(e) => setAddProduct({ ...addProduct, stock: e.target.value })} />
          <Input type="text" placeholder="Product Description" value={addProduct?.description || ''} onChange={(e) => setAddProduct({ ...addProduct, description: e.target.value })} />
          <Input type="text" placeholder="Product Image" value={addProduct?.image || ''} onChange={(e) => setAddProduct({ ...addProduct, image: e.target.value })} />
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6" onClick={handleAddProduct}>{addProductLoading ? 'Adding...' : 'Add Product'}</Button>
      </Modal>
    </div>
  )
}
