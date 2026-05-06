'use client'

import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const brands = [
  { name: 'Brand 1', logo: '/assets/images/brand/brand-1-1.png' },
  { name: 'Brand 2', logo: '/assets/images/brand/brand-1-2.png' },
  { name: 'Brand 3', logo: '/assets/images/brand/brand-1-3.png' },
  { name: 'Brand 4', logo: '/assets/images/brand/brand-1-4.png' },
  { name: 'Brand 5', logo: '/assets/images/brand/brand-1-5.png' },
]

export default function Brands() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="brands py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-12">Our Trusted Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={150}
                height={80}
                className="w-full h-auto max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
