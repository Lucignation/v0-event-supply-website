import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 bg-accent/10 border-t-4 border-accent">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-primary">Ready to Book Your Supplies?</h2>
        <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
          Join hundreds of caterers who trust EventFlow for their event supplies. Easy booking, fast delivery, premium quality.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg">
              Create Account
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="text-lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
