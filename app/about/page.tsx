import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-pretty mb-4">Who We Are</h1>
            <p className="text-lg max-w-2xl">Nigeria's leading supplier of premium beverages and event consumables to professional caterers.</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                <p className="text-foreground/80 leading-relaxed">
                  To provide caterers with reliable, high-quality beverages and event supplies delivered on time, every time. We understand that your events require perfection, and we're here to ensure you have exactly what you need.
                </p>
              </Card>
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
                <p className="text-foreground/80 leading-relaxed">
                  To become the most trusted event supplies partner for caterers across Nigeria, known for exceptional service, premium products, and reliable delivery that makes every event successful.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Aquoryx?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Reliability', desc: 'On-time delivery guaranteed for all orders' },
                { title: 'Quality', desc: 'Premium brands and fresh products only' },
                { title: 'Coverage', desc: 'Fast delivery across Lagos and Nigeria' },
                { title: 'Support', desc: '24/7 customer support for your needs' },
                { title: 'Pricing', desc: 'Competitive rates with volume discounts' },
                { title: 'Easy Booking', desc: 'Simple online booking and tracking' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-background rounded-lg text-center">
                  <h3 className="font-bold text-lg mb-2 text-primary">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Coverage */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Delivery Coverage</h2>
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10">
              <p className="text-center text-lg mb-6">We deliver to:</p>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                {['Lagos Island', 'Lagos Mainland', 'Abuja', 'Ogun State', 'Oyo State', 'Kaduna', 'Ibadan', 'Express Delivery Available'].map((loc, i) => (
                  <div key={i} className="py-4 px-3 bg-background rounded border border-border">
                    {loc}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
