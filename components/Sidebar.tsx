import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="xs-sidebar-group info-group info-sidebar">
      <div className="xs-overlay xs-bg-black"></div>
      <div className="xs-sidebar-widget">
        <div className="sidebar-widget-container">
          <div className="widget-heading">
            <a href="#" className="close-side-widget">X</a>
          </div>
          <div className="sidebar-textwidget">
            <div className="sidebar-info-contents">
              <div className="content-inner">
                <div className="logo">
                  <Link href="/"><img src="/assets/images/resources/logo-2.png" alt="" /></Link>
                </div>
                <div className="content-box">
                  <h4>About Us</h4>
                  <div className="inner-text">
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                  </div>
                </div>

                <div className="form-inner">
                  <h4>Get a free quote</h4>
                  <form action="/api/contact" method="POST" className="contact-form-validated">
                    <div className="form-group">
                      <input type="text" name="name" placeholder="Name" required />
                    </div>
                    <div className="form-group">
                      <input type="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <textarea name="message" placeholder="Message..." required></textarea>
                    </div>
                    <div className="form-group message-btn">
                      <button className="thm-btn" type="submit">
                        Submit Now
                        <span className="fas fa-arrow-right"></span>
                      </button>
                    </div>
                    <div className="result"></div>
                  </form>
                </div>

                <div className="sidebar-contact-info">
                  <h4>Contact Info</h4>
                  <ul className="list-unstyled">
                    <li>
                      <span className="icon-pin"></span> 88 broklyn street, New York
                    </li>
                    <li>
                      <span className="icon-call"></span>
                      <Link href="tel:123456789">+1 555-9990-153</Link>
                    </li>
                    <li>
                      <span className="icon-email"></span>
                      <Link href="mailto:info@example.com">info@example.com</Link>
                    </li>
                  </ul>
                </div>
                <div className="thm-social-link1">
                  <ul className="social-box list-unstyled">
                    <li>
                      <Link href="#"><i className="icon-facebook-app-symbol" aria-hidden="true"></i></Link>
                    </li>
                    <li>
                      <Link href="#"><i className="icon-twitter" aria-hidden="true"></i></Link>
                    </li>
                    <li>
                      <Link href="#"><i className="icon-linkedin" aria-hidden="true"></i></Link>
                    </li>
                    <li>
                      <Link href="#"><i className="icon-pinterest" aria-hidden="true"></i></Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
