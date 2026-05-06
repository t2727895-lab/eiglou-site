import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';

export const metadata = {
  title: 'Testimonials || Itzone || Itzone Next.js Template',
  description: 'What our clients say about our services.',
};

export default function TestimonialsPage() {
  const testimonials = [
    { name: 'Thomas Alison', role: 'UI/UX Designer', image: '/assets/images/testimonial/testimonial-1-1.jpg' },
    { name: 'Sarah Williams', role: 'Marketing Manger', image: '/assets/images/testimonial/testimonial-1-2.jpg' },
    { name: 'James Anderson', role: 'CEO at Anaton', image: '/assets/images/testimonial/testimonial-1-3.jpg' },
    { name: 'Adam Smith', role: 'UI/UX Designer', image: '/assets/images/testimonial/testimonial-1-4.jpg' },
    { name: 'Alisha Martin', role: 'Marketing Manger', image: '/assets/images/testimonial/testimonial-1-5.jpg' },
    { name: 'Devid Koper', role: 'CEO at Anaton', image: '/assets/images/testimonial/testimonial-1-6.jpg' },
  ];

  return (
    <>
      <PageHeader 
        title="Testimonials" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Testimonials' }
        ]} 
      />

      {/* Testimonial Page Start */}
      <section className="testimonial-page">
        <div className="container">
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-xl-4 col-lg-6 col-md-6">
                <div className="testimonial-one__single">
                  <div className="testimonial-one__single-inner">
                    <div className="testimonial-one__single-shape-1"></div>
                    <div className="testimonial-one__star">
                      <span className="icon-star-1"></span>
                      <span className="icon-star-1"></span>
                      <span className="icon-star-1"></span>
                      <span className="icon-star"></span>
                      <span className="icon-star"></span>
                    </div>
                    <p className="testimonial-one__text">
                      Absolutely fantastic experience! The team exceeded our expectations and delivered a solution that perfectly met our needs. Their attention to detail and commitment to quality is unmatched.
                    </p>
                  </div>
                  <div className="testimonial-one__client-info">
                    <div className="testimonial-one__client-img">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="testimonial-one__client-content">
                      <h4 className="testimonial-one__client-name">
                        <Link href="/testimonials">{testimonial.name}</Link>
                      </h4>
                      <p className="testimonial-one__sub-title">{testimonial.role}</p>
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
      {/* Testimonial Page End */}

      <NewsletterTwo />
    </>
  );
}
