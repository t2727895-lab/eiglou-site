import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

// Render filled/empty stars based on rating (1–5)
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="testimonial-one__star">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'icon-star-1' : 'icon-star'}
        ></span>
      ))}
    </div>
  );
}

export default async function TestimonialOne() {
  // Fetch only published reviews, featured first, then by order
  const reviews = await prisma.review.findMany({
    where: { status: 'published' },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
  });

  // Don't render the section if there are no published reviews
  if (reviews.length === 0) return null;

  return (
    <section className="testimonial-one">
      <div className="testimonial-one__bg-color">
        <div
          className="testimonial-one__bg"
          style={{ backgroundImage: 'url(/assets/images/backgrounds/testimonial-one-bg.jpg)' }}
        ></div>
      </div>
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Testimonials</span>
          </div>
          <h2 className="section-title__title title-animation">
            What Client Say <span>About </span>us
          </h2>
        </div>
        <div className="testimonial-one__carousel owl-theme owl-carousel">
          {reviews.map((t) => (
            <div className="item" key={t.id}>
              <div className="testimonial-one__single">
                <div className="testimonial-one__single-inner">
                  <div className="testimonial-one__single-shape-1"></div>
                  <StarRating rating={t.rating} />
                  <p className="testimonial-one__text">{t.review}</p>
                </div>
                <div className="testimonial-one__client-info">
                  <div className="testimonial-one__client-img">
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={`${t.name}${t.tagline ? ` — ${t.tagline}` : ''}`}
                        width={70}
                        height={70}
                        style={{ objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      // Fallback: initials avatar — must be 60x60 to match .testimonial-one__client-img
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          background: '#4f46e5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: 22,
                          fontWeight: 700,
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="testimonial-one__client-content">
                    <h4 className="testimonial-one__client-name">
                      <Link href="/testimonials">{t.name}</Link>
                    </h4>
                    {t.tagline && (
                      <p className="testimonial-one__sub-title">{t.tagline}</p>
                    )}
                  </div>
                </div>
                <div className="testimonial-one__quote">
                  <span className="fal fa-quote-right"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
