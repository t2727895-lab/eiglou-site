'use client'

import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const counters = [
  { label: 'Projects Completed', value: 500, suffix: '+' },
  { label: 'Happy Clients', value: 120, suffix: 'K' },
  { label: 'Team Members', value: 50, suffix: '+' },
  { label: 'Awards Won', value: 25, suffix: '+' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    let start = 0
    const increment = value / 50
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 30)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-blue-600">
      {count}
      {suffix}
    </div>
  )
}

export default function Counter() {
  return (
    <section className="counter py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter, index) => (
            <div key={index} className="text-center">
              <AnimatedCounter value={counter.value} suffix={counter.suffix} />
              <p className="text-lg mt-4 opacity-90">{counter.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
