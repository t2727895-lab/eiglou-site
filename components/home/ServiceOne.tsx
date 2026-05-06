import Link from 'next/link';
import { prisma } from '@/lib/prisma';

// Default fallback icon if none set
const DEFAULT_ICON = 'icon-implement';

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { status: 'published' },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        title: true,
        slug: true,
        tagline: true,
        description: true,
        icon: true,
      },
    });
    return services;
  } catch {
    return [];
  }
}

export default async function ServiceOne() {
  const services = await getServices();

  return (
    <section className="service-one">
      <div className="services-one__shape-1"></div>
      <div className="services-one__shape-2 float-bob-x">
        <img src="/assets/images/shapes/services-one-shape-2.png" alt="" />
      </div>
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Our Services</span>
          </div>
          <h2 className="section-title__title title-animation">
            Innovative IT Services<br /> Tailored <span>For Your Success.</span>
          </h2>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            No services published yet.
          </p>
        ) : (
          <div className="service-one__carousel owl-theme owl-carousel">
            {services.map((service) => {
              // Strip HTML tags from description for the card text
              const plainText = service.tagline
                ? service.tagline
                : service.description.replace(/<[^>]+>/g, '').slice(0, 120);

              return (
                <div className="item" key={service.id}>
                  <div className="service-one__single-inner">
                    <div className="service-one__single-wrap">
                      <div className="service-one__single">
                        <div className="service-one__single-shape-1"></div>
                        <div className="service-one__icon">
                          <span className={service.icon ?? DEFAULT_ICON}></span>
                        </div>
                        <h3 className="service-one__title">
                          <Link href={`/services/${service.slug}`}>{service.title}</Link>
                        </h3>
                        <p className="service-one__text">{plainText}</p>
                      </div>
                    </div>
                    <div className="service-one__btn-box">
                      <Link href={`/services/${service.slug}`} className="thm-btn">
                        Read More
                        <span className="fas fa-arrow-right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
