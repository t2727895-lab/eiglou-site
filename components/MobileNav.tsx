import Link from 'next/link';

export default function MobileNav() {
  return (
    <div className="mobile-nav__wrapper">
      <div className="mobile-nav__overlay mobile-nav__toggler"></div>
      <div className="mobile-nav__content">
        <span className="mobile-nav__close mobile-nav__toggler"><i className="fa fa-times"></i></span>

        <div className="logo-box">
          <Link href="/" aria-label="logo image">
            <img src="/assets/images/resources/logo-2.png" width="150" alt="" />
          </Link>
        </div>
        <div className="mobile-nav__container"></div>

        <ul className="mobile-nav__contact list-unstyled">
          <li>
            <i className="fa fa-envelope"></i>
            <Link href="mailto:info@eiglou.com">info@eiglou.com</Link>
          </li>
          <li>
            <i className="fas fa-phone"></i>
            <Link href="tel:+923216933222">+92-321-69-33-222</Link>
          </li>
        </ul>
        <div className="mobile-nav__top">
          <div className="mobile-nav__social">
            <Link href="#" className="fab fa-twitter"></Link>
            <Link href="#" className="fab fa-facebook-square"></Link>
            <Link href="#" className="fab fa-pinterest-p"></Link>
            <Link href="#" className="fab fa-instagram"></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
