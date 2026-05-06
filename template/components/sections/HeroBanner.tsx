'use client'

import Image from 'next/image'
import Button from '@/components/common/Button'
import { useEffect, useState } from 'react'

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="banner-one py-20 md:py-32 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`banner-one__img-box transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <Image
                src="/assets/images/resources/banner-one-img-1-eiglou.png"
                alt="Banner"
                width={400}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-blue-600">25+</h3>
                  <p className="text-gray-600">Years of Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`banner-one__content transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="mb-6">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Best IT Solution Service
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Modern Your Business
              <br />
              With <span className="text-blue-600">IT service.</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              IT solutions refer to a broad range of services and technologies designed to address specific business needs, streamline operations, and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/about" size="lg">
                Discover More
                <span>→</span>
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Let's Talk
                <span>→</span>
              </Button>
            </div>

            {/* Video Link */}
            <div className="mt-12">
              <a
                href="https://www.youtube.com/watch?v=rbFoRH2deeY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 group"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:bg-blue-700 transition-colors">
                  ▶
                </div>
                <span className="text-gray-700 font-semibold">Watch Demo Video</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
