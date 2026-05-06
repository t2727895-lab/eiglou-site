'use client'

import SectionTitle from '@/components/common/SectionTitle'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    name: 'John Doe',
    position: 'CEO, Tech Company',
    text: 'Itzone provided exceptional IT solutions that transformed our business operations. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    position: 'Manager, Finance Corp',
    text: 'Outstanding service and support. The team was professional and delivered on time.',
    rating: 5,
  },
  {
    name: 'Mike Johnson',
    position: 'Director, E-Commerce',
    text: 'Great experience working with Itzone. They understood our needs perfectly.',
    rating: 4,
  },
  {
    name: 'Sarah Williams',
    position: 'Owner, Startup',
    text: 'Best decision we made for our IT infrastructure. Highly skilled team!',
    rating: 5,
  },
  {
    name: 'David Brown',
    position: 'CTO, Innovation Labs',
    text: 'Professional, reliable, and innovative. Itzone is our go-to IT partner.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    position: 'Manager, Retail Chain',
    text: 'Excellent support and quick response times. Very satisfied with the results.',
    rating: 4,
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="testimonials py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionTitle
          tagline="Client Reviews"
          title="What Our Clients"
          highlight="Say About Us"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>

              {/* Author */}
              <div className="border-t pt-4">
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
