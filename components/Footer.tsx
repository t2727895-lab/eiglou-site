import Image from 'next/image';
import Link from 'next/link';

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
}

interface FooterProps {
  services?: ServiceItem[];
}

export default function Footer({ services = [] }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__bg" style={{ backgroundImage: 'url(/assets/images/backgrounds/site-footer-bg.jpg)' }}></div>
      <div className="site-footer__shape-1 img-bounce-two"></div>
      <div className="site-footer__shape-2 float-bob-y"></div>
      <div className="site-footer__top">
        <div className="container">
          <div className="site-footer__top-inner">
            <div className="row">

              {/* About */}
              <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                <div className="footer-widget__about">
                  <div className="footer-widget__about-logo">
                    <Link href="/">
                      <Image
                        src="/assets/images/logo/eiglou-transparent.png"
                        alt="Eiglou"
                        width={160}
                        height={60}
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                  <p className="footer-widget__about-text">
                    We deliver innovative IT solutions from web development and UI/UX design to digital marketing and cyber security helping businesses grow and thrive in the digital age.
                  </p>
                  <div className="footer-widget__social">
                    <Link href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></Link>
                    <Link href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></Link>
                    <Link href="#" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></Link>
                    <Link href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></Link>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                <div className="footer-widget__links">
                  <h4 className="footer-widget__title">Quick Links</h4>
                  <ul className="footer-widget__links-list list-unstyled">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/services">Our Services</Link></li>
                    <li><Link href="/projects">Portfolio</Link></li>
                    <li><Link href="/blog">Blog & News</Link></li>
                    <li><Link href="/contact">Contact Us</Link></li>
                  </ul>
                </div>
              </div>

              {/* Services  dynamic from DB, fallback to static */}
              <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                <div className="footer-widget__services">
                  <h4 className="footer-widget__title">Our Services</h4>
                  <ul className="footer-widget__links-list list-unstyled">
                    {services.length > 0 ? (
                      services.slice(0, 6).map((service) => (
                        <li key={service.id}>
                          <Link href={`/services/${service.slug}`}>{service.title}</Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><Link href="/services">Web Development</Link></li>
                        <li><Link href="/services">UI/UX Design</Link></li>
                        <li><Link href="/services">Digital Marketing</Link></li>
                        <li><Link href="/services">Cyber Security</Link></li>
                        <li><Link href="/services">Product Design</Link></li>
                        <li><Link href="/services">Branding</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                <div className="footer-widget__contact">
                  <h3 className="footer-widget__title">Contact Us</h3>
                  <ul className="footer-widget__contact-list list-unstyled">
                    <li>
                      <div className="icon" style={{ minWidth: 40, width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="icon-pin"></span>
                      </div>
                      <p>20/A Main Market Rd, Fateh Sher Colony, Sahiwal, 57000</p>
                    </li>
                    <li>
                      <div className="icon" style={{ minWidth: 40, width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="icon-call"></span>
                      </div>
                      <p>
                        <Link href="tel:+923216933222">+92-321-69-33-222</Link><br />
                        <Link href="tel:+924045509330">+92-40-4-55-0-933</Link>
                      </p>
                    </li>
                    <li>
                      <div className="icon" style={{ minWidth: 40, width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="icon-email"></span>
                      </div>
                      <p><Link href="mailto:info@eiglou.com">info@eiglou.com</Link></p>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="site-footer__bottom-inner">
                <div className="site-footer__copyright">
                  <p className="site-footer__copyright-text">
                    © {new Date().getFullYear()} <Link href="/">Eiglou</Link>. All Rights Reserved.
                  </p>
                </div>
                <div className="site-footer__bottom-menu-box">
                  <ul className="list-unstyled site-footer__bottom-menu">
                    <li><Link href="/contact">Terms of Service</Link></li>
                    <li><Link href="/contact">Privacy Policy</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
