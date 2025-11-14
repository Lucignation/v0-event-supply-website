import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-pretty mb-4">Get in Touch</h1>
            <p className="text-lg">We're here to help with any questions about our services</p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-foreground/80">+234 (0)800 123 4567</p>
                <p className="text-sm text-foreground/60 mt-2">Mon-Fri, 8am-6pm WAT</p>
              </Card>
              <Card className="p-8 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                <p className="text-foreground/80">+234 (0)900 555 8888</p>
                <p className="text-sm text-foreground/60 mt-2">24/7 for urgent orders</p>
              </Card>
              <Card className="p-8 text-center">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-foreground/80">hello@Aquoryx.ng</p>
                <p className="text-sm text-foreground/60 mt-2">Response within 24 hours</p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-primary">Send us a Message</h2>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                  </div>
                  <Input placeholder="Subject" />
                  <textarea className="w-full border border-border rounded-md p-3 min-h-32 font-sans" placeholder="Your message..." />
                  <Button className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
