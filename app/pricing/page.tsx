import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Zap, TrendingDown, Gift } from 'lucide-react'

export default function PricingPage() {
  const products = [
    { 
      category: 'Water', 
      icon: '💧',
      items: [
        { name: '500ml bottle', price: '₦100', unit: 'per bottle', popular: true }, 
        { name: '1.5L bottle', price: '₦250', unit: 'per bottle' }, 
        { name: '5L container', price: '₦500', unit: 'per container' },
        { name: '18.9L dispenser', price: '₦1,200', unit: 'per bottle' }
      ] 
    },
    { 
      category: 'Soft Drinks', 
      icon: '🥤',
      items: [
        { name: 'Cola (500ml)', price: '₦150', unit: 'per bottle' }, 
        { name: 'Fanta (500ml)', price: '₦150', unit: 'per bottle' }, 
        { name: 'Sprite (500ml)', price: '₦150', unit: 'per bottle' },
        { name: 'Juice Pack (1L)', price: '₦300', unit: 'per pack', popular: true },
        { name: 'Energy Drink (250ml)', price: '₦400', unit: 'per can' }
      ] 
    },
    { 
      category: 'Ice Blocks', 
      icon: '🧊',
      items: [
        { name: 'Large block (25kg)', price: '₦2,000', unit: 'per block', popular: true }, 
        { name: 'Standard block (15kg)', price: '₦1,500', unit: 'per block' }, 
        { name: 'Crushed ice (5kg)', price: '₦800', unit: 'per pack' },
        { name: 'Ice cubes (3kg)', price: '₦600', unit: 'per bag' }
      ] 
    },
    { 
      category: 'Disposables', 
      icon: '🍽️',
      items: [
        { name: 'Cups (50pc)', price: '₦500', unit: 'per pack' }, 
        { name: 'Plates (100pc)', price: '₦1,200', unit: 'per pack', popular: true }, 
        { name: 'Cutlery set', price: '₦800', unit: 'per 100 sets' },
        { name: 'Napkins (200pc)', price: '₦600', unit: 'per pack' },
        { name: 'Food containers', price: '₦1,500', unit: 'per 50 pcs' }
      ] 
    },
  ]

  const bulkPackages = [
    {
      name: 'Starter Package',
      price: '₦45,000',
      description: 'Perfect for events up to 100 guests',
      features: ['200 bottles of water (500ml)', '100 soft drinks', '1 large ice block', '200 disposable cups & plates'],
      savings: 'Save ₦5,000'
    },
    {
      name: 'Professional Package',
      price: '₦85,000',
      description: 'Ideal for events up to 250 guests',
      features: ['500 bottles of water', '250 soft drinks', '3 large ice blocks', '500 disposable cups & plates', 'Free delivery'],
      savings: 'Save ₦12,000',
      popular: true
    },
    {
      name: 'Enterprise Package',
      price: '₦150,000',
      description: 'Best for large events 500+ guests',
      features: ['1000 bottles of water', '500 soft drinks', '6 large ice blocks', '1000 complete disposable sets', 'Free delivery & setup', 'Dedicated support'],
      savings: 'Save ₦25,000'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-green-600 via-teal-700 to-blue-700 text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Lowest Prices Guaranteed
                </span>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">Our Pricing</h1>
              <p className="text-xl leading-relaxed text-green-50 mb-6">
                Competitive rates with generous bulk discounts. Transparent pricing, no hidden fees.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Free delivery above ₦50,000</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Volume discounts up to 15%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Note */}
        <section className="py-8 bg-yellow-50 border-y border-yellow-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 text-yellow-900">
              <Gift className="w-6 h-6" />
              <p className="font-semibold">First-time customers get 10% off orders above ₦20,000</p>
            </div>
          </div>
        </section>

        {/* Bulk Packages */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Event Packages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Pre-configured packages for hassle-free event planning. Maximum savings guaranteed.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {bulkPackages.map((pkg, i) => (
                <Card key={i} className={`relative overflow-hidden ${pkg.popular ? 'border-2 border-blue-600 shadow-2xl scale-105' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    <div className="mb-6">
                      <div className="text-5xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                      <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {pkg.savings}
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}`}>
                      Select Package
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Individual Pricing Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Individual Product Pricing</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Build your own order with our a-la-carte pricing
              </p>
            </div>
            <div className="grid gap-12 max-w-6xl mx-auto">
              {products.map((category, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-4xl">{category.icon}</div>
                    <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                  </div>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.items.map((item, j) => (
                      <Card key={j} className={`group hover:shadow-xl transition-all hover:-translate-y-1 relative ${item.popular ? 'border-2 border-blue-500' : ''}`}>
                        {item.popular && (
                          <div className="absolute top-2 right-2">
                            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="font-semibold text-gray-900 mb-3 text-lg group-hover:text-blue-600 transition-colors">{item.name}</h3>
                          <p className="text-4xl font-bold text-blue-600 mb-2">{item.price}</p>
                          <p className="text-sm text-gray-500">{item.unit}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volume Discounts - Enhanced */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-700 to-teal-700 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Volume Discounts</h2>
            <p className="text-center text-purple-100 mb-16 text-lg max-w-2xl mx-auto">
              The more you buy, the more you save. Automatic discounts applied at checkout.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { qty: '100-499 units', discount: '5% off', color: 'from-blue-500 to-cyan-500' },
                { qty: '500-999 units', discount: '10% off', color: 'from-green-500 to-teal-500' },
                { qty: '1000-4999 units', discount: '15% off', color: 'from-orange-500 to-amber-500' },
                { qty: '5000+ units', discount: 'Custom pricing', color: 'from-purple-500 to-pink-500' },
              ].map((item, i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all hover:scale-105">
                  <div className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-xl`}>
                      {i + 1}
                    </div>
                    <div className="text-xl font-bold mb-2">{item.qty}</div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.discount}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-purple-100 text-lg">
                Need a quote for your event? <Button variant="outline" className="ml-2 border-white text-white hover:bg-white/10">Contact Sales</Button>
              </p>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Flexible Payment Options</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">💳</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Cards & Bank Transfer</h3>
                <p className="text-gray-600">Visa, Mastercard, and direct bank transfers accepted</p>
              </Card>
              <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Mobile Payments</h3>
                <p className="text-gray-600">Pay via mobile apps and USSD</p>
              </Card>
              <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Credit Terms</h3>
                <p className="text-gray-600">Available for verified corporate clients</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Book?</h2>
            <p className="mb-8 text-xl text-blue-100 max-w-2xl mx-auto">
              Get started with your first order today and enjoy special first-time discounts
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg shadow-xl">
              Book Now
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}