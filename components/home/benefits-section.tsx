import { Card } from '@/components/ui/card'

export default function BenefitsSection() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      desc: 'Same-day delivery available for urgent orders',
    },
    {
      icon: '✅',
      title: '100% Reliable',
      desc: 'On-time delivery guaranteed for all bookings',
    },
    {
      icon: '🏆',
      title: 'Premium Quality',
      desc: 'Only trusted brands and fresh products',
    },
    {
      icon: '💰',
      title: 'Best Prices',
      desc: 'Competitive rates with volume discounts',
    },
  ]

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Why Choose Aquoryx?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <Card key={i} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-2">{benefit.title}</h3>
              <p className="text-foreground/70">{benefit.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
