import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'

export default function ServicesPage() {
  const services = [
    {
      title: 'Bottled Water Supply',
      items: ['500ml bottles', '1.5L bottles', '5L containers', 'Bulk orders available'],
      icon: '💧',
    },
    {
      title: 'Soft Drinks',
      items: ['Cola brands', 'Fanta varieties', 'Sprite', 'Energy drinks', 'Juice packs'],
      icon: '🥤',
    },
    {
      title: 'Ice Blocks',
      items: ['Large blocks', 'Standard blocks', 'Crushed ice', 'Fast delivery'],
      icon: '🧊',
    },
    {
      title: 'Disposable Wares',
      items: ['Cups & glasses', 'Plates & bowls', 'Cutlery sets', 'Napkins & tissues'],
      icon: '🍽️',
    },
    {
      title: 'Premium Beverages',
      items: ['Wine & champagne', 'Beer selections', 'Cocktail mixers', 'Premium juices'],
      icon: '🍾',
    },
    {
      title: 'Custom Packages',
      items: ['Event bundles', 'Bulk discounts', 'Corporate rates', 'Custom solutions'],
      icon: '📦',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-pretty mb-4">Our Services</h1>
            <p className="text-lg max-w-2xl">Complete beverage and event supplies for caterers, corporate events, and celebrations.</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <Card key={i} className="p-8 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, j) => (
                      <li key={j} className="text-foreground/70 text-sm flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How to Order</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Create Account', desc: 'Sign up as a caterer in minutes' },
                { step: 2, title: 'Browse & Select', desc: 'Choose products and quantities' },
                { step: 3, title: 'Set Details', desc: 'Choose date, time, and location' },
                { step: 4, title: 'Pay & Confirm', desc: 'Complete payment and get confirmation' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
