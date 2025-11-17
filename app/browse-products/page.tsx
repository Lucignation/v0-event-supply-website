'use client'

import BackArrow from "@/components/BackArrow/BackArrow"
import Footer from "@/components/footer"
import ProtectedNavigation from "@/components/protected-navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useProducts } from "@/hooks/useProducts"
import { useRouter } from "next/navigation"
import { Modal } from "@/components/modal"
import { Loader } from "lucide-react"

export default function BrowseProducts() {
    const [products, setProducts] = useState<any[]>([])
    const router = useRouter()
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const { data: productsData, isLoading: productsLoading, refetch: refetchProducts } = useProducts();
    

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const role = localStorage.getItem('userRole')
    
        if (!token || role !== 'caterer') {
          router.push('/login')
          return
        }
        setProducts(productsData?.products || [])
        // fetchData()
      }, [router, productsData])

      if (productsLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )
      }

      
    return (
        <div className="min-h-screen flex flex-col">
            <ProtectedNavigation title="Browse Products" subtitle="Browse our products" />
            <main className="flex-1 py-8 bg-secondary">
                <div className="container mx-auto px-4">
                    <BackArrow title="Back" />

                    {!products?.length && !productsLoading ? <p>No products found</p> : (
                        <Card className="p-8 mt-6">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products?.map((product: any, i: number) => (
                            <Card key={i} className="p-6">
                                <h3 className="font-semibold mb-2">{product.name}</h3>
                                <p className="text-accent font-bold mb-4">₦{product.price}</p>
                                <p className="text-foreground/70 text-sm mb-1">Category: {product.category}</p>
                                <p className="text-foreground/70 text-sm mb-1">Stock: {product.stock}</p>
                                {/* <p className="text-foreground/70 text-sm mb-1">Description: {product.description}</p> */}
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedProduct(product)}>Product Details</Button>
                                </div>
                            </Card>
                            ))}
                        </div>
                        </Card> 
                        )}
                </div>
                {selectedProduct && (
                    <Modal
                        open={!!selectedProduct}
                        onOpenChange={() => setSelectedProduct(null)}
                        title={`${selectedProduct.name}`}
                        children={
                            <div className="p-6">
                                <p className="text-accent font-bold mb-4">₦{selectedProduct.price}/unit</p>
                                <p className="text-foreground/70 text-sm mb-1">Category: {selectedProduct.category}</p>
                                <p className="text-foreground/70 text-sm mb-1">Stock: {selectedProduct.stock}</p>
                                <p className="text-foreground/70 text-sm mb-1">Description: {selectedProduct.description}</p>
                                <Button variant="default" size="sm" className="flex-1 mt-6 cursor-pointer" onClick={() => router.push(`/booking`)}>Start Booking</Button>
                            </div>
                        }
                    />
                )}  
            </main>
            <Footer />
        </div>
    )
}
