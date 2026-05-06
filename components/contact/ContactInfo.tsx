import Link from 'next/link';

export default function ContactInfo() {
  return (
    <section className="contact-info">
      <div className="container">
        <div className="row">
          {/* Phone */}
          <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="100ms">
            <div className="contact-info__single">
              <div className="contact-info__icon">
                <span className="icon-call"></span>
              </div>
              <p>Contact Us</p>
              <h3>
                <Link href="tel:+923216933222">+92-321-69-33-222</Link>
              </h3>
            </div>
          </div>
          {/* Email */}
          <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="200ms">
            <div className="contact-info__single">
              <div className="contact-info__icon">
                <span className="icon-email"></span>
              </div>
              <p>Email Us</p>
              <h3>
                <Link href="mailto:info@eiglou.com">info@eiglou.com</Link>
              </h3>
            </div>
          </div>
          {/* Address */}
          <div className="col-xl-4 col-lg-4 wow fadeInRight" data-wow-delay="300ms">
            <div className="contact-info__single">
              <div className="contact-info__icon">
                <span className="icon-pin"></span>
              </div>
              <p>Our Office Location</p>
              <h3>20/A Main Market Rd, Fateh Sher Colony, Sahiwal, 57000</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
