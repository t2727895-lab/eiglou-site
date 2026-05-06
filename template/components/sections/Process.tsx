'use client'

import SectionTitle from '@/components/common/SectionTitle'
import { useInView } from 'react-intersection-observer'

const steps = [
  {
    number: '01',
    title: 'Choose Service',
    description: 'Select the IT service that best fits your business requirements and goals.',
  },
  {
    number: '02',
    title: 'Analyze Needs',
    description: 'Our team analyzes your specific needs and creates a tailored solution plan.',
  },
  {
    number: '03',
    title: 'Execute Plan',
    description: 'We implement the solution with precision and attention to detail.',
  },
  {
    number: '04',
    title: 'Deliver Results',
    description: 'Receive your completed project with ongoing support and maintenance.',
  },
]

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="process py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionTitle
          tagline="Our Process"
          title="How We Work"
          highlight="Step by Step"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 text-3xl text-blue-600">
                  →
                </div>
              )}

              <div className="bg-white rounded-lg shadow-lg p-8 h-full hover:shadow-xl transition-shadow">
                <div className="text-5xl font-bold text-blue-600 mb-4 opacity-20">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
