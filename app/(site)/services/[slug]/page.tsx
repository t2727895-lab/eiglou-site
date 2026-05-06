import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';
import { prisma } from '@/lib/prisma';

const PLACEHOLDER_IMG = '/assets/images/services/services-2-1.jpg';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
    select: { title: true, tagline: true },
  });
  if (!service) return {};
  return {
    title: `${service.title} || Services || Itzone`,
    description: service.tagline ?? `Learn more about our ${service.title} service`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const [service, allServices] = await Promise.all([
    prisma.service.findUnique({
      where: { slug },
      include: { faqs: { orderBy: { order: 'asc' } } },
    }),
    prisma.service.findMany({
      where: { status: 'published' },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      select: { id: true, title: true, slug: true },
    }),
  ]);

  if (!service || service.status !== 'published') notFound();

  return (
    <>
      <PageHeader
        title={service.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* Service Details Start */}
      <section className="service-details">
        <div className="container">
          <div className="row">

            {/* ── Main Content ──────────────────────────────────────── */}
            <div className="col-xl-8 col-lg-7">
              <div className="service-details__left">

                {/* Cover image */}
                <div className="service-details__img">
                  <img src={service.image || PLACEHOLDER_IMG} alt={service.title} />
                </div>

                {/* Tagline */}
                {service.tagline && (
                  <p style={{ fontSize: 18, fontWeight: 500, margin: '20px 0' }}>
                    {service.tagline}
                  </p>
                )}

                {/* Rich-text description */}
                <div
                  className="service-details__text"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />

                {/* FAQs */}
                {service.faqs.length > 0 && (
                  <div className="service-details__faq" style={{ marginTop: 40 }}>
                    <h3 className="service-details__title" style={{ marginBottom: 20 }}>
                      Frequently Asked Questions
                    </h3>
                    <div className="accrodion-grp faq-one-accrodion" data-grp-name="faq-one-accrodion-1">
                      {service.faqs.map((faq, i) => (
                        <div key={faq.id} className={`accrodion${i === 0 ? ' active' : ''}`}>
                          <div className="accrodion-title">
                            <h4>{faq.question}</h4>
                          </div>
                          <div className="accrodion-content" style={i === 0 ? {} : { display: 'none' }}>
                            <div className="inner">
                              <p>{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* ── Sidebar ───────────────────────────────────────────── */}
            <div className="col-xl-4 col-lg-5">
              <div className="service-details__sidebar">

                {/* All Services list */}
                <div className="service-details__services-box">
                  <h3 className="service-details__services-title">All Services</h3>
                  <ul className="service-details__services-list list-unstyled">
                    {allServices.map((s) => (
                      <li key={s.id} className={s.slug === slug ? 'active' : ''}>
                        <Link href={`/services/${s.slug}`}>
                          {s.title}
                          <span className="icon-right-arrow"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA box */}
                <div className="service-details__get-started">
                  <h3 className="service-details__get-started-title">Get Started Today</h3>
                  <p className="service-details__get-started-text">
                    Ready to take the next step? Let&apos;s talk about how we can help your business grow.
                  </p>
                  <div className="service-details__get-started-btn-box" style={{ marginTop: 20 }}>
                    <Link href="/contact" className="thm-btn">
                      Get In Touch <span className="fas fa-arrow-right"></span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Service Details End */}

      <NewsletterTwo />
    </>
  );
}
