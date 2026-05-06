'use client'

import Image from 'next/image'
import SectionTitle from '@/components/common/SectionTitle'
import { useInView } from 'react-intersection-observer'

const teamMembers = [
  {
    name: 'John Smith',
    position: 'CEO & Founder',
    image: '/assets/images/resources/about-one-client-img-1.jpg',
    social: ['twitter', 'facebook', 'linkedin'],
  },
  {
    name: 'Sarah Johnson',
    position: 'Lead Developer',
    image: '/assets/images/resources/about-one-client-img-1.jpg',
    social: ['twitter', 'facebook', 'linkedin'],
  },
  {
    name: 'Mike Davis',
    position: 'UI/UX Designer',
    image: '/assets/images/resources/about-one-client-img-1.jpg',
    social: ['twitter', 'facebook', 'linkedin'],
  },
  {
    name: 'Emily Brown',
    position: 'Project Manager',
    image: '/assets/images/resources/about-one-client-img-1.jpg',
    social: ['twitter', 'facebook', 'linkedin'],
  },
]

export default function Team() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="team py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionTitle
          tagline="Our Team"
          title="Meet Our Expert"
          highlight="Team Members"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group text-center transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={350}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center gap-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                    {member.social.map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"
                      >
                        {social[0].toUpperCase()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
