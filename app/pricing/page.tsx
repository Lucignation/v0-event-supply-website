import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
  const products = [
    { category: 'Water', items: [{ name: '500ml bottle', price: '₦100', unit: 'per bottle' }, { name: '1.5L bottle', price: '₦250', unit: 'per bottle' }, { name: '5L container', price: '₦500', unit: 'per container' }] },
    { category: 'Soft Drinks', items: [{ name: 'Cola (500ml)', price: '₦150', unit: 'per bottle' }, { name: 'Fanta (500ml)', price: '₦150', unit: 'per bottle' }, { name: 'Juice Pack (1L)', price: '₦300', unit: 'per pack' }] },
    { category: 'Ice Blocks', items: [{ name: 'Large block', price: '₦2,000', unit: 'per block' }, { name: 'Standard block', price: '₦1,500', unit: 'per block' }, { name: 'Crushed ice (5kg)', price: '₦800', unit: 'per pack' }] },
    { category: 'Disposables', items: [{ name: 'Cups (50pc)', price: '₦500', unit: 'per pack' }, { name: 'Plates (100pc)', price: '₦1,200', unit: 'per pack' }, { name: 'Cutlery set', price: '₦800', unit: 'per 100 sets' }] },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-pretty mb-4">Our Pricing</h1>
            <p className="text-lg max-w-2xl">Competitive rates with bulk discounts. Prices vary by location.</p>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-8">
              {products.map((category, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-bold text-primary mb-4">{category.category}</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {category.items.map((item, j) => (
                      <Card key={j} className="p-6">
                        <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                        <p className="text-3xl font-bold text-accent mb-1">{item.price}</p>
                        <p className="text-sm text-foreground/60">{item.unit}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volume Discounts */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Volume Discounts</h2>
            <Card className="p-8 max-w-2xl mx-auto bg-background">
              <div className="space-y-4">
                {[
                  { qty: '100+ units', discount: '5% off' },
                  { qty: '500+ units', discount: '10% off' },
                  { qty: '1000+ units', discount: '15% off' },
                  { qty: '5000+ units', discount: 'Custom pricing' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center pb-4 border-b border-border last:border-0">
                    <span className="font-semibold">{item.qty}</span>
                    <span className="text-accent font-bold">{item.discount}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
            <p className="mb-8 text-lg">Get started with your first order today</p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Book Now
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
