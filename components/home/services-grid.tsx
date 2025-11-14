import { Card } from '@/components/ui/card'

export default function ServicesGrid() {
  const services = [
    {
      icon: '💧',
      title: 'Water Supply',
      items: ['500ml to 5L bottles', 'Bulk orders welcome'],
    },
    {
      icon: '🥤',
      title: 'Soft Drinks',
      items: ['All popular brands', 'Juice packs & more'],
    },
    {
      icon: '🧊',
      title: 'Ice Blocks',
      items: ['Large & standard', 'Crushed ice available'],
    },
    {
      icon: '🍽️',
      title: 'Disposables',
      items: ['Cups, plates, cutlery', 'Premium quality'],
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Our Services</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="p-8 text-center">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                {service.items.map((item, j) => (
                  <li key={j}>✓ {item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
