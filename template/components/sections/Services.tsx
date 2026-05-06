'use client'

import SectionTitle from '@/components/common/SectionTitle'
import Button from '@/components/common/Button'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    icon: '💻',
    title: 'Software Development',
    description: 'Innovating and empowering businesses with tailored solutions for success and growth.',
    link: '/services/software-development',
  },
  {
    icon: '⚠️',
    title: 'Risk Management',
    description: 'Innovating and empowering businesses with tailored solutions for success and growth.',
    link: '/services/risk-management',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Innovating and empowering businesses with tailored solutions for success and growth.',
    link: '/services/ui-ux-design',
  },
  {
    icon: '📢',
    title: 'Digital Marketing',
    description: 'Innovating and empowering businesses with tailored solutions for success and growth.',
    link: '/services/digital-marketing',
  },
  {
    icon: '☁️',
    title: 'Cloud Services',
    description: 'Innovating and empowering businesses with tailored solutions for success and growth.',
    link: '/services/cloud-services',
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    description: 'Innovating and empowering businesses with tailored solutions for success and growth.',
    link: '/services/data-analytics',
  },
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="service-one py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionTitle
          tagline="Our Services"
          title="Innovative IT Services"
          highlight="Tailored For Your Success."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button href={service.link} variant="outline" size="sm">
                  Read More
                  <span>→</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
