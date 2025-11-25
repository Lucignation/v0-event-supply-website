import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Droplets, Wine, IceCream, Utensils, Package, Sparkles, CheckCircle, Clock, Truck, ShieldCheck } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      title: 'Bottled Water Supply',
      items: ['500ml bottles - Perfect for events', '1.5L bottles - Family packs', '5L containers - Bulk serving', 'Custom branded options', 'Chilled delivery available'],
      icon: <Droplets className="w-10 h-10" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Soft Drinks',
      items: ['Cola brands - All major types', 'Fanta varieties - Multiple flavors', 'Sprite & 7UP', 'Energy drinks - Red Bull, Monster', 'Juice packs - Fresh & sealed', 'Sugar-free options'],
      icon: <Wine className="w-10 h-10" />,
      color: 'from-red-500 to-orange-500',
    },
    {
      title: 'Ice Blocks & Crushed Ice',
      items: ['Large blocks - Events up to 500 guests', 'Standard blocks - Perfect for smaller events', 'Crushed ice - Immediate use', 'Fast emergency delivery', 'Insulated packaging included'],
      icon: <IceCream className="w-10 h-10" />,
      color: 'from-cyan-400 to-blue-400',
    },
    {
      title: 'Disposable Wares',
      items: ['Cups & glasses - All sizes', 'Plates & bowls - Premium quality', 'Cutlery sets - Complete service', 'Napkins & tissues', 'Eco-friendly options available', 'Bulk discounts'],
      icon: <Utensils className="w-10 h-10" />,
      color: 'from-green-500 to-teal-500',
    },
    {
      title: 'Premium Beverages',
      items: ['Wine & champagne - Curated selection', 'Beer selections - Local & international', 'Cocktail mixers & garnishes', 'Premium juices - Fresh pressed', 'Non-alcoholic alternatives', 'Bar equipment rental'],
      icon: <Sparkles className="w-10 h-10" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Custom Event Packages',
      items: ['Event bundles - All-in-one solutions', 'Corporate rates & contracts', 'Volume discounts up to 15%', 'Custom product sourcing', 'Dedicated account manager', 'Flexible payment terms'],
      icon: <Package className="w-10 h-10" />,
      color: 'from-amber-500 to-orange-500',
    },
  ]

  const benefits = [
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Quality Guaranteed - 100% fresh products' },
    { icon: <Clock className="w-6 h-6" />, text: 'Same-Day Delivery Available' },
    { icon: <Truck className="w-6 h-6" />, text: 'Free Delivery on Orders Above ₦50,000' },
    { icon: <ShieldCheck className="w-6 h-6" />, text: 'Secure Payment & Order Tracking' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero with Animation */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Complete Event Solutions
                </span>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">Our Services</h1>
              <p className="text-xl leading-relaxed text-blue-50 mb-8">
                Complete beverage and event supplies for caterers, corporate events, and celebrations. 
                Everything you need, delivered when you need it.
              </p>
              <div className="flex flex-wrap gap-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="text-green-300">{benefit.icon}</div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid - Enhanced */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">What We Offer</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Comprehensive solutions for every event need. From intimate gatherings to large-scale celebrations.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, i) => (
                <Card key={i} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="p-8 relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <ul className="space-y-3">
                      {service.items.map((item, j) => (
                        <li key={j} className="text-gray-600 text-sm flex items-start gap-3">
                          <span className="text-blue-600 mt-1 font-bold">✓</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Additional Services</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 text-center border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">🚚</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Emergency Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Last-minute orders? We've got you covered with 2-hour express delivery within Lagos.
                </p>
              </Card>
              <Card className="p-8 text-center border-t-4 border-green-600 hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">📦</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Bulk Storage</h3>
                <p className="text-gray-600 leading-relaxed">
                  Store your event supplies with us. Perfect for caterers managing multiple events.
                </p>
              </Card>
              <Card className="p-8 text-center border-t-4 border-purple-600 hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Event Consultation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Free expert advice on quantities and product selection for your event size.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works - Enhanced */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">How to Order</h2>
            <p className="text-center text-blue-100 mb-16 max-w-2xl mx-auto text-lg">
              Four simple steps to get everything you need for your event
            </p>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { step: 1, title: 'Create Account', desc: 'Sign up as a caterer in minutes. Free verification for professionals.' },
                { step: 2, title: 'Browse & Select', desc: 'Choose products and quantities. Use our calculator for large events.' },
                { step: 3, title: 'Set Details', desc: 'Choose delivery date, time, and location. Track in real-time.' },
                { step: 4, title: 'Pay & Confirm', desc: 'Secure payment options. Instant confirmation and order tracking.' },
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  {i < 3 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-white/30"></div>
                  )}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-2xl mx-auto mb-6 shadow-xl transform hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Special Offers</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-3">New Customer Discount</h3>
                  <p className="mb-4 text-blue-100">Get 10% off your first order above ₦20,000</p>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">Claim Offer</Button>
                </Card>
                <Card className="p-8 bg-gradient-to-br from-green-600 to-teal-600 text-white">
                  <div className="text-4xl mb-4">🔄</div>
                  <h3 className="text-2xl font-bold mb-3">Loyalty Program</h3>
                  <p className="mb-4 text-green-100">Earn points on every order. Redeem for discounts and free delivery.</p>
                  <Button className="bg-white text-green-600 hover:bg-green-50">Learn More</Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-8 text-xl text-blue-100 max-w-2xl mx-auto">
              Join hundreds of caterers who trust Resuply for their event supplies
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                Create Account
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                View Catalog
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}