'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProtectedNavigation({title, subtitle}: {title: string, subtitle: string}) {

    const router = useRouter()

    const handleLogoutApi = async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        localStorage.removeItem('Aquoryn')
        handleLogoutApi()
        router.push('/login')
      }

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            {/* <h1 className="text-2xl font-bold">{title}</h1> */}
            <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={150} height={150} className="rounded-full" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <p className="text-primary-foreground/80 text-sm">{subtitle}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition"
          >
            Logout
          </button>
        </div>
      </header>
  )
}
