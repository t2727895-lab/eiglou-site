'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
}

interface HeaderProps {
  services?: ServiceItem[];
}

export default function Header({ services = [] }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="main-header">
      <div className="main-menu__top">
        <div className="main-menu__top-inner">
          <ul className="list-unstyled main-menu__contact-list">
            <li>
              <div className="icon">
                <i className="icon-email"></i>
              </div>
              <div className="text">
                <p><Link href="mailto:info@eiglou.com">info@eiglou.com</Link></p>
              </div>
            </li>
            <li>
              <div className="icon">
                <i className="icon-pin"></i>
              </div>
              <div className="text">
                <p>20/A Main Market Rd, Fateh Sher Colony, Sahiwal, 57000</p>
              </div>
            </li>
          </ul>
          <div className="main-menu__top-right">
            <ul className="list-unstyled main-menu__contact-list" style={{ margin: 0 }}>
              <li>
                <div className="icon">
                  <i className="icon-call"></i>
                </div>
                <div className="text">
                  <p><Link href="tel:+923216933222">+92-321-69-33-222</Link></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav className="main-menu">
        <div className="main-menu__wrapper">
          <div className="main-menu__wrapper-inner">
            <div className="main-menu__left">
              <div className="main-menu__logo">
                <Link href="/">
                  <Image
                    src="/assets/images/resources/logo.png"
                    alt="Itzone logo"
                    width={160}
                    height={50}
                    priority
                  />
                </Link>
              </div>
            </div>
            <div className="main-menu__main-menu-box">
              <a href="#" className="mobile-nav__toggler"><i className="fa fa-bars"></i></a>
              <ul className="main-menu__list">
                <li className={pathname === '/' ? 'current' : ''}>
                  <Link href="/">Home</Link>
                </li>
                <li className={pathname === '/about' ? 'current' : ''}>
                  <Link href="/about">About</Link>
                </li>

                {/* Services dropdown */}
                <li className={`dropdown ${pathname === '/services' || pathname.startsWith('/services/') ? 'current' : ''}`}>
                  <Link href="/services">Services</Link>
                  {services.length > 0 && (
                    <ul className="shadow-box">
                      {services.map((service) => (
                        <li key={service.id}>
                          <Link
                            href={`/services/${service.slug}`}
                            className={pathname === `/services/${service.slug}` ? 'current' : ''}
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className={pathname === '/projects' ? 'current' : ''}>
                  <Link href="/projects">Portfolio</Link>
                </li>
                <li className={pathname === '/blog' || pathname.startsWith('/blog/') ? 'current' : ''}>
                  <Link href="/blog">Blog</Link>
                </li>
                <li className={pathname === '/contact' ? 'current' : ''}>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="stricky-header stricked-menu main-menu">
        <div className="sticky-header__content"></div>
      </div>
    </header>
  );
}
