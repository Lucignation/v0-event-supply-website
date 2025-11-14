import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-bold mb-6 text-pretty">
              Premium Event Supplies <span className="text-accent">Made Easy</span>
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
              Book water, soft drinks, ice blocks, and catering supplies in minutes. Trusted by caterers across Nigeria for reliable, fast delivery.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/signup">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-primary-foreground text-accent-foreground hover:bg-primary-foreground/10 text-lg">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-primary-foreground/10 rounded-xl flex items-center justify-center  text-center">
            {/* <div className="text-9xl mb-4">🎉</div>
            <p className="text-lg">Fast Delivery • Quality Products • 24/7 Support</p> */}
            <Image src="/event.png" alt="Hero" width={700} height={700} className="rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
