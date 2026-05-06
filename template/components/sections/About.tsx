'use client'

import Image from 'next/image'
import Button from '@/components/common/Button'
import SectionTitle from '@/components/common/SectionTitle'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const points = [
    {
      icon: '🏆',
      title: 'Award-Winning Company',
      description: 'Partner with us to unlock new possibilities, drive progress, and shape a future filled with success',
    },
    {
      icon: '✓',
      title: 'Certified Company',
      description: 'Partner with us to unlock new possibilities, drive progress, and shape a future filled with success',
    },
  ]

  return (
    <section ref={ref} className="about-one py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <SectionTitle
              tagline="About Us"
              title="Boost Business with Our"
              highlight="Innovative IT Solutions"
              centered={false}
            />
            <p className="text-gray-600 mb-8 leading-relaxed">
              Innovating and empowering businesses with tailored solutions for success and growth. Empowering businesses to create meaningful innovation.
            </p>

            {/* Points */}
            <div className="space-y-6 mb-8">
              {points.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">{point.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{point.title}</h4>
                    <p className="text-gray-600 text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/about">
                Learn More
                <span>→</span>
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold">120K+ Satisfied Clients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <Image
                src="/assets/images/resources/about-one-img-1.jpg"
                alt="About"
                width={500}
                height={600}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-lg shadow-lg">
                <a
                  href="https://www.youtube.com/watch?v=rbFoRH2deeY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl hover:bg-blue-700 transition-colors"
                >
                  ▶
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
