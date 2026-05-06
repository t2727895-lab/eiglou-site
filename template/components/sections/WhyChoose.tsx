'use client'

import Image from 'next/image'
import SectionTitle from '@/components/common/SectionTitle'
import { useInView } from 'react-intersection-observer'

const features = [
  { title: 'Expert Team', percentage: 90 },
  { title: 'Quality Service', percentage: 85 },
  { title: 'Fast Delivery', percentage: 95 },
  { title: 'Support 24/7', percentage: 100 },
]

export default function WhyChoose() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="why-choose py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Image
              src="/assets/images/resources/about-one-img-1.jpg"
              alt="Why Choose Us"
              width={500}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Content */}
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <SectionTitle
              tagline="Why Choose Us"
              title="Why Choose Our"
              highlight="IT Solutions"
              centered={false}
            />
            <p className="text-gray-600 mb-8 leading-relaxed">
              We provide comprehensive IT solutions tailored to your business needs with expert support and proven results.
            </p>

            {/* Progress Bars */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">{feature.title}</span>
                    <span className="text-blue-600 font-bold">{feature.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                      style={{
                        width: inView ? `${feature.percentage}%` : '0%',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call Box */}
            <div className="mt-12 bg-blue-600 text-white p-8 rounded-lg">
              <h4 className="text-xl font-bold mb-2">Need Help?</h4>
              <p className="mb-4">Contact our expert team for a free consultation</p>
              <a href="tel:+92-8800-6780" className="inline-flex items-center gap-2 font-bold hover:underline">
                📞 +92 (8800) - 6780
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
