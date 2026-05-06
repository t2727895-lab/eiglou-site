import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';

export const metadata = {
  title: 'Pricing || Itzone || Itzone Next.js Template',
  description: 'Our affordable pricing plans for your business needs.',
};

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Basic Plan',
      price: '$35.00',
      delay: '100ms',
      points: [
        'Multi-Language Content',
        'Programmable Chatbots',
        'Digital Analysis',
        'Social Media Marketing',
        'Technical Support'
      ]
    },
    {
      name: 'Standard Plan',
      price: '$75.00',
      delay: '200ms',
      recommended: true,
      points: [
        'Multi-Language Content',
        'Programmable Chatbots',
        'Digital Analysis',
        'Social Media Marketing',
        'Technical Support'
      ]
    },
    {
      name: 'Premium Plan',
      price: '$93.00',
      delay: '300ms',
      points: [
        'Multi-Language Content',
        'Programmable Chatbots',
        'Digital Analysis',
        'Social Media Marketing',
        'Technical Support'
      ]
    }
  ];

  return (
    <>
      <PageHeader 
        title="Pricing" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Pricing' }
        ]} 
      />

      {/* Pricing One Start */}
      <section className="pricing-one">
        <div className="pricing-one__shape-1"></div>
        <div className="pricing-one__shape-2 float-bob-y">
          <img src="/assets/images/shapes/pricing-one-shape-2.png" alt="" />
        </div>
        <div className="container">
          <div className="section-title text-center">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">Our Pricing Plan</span>
            </div>
            <h2 className="section-title__title">Popular Pricing <span>Package</span></h2>
          </div>
          <div className="row">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`col-xl-4 col-lg-4 col-md-6 wow fadeInUp`} data-wow-delay={plan.delay}>
                <div className="pricing-one__single">
                  {plan.recommended && <div className="pricing-one__single-shape-1"></div>}
                  <div className="pricing-one__price-box">
                    <div 
                      className="pricing-one__price-box-shape"
                      style={{ backgroundImage: 'url(/assets/images/shapes/pricing-one-price-box-shape-1.png)' }}
                    ></div>
                    {plan.recommended && (
                      <div className="pricing-one__recomanded">
                        <span>Recommended</span>
                      </div>
                    )}
                    <span>{plan.name}</span>
                    <h3 className="pricing-one__price">{plan.price}</h3>
                    <p className="pricing-one__price-sub-title">Get Popular Plan From Us</p>
                  </div>
                  <div className="pricing-one__points-and-btn">
                    <ul className="pricing-one__price-points list-unstyled">
                      {plan.points.map((point, idx) => (
                        <li key={idx}>
                          <div className="icon">
                            <span className="icon-check"></span>
                          </div>
                          <p>{point}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="pricing-one__btn-box">
                      <Link href="/pricing" className="thm-btn">
                        Choose Plan <span className="fas fa-arrow-right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing One End */}

      <NewsletterTwo />
    </>
  );
}
