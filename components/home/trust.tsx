import { Card } from '@/components/ui/card'
import { TimerIcon, TimerReset } from 'lucide-react'
import { GiApothecary } from 'react-icons/gi'
import { MdScheduleSend } from 'react-icons/md'
import { TbMapPinDown } from 'react-icons/tb'

export default function TrustGrid() {
  const services = [
    {
      icon: <MdScheduleSend />,
      title: 'On-time delivery you can count on',
      items: ['Your event schedule is sacred to us. We arrive when promised.'],
    },
    {
      icon: <TbMapPinDown />,
      title: 'Coverage across major Nigerian cities',
      items: ['Lagos, Abuja, Port Harcourt, Ibadan, and beyond. We reach you.'],
    },
    {
      icon: <GiApothecary />,
      title: 'Preferred by top catering companies',
      items: ['Leading caterers trust us with their biggest events.'],
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <p className="text-[14px] md:text-[18px] leading-[1.2] md:w-[70%] md:mx-auto text-foreground/70 text-center mb-[3px]">Trusted</p>
        <h2 className="text-[40px] md:text-[60px] leading-[1.2] md:w-[70%] md:mx-auto font-bold text-center mb-[10px]">Built for caterers who demand more</h2>
        <p className="text-[14px] md:text-[18px] leading-[1.2] md:w-[70%] md:mx-auto text-foreground/70 text-center mb-12">We deliver on time, every time, across Nigeria.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="p-8 ">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-[45px] leading-[1.2] font-bold mb-4">{service.title}</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                {service.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
