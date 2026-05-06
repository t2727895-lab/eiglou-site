import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Services || Itzone || Itzone Next.js Template',
  description: 'Explore our comprehensive IT services.',
};

const PLACEHOLDER_IMG = '/assets/images/services/services-2-1.jpg';
const ICONS = [
  'icon-ux-design',
  'icon-software-development',
  'icon-product-design',
  'icon-code',
  'icon-promotion-1',
  'icon-social-media-marketing',
];

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').trim();
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { status: 'published' },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      title: true,
      slug: true,
      tagline: true,
      description: true,
      image: true,
    },
  });

  const delays = ['100ms', '300ms', '500ms', '700ms', '900ms', '1100ms'];
  const fadeClasses = ['wow fadeInLeft', 'wow fadeInUp', 'wow fadeInRight'];

  return (
    <>
      <PageHeader
        title="Services"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />

      {/* Services Page Start */}
      <section className="services-page">
        <div className="container">
          {services.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <p>No services found. Add some from the admin panel.</p>
            </div>
          ) : (
            <div className="row">
              {services.map((service, index) => {
                const icon  = ICONS[index % ICONS.length];
                const delay = delays[index % delays.length];
                const fade  = fadeClasses[index % fadeClasses.length];
                const text  = service.tagline || stripHtml(service.description).slice(0, 80) + '…';

                return (
                  <div
                    key={service.id}
                    className={`col-xl-4 col-lg-6 col-md-6 ${fade}`}
                    data-wow-delay={delay}
                  >
                    <div className="services-two__single">
                      <div className="services-two__img-box">
                        <div className="services-two__img">
                          <img
                            src={service.image || PLACEHOLDER_IMG}
                            alt={service.title}
                          />
                        </div>
                        <div className="services-two__icon">
                          <span className={icon}></span>
                        </div>
                      </div>
                      <div className="services-two__content">
                        <h3 className="services-two__title">
                          <Link href={`/services/${service.slug}`}>{service.title}</Link>
                        </h3>
                        <p className="services-two__text">{text}</p>
                        <div className="services-two__plus">
                          <Link href={`/services/${service.slug}`}>
                            <span className="fas fa-plus"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      {/* Services Page End */}

      <NewsletterTwo />
    </>
  );
}
