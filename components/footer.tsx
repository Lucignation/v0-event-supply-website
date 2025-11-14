import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-accent text-2xl">⚡</span>
              EventFlow
            </h3>
            <p className="text-primary-foreground/80 text-sm">Premium beverage and event supplies for caterers.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
              <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition">Terms</Link></li>
              <li><Link href="#" className="hover:text-accent transition">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>+234 (0)800 123 4567</li>
              <li><a href="https://wa.me/234900555888" className="hover:text-accent transition">WhatsApp</a></li>
              <li>hello@eventflow.ng</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; 2025 EventFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
