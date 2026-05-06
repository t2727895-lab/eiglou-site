'use client'

import { useState } from 'react'
import Button from '@/components/common/Button'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="newsletter py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg opacity-90">
              Get the latest IT tips, industry insights, and exclusive offers straight to your inbox.
            </p>
          </div>

          {/* Right - Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
              >
                Subscribe
                <span>→</span>
              </button>
            </form>

            {/* Checkbox */}
            <div className="mt-4 flex items-center gap-2">
              <input type="checkbox" id="privacy" defaultChecked className="w-4 h-4" />
              <label htmlFor="privacy" className="text-sm opacity-90">
                I agree to the Privacy Policy
              </label>
            </div>

            {/* Success Message */}
            {subscribed && (
              <div className="mt-4 p-4 bg-green-500 rounded-lg text-white">
                ✓ Thank you for subscribing!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
