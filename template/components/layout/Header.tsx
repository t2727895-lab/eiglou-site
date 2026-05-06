'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from './Navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="main-header">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="icon-email">✉</span>
                <a href="mailto:info@Itzone25.com" className="hover:text-blue-400">
                  info@Itzone25.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="icon-pin">📍</span>
                <span>4124 Cimmaron Road, CA 92806</span>
              </div>
            </div>
            <p className="text-sm">Welcome to Itzone - Best Technology Solutions</p>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold">Follow Us:</span>
              <div className="flex gap-3">
                <a href="#" className="hover:text-blue-400">𝕏</a>
                <a href="#" className="hover:text-blue-400">f</a>
                <a href="#" className="hover:text-blue-400">📌</a>
                <a href="#" className="hover:text-blue-400">📷</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/assets/images/resources/logo-1.png"
                alt="Itzone Logo"
                width={150}
                height={50}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <Navigation />

            {/* Right Side */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-xs text-gray-600">Call Anytime</p>
                  <a href="tel:+92-8800-6780" className="font-bold text-blue-600">
                    +92 (8800) - 6780
                  </a>
                </div>
              </div>
              <Link href="/about" className="thm-btn hidden md:inline-flex">
                Discover More
                <span>→</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-2xl"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t">
              <Navigation mobile />
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
