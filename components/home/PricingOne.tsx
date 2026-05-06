import Image from 'next/image';
import Link from 'next/link';

const features = [
  'Multi-Language Content',
  'Programmable Chatbots',
  'Digital Analysis',
  'Social Media Marketing',
  'Technical Support',
];

const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '$35.00',
    recommended: false,
    wowClass: 'fadeInLeft',
    delay: '100ms',
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: '$75.00',
    recommended: true,
    wowClass: 'fadeInUp',
    delay: '200ms',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '$93.00',
    recommended: false,
    wowClass: 'fadeInRight',
    delay: '300ms',
  },
];

export default function PricingOne() {
  return (
    <section className="pricing-one">
      <div className="pricing-one__shape-1"></div>
      <div className="pricing-one__shape-2 float-bob-y">
        <Image
          src="/assets/images/shapes/pricing-one-shape-2.png"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Our Pricing Plan</span>
          </div>
          <h2 className="section-title__title title-animation">
            Popular Pricing <span>Package</span>
          </h2>
        </div>
        <div className="row">
          {plans.map((plan) => (
            <div
              className={`col-xl-4 col-lg-4 col-md-6 wow ${plan.wowClass}`}
              data-wow-delay={plan.delay}
              key={plan.id}
            >
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
                    {features.map((feature) => (
                      <li key={feature}>
                        <div className="icon">
                          <span className="icon-check"></span>
                        </div>
                        <p>{feature}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="pricing-one__btn-box">
                    <Link href="/pricing" className="thm-btn">
                      Choose Plan
                      <span className="fas fa-arrow-right"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
