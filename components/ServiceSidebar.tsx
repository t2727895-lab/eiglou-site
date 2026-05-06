import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ServiceSidebar() {
  const pathname = usePathname();

  const services = [
    { name: 'UI/UX Design', href: '/ui-ux-design' },
    { name: 'Web Development', href: '/web-development' },
    { name: 'Digital Marketing', href: '/digital-marketing' },
    { name: 'Business Analysis', href: '/business-analysis' },
    { name: 'Software Development', href: '/software-development' },
    { name: 'Product Design', href: '/product-design' },
  ];

  return (
    <div className="service-details__sidebar">
      <div className="service-details__services-box">
        <h3 className="service-details__services-title">Our Services</h3>
        <ul className="service-details__services-list list-unstyled">
          {services.map((service, index) => (
            <li key={index} className={pathname === service.href ? 'active' : ''}>
              <Link href={service.href}>
                {service.name} <span className="icon-arrow-right"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="service-details__get-started">
        <h3 className="service-details__get-started-title">Get Started Today</h3>
        <p className="service-details__get-started-text">
          Pianissimos of dulcimers qui therefore always holds in these matters to this principle
        </p>
        <ul className="service-details__get-started-points list-unstyled">
          <li>
            <div className="icon">
              <span className="icon-call"></span>
            </div>
            <p><Link href="tel:585858575084"> 58 585 857 5084</Link></p>
          </li>
          <li>
            <div className="icon">
              <span className="icon-email"></span>
            </div>
            <p><Link href="mailto:example@gmail.com">example@gmail.com</Link></p>
          </li>
          <li>
            <div className="icon">
              <span className="icon-pin"></span>
            </div>
            <p>4517 Washington Ave. Manchester,<br /> Kentucky 39495</p>
          </li>
        </ul>
        <div className="service-details__get-started-btn-box">
          <Link href="/contact" className="thm-btn">
            get in touch <span className="fas fa-arrow-right"></span>
          </Link>
        </div>
      </div>
      <div className="service-details__sidebar-download-box">
        <h3 className="service-details__services-title">Download</h3>
        <div className="service-details__sidebar-single-download">
          <ul className="clearfix list-unstyled">
            {[1, 2, 3].map((item) => (
              <li key={item}>
                <div className="content-box">
                  <div className="icon">
                    <span className="far fa-file-pdf"></span>
                  </div>
                  <div className="text-box">
                    <h5><Link href="#">Pdf Download</Link></h5>
                    <p><Link href="#">Download</Link></p>
                  </div>
                </div>
                <div className="btn-box">
                  <Link href="#"><span className="far fa-cloud-download"></span></Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
