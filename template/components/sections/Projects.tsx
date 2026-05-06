'use client'

import Image from 'next/image'
import SectionTitle from '@/components/common/SectionTitle'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: '/assets/images/resources/about-one-img-1.jpg',
  },
  {
    title: 'Mobile App Design',
    category: 'UI/UX Design',
    image: '/assets/images/resources/about-one-img-1.jpg',
  },
  {
    title: 'Cloud Migration',
    category: 'Cloud Services',
    image: '/assets/images/resources/about-one-img-1.jpg',
  },
  {
    title: 'Data Analytics Dashboard',
    category: 'Data Analytics',
    image: '/assets/images/resources/about-one-img-1.jpg',
  },
  {
    title: 'Security Audit',
    category: 'Risk Management',
    image: '/assets/images/resources/about-one-img-1.jpg',
  },
  {
    title: 'Marketing Campaign',
    category: 'Digital Marketing',
    image: '/assets/images/resources/about-one-img-1.jpg',
  },
]

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="projects py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          tagline="Our Portfolio"
          title="Recent Projects"
          highlight="We've Completed"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-end">
                <div className="w-full p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm text-blue-300 mb-2">{project.category}</p>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
