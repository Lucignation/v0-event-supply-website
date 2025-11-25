import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { LuNotebookPen } from 'react-icons/lu'
import { TbBrandDatabricks } from 'react-icons/tb'
import { IoPricetags } from 'react-icons/io5'

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <LiaShippingFastSolid />,
      title: 'Lightning Fast',
      desc: 'Same-day delivery available for urgent orders',
    },
    {
      icon: <LuNotebookPen />,
      title: '100% Reliable',
      desc: 'On-time delivery guaranteed for all bookings',
    },
    {
      icon: <TbBrandDatabricks />,
      title: 'Premium Quality',
      desc: 'Only trusted brands and fresh products',
    },
    {
      icon: <IoPricetags />,
      title: 'Best Prices',
      desc: 'Competitive rates with volume discounts',
    },
  ]

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2">
        <h2 className="text-4xl font-bold text-left">Why Choose Resuply?</h2>
        <p className="text-left text-foreground/70 md:w-[80%] mt-4 mb-4">Experience the difference with Resuply - where quality meets speed. We understand that every event is unique, and we're here to make your special day unforgettable. From custom catering to premium supplies, we've got you covered. Let's make your event a success! </p>
        <div className="mt-4 overflow-hidden rounded-lg shadow-lg mb-4 md:mb-0 border border-foreground/10 w-[100%] md:w-[590px] h-[380px]">
          <Image src="/uploading-water.png" alt="Hero" width={500} height={500} className="rounded-lg w-full h-full object-cover" />
        </div>
        </div>
        <div className="md:w-1/2 grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <Card key={i} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4 flex items-center justify-center">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-foreground/70">{benefit.desc}</p>
            </Card>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
