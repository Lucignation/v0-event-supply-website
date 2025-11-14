'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span className="text-accent text-3xl">⚡</span>
          EventFlow
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-accent transition">Home</Link>
          <Link href="/about" className="hover:text-accent transition">About</Link>
          <Link href="/services" className="hover:text-accent transition">Services</Link>
          <Link href="/pricing" className="hover:text-accent transition">Pricing</Link>
          <Link href="/contact" className="hover:text-accent transition">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary/95 p-4 space-y-2">
          <Link href="/" className="block py-2 hover:text-accent">Home</Link>
          <Link href="/about" className="block py-2 hover:text-accent">About</Link>
          <Link href="/services" className="block py-2 hover:text-accent">Services</Link>
          <Link href="/pricing" className="block py-2 hover:text-accent">Pricing</Link>
          <Link href="/contact" className="block py-2 hover:text-accent">Contact</Link>
          <Link href="/login" className="block py-2 hover:text-accent">Login</Link>
          <Link href="/signup" className="block py-2 hover:text-accent">Sign Up</Link>
        </div>
      )}
    </nav>
  )
}
