import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Newsletter from '@/components/Newsletter';

export const metadata = {
  title: 'About Us || Itzone || Itzone Next.js Template',
  description: 'Learn more about Itzone and our innovative IT solutions',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="About Us" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' }
        ]} 
      />

      {/* About One Start */}
      <section className="about-one">
        <div className="about-one__shape-2 float-bob">
          <img src="/assets/images/shapes/about-one-shape-2.png" alt="" />
        </div>
        <div className="about-one__shape-3 float-bob-y">
          <img src="/assets/images/shapes/about-one-shape-3.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="about-one__left">
                <div className="section-title text-left sec-title-animation animation-style2">
                  <div className="section-title__tagline-box">
                    <span className="section-title__tagline">About Us</span>
                  </div>
                  <h2 className="section-title__title title-animation">
                    Boost Business with Our <br /> Innovative <span> IT Solutions</span>
                  </h2>
                </div>
                <p className="about-one__text">
                  Innovating and empowering businesses with tailored solutions for success<br /> and growth. Empowering businesses to create meaningful innovation.
                </p>
                <ul className="about-one__points list-unstyled">
                  <li>
                    <div className="icon">
                      <span className="icon-award"></span>
                    </div>
                    <div className="content">
                      <h4>Award-Winning Company.</h4>
                      <p>Partner with us to unlock new possibilities, drive progress, and shape<br /> a future filled with success</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-certified"></span>
                    </div>
                    <div className="content">
                      <h4>Certified Company</h4>
                      <p>Partner with us to unlock new possibilities, drive progress, and shape<br /> a future filled with success</p>
                    </div>
                  </li>
                </ul>
                <div className="about-one__btn-and-client-info">
                  <div className="about-one__btn-box">
                    <Link href="/about" className="thm-btn">
                      Learn More
                      <span className="fas fa-arrow-right"></span>
                    </Link>
                  </div>
                  <div className="about-one__client-info-inner">
                    <div className="about-one__client-info">
                      <div className="about-one__client-img-inner">
                        <div className="about-one__client-img">
                          <img src="/assets/images/resources/about-one-client-img-1.jpg" alt="" />
                        </div>
                      </div>
                      <div className="about-one__client-details">
                        <h5>Adam Smith</h5>
                        <p>ceo,Itzone</p>
                      </div>
                    </div>
                    <div className="about-one__client-sign">
                      <img src="/assets/images/resources/about-one-client-sign.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                <div className="about-one__img-box">
                  <div className="about-one__shape-1 float-bob-x">
                    <img src="/assets/images/shapes/about-one-shape-1.png" alt="" />
                  </div>
                  <div className="about-one__img">
                    <img src="/assets/images/resources/about-one-img-1.jpg" alt="" />
                  </div>
                  <div className="about-one__img-2">
                    <img src="/assets/images/resources/about-one-img-2.jpg" alt="" />
                  </div>
                  <div className="about-one__video-link">
                    <a href="https://www.youtube.com/watch?v=rbFoRH2deeY" className="video-popup">
                      <div className="about-one__video-icon">
                        <span className="fa fa-play"></span>
                        <i className="ripple"></i>
                      </div>
                    </a>
                  </div>
                  <div className="about-one__client-box">
                    <ul className="about-one__client-box-img-list list-unstyled">
                      <li>
                        <div className="about-one__client-box-img">
                          <img src="/assets/images/resources/about-one-client-img-1-1.jpg" alt="" />
                        </div>
                      </li>
                      <li>
                        <div className="about-one__client-box-img">
                          <img src="/assets/images/resources/about-one-client-img-1-2.jpg" alt="" />
                        </div>
                      </li>
                      <li>
                        <div className="about-one__client-box-img">
                          <img src="/assets/images/resources/about-one-client-img-1-3.jpg" alt="" />
                        </div>
                      </li>
                      <li>
                        <a href="#"><span className="fas fa-plus"></span></a>
                      </li>
                    </ul>
                    <p className="about-one__client-text">
                      <span className="odometer" data-count="120">00</span>
                      <span className="about-one__client-text-letter">K</span> Satisfied Client
                    </p>
                  </div>
                  <div className="about-one__experience-box">
                    <div className="about-one__experience-count-box">
                      <h3 className="odometer" data-count="25">00</h3>
                      <span> </span>
                    </div>
                    <p className="about-one__experience-text">Years of Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Two Start */}
      <section className="counter-two">
        <div className="counter-two__bg-shape float-bob-y"
          style={{ backgroundImage: 'url(/assets/images/shapes/counter-two-bg-shape.png)' }}></div>
        <div className="container">
          <div className="row">
            {/* Counter Two Single */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="100ms">
              <div className="counter-two__single">
                <div className="counter-two__icon">
                  <span className="icon-trophy"></span>
                </div>
                <div className="counter-two__content">
                  <div className="counter-two__count-box">
                    <h3 className="odometer" data-count="120">00</h3>
                    <span>&nbsp;</span>
                  </div>
                  <p className="counter-two__text">Award Winning</p>
                </div>
              </div>
            </div>
            {/* Counter Two Single */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="200ms">
              <div className="counter-two__single">
                <div className="counter-two__icon">
                  <span className="icon-costumer"></span>
                </div>
                <div className="counter-two__content">
                  <div className="counter-two__count-box">
                    <h3 className="odometer" data-count="99">00</h3>
                    <span>%</span>
                  </div>
                  <p className="counter-two__text">Satisfied Client</p>
                </div>
              </div>
            </div>
            {/* Counter Two Single */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="300ms">
              <div className="counter-two__single">
                <div className="counter-two__icon">
                  <span className="icon-rating"></span>
                </div>
                <div className="counter-two__content">
                  <div className="counter-two__count-box">
                    <h3 className="odometer" data-count="10">00</h3>
                    <span>M</span>
                  </div>
                  <p className="counter-two__text">Worldwide Reviews</p>
                </div>
              </div>
            </div>
            {/* Counter Two Single */}
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="400ms">
              <div className="counter-two__single">
                <div className="counter-two__icon">
                  <span className="icon-customer"></span>
                </div>
                <div className="counter-two__content">
                  <div className="counter-two__count-box">
                    <h3 className="odometer" data-count="200">00</h3>
                    <span>&nbsp;</span>
                  </div>
                  <p className="counter-two__text">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Counter Two End */}

      {/* Why Choose One Start */}
      <section className="why-choose-one">
        <div className="why-choose-one__bg-shape-1" style={{ backgroundImage: 'url(/assets/images/shapes/why-choose-one-bg-shape-1.png)' }}></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="why-choose-one__left">
                <div className="section-title text-left sec-title-animation animation-style2">
                  <div className="section-title__tagline-box">
                    <span className="section-title__tagline">WHY CHOOSE US</span>
                  </div>
                  <h2 className="section-title__title title-animation">
                    Elevate Growth With Our IT Solutions <span>For Success.</span>
                  </h2>
                </div>
                <p className="why-choose-one__text">
                  Innovating and empowering businesses with tailored solutions for success<br /> and growth. Innovating and empowering
                </p>
                <div className="why-choose-one__progress-box">
                  <ul className="why-choose-one__progress-list list-unstyled">
                    <li>
                      <div className="why-choose-one__progress">
                        <h4 className="why-choose-one__progress-title">Business Grow</h4>
                        <div className="bar">
                          <div className="bar-inner count-bar" data-percent="90%">
                            <div className="count-text">90%</div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="why-choose-one__progress">
                        <h4 className="why-choose-one__progress-title">Quality Products</h4>
                        <div className="bar">
                          <div className="bar-inner count-bar" data-percent="85%">
                            <div className="count-text">85%</div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="why-choose-one__progress">
                        <h4 className="why-choose-one__progress-title">Innovation Design</h4>
                        <div className="bar">
                          <div className="bar-inner count-bar" data-percent="96%">
                            <div className="count-text">96%</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="why-choose-one__btn-and-call-box">
                  <div className="why-choose-one__btn-box">
                    <Link href="/about" className="thm-btn">
                      Learn More
                      <span className="fas fa-arrow-right"></span>
                    </Link>
                  </div>
                  <div className="why-choose-one__call-box">
                    <div className="why-choose-one__call-icon">
                      <span className="icon-call"></span>
                    </div>
                    <div className="why-choose-one__call-content">
                      <p>Call Us Any Time</p>
                      <h5><Link href="tel:0882466422710"> 088 (246) 642-27-10</Link></h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="why-choose-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                <div className="why-choose-one__img-box">
                  <div className="why-choose-one__img">
                    <img src="/assets/images/resources/why-choose-one-img-1.jpg" alt="" />
                  </div>
                  <div className="why-choose-one__img-2">
                    <img src="/assets/images/resources/why-choose-one-img-2.jpg" alt="" />
                  </div>
                  <div className="why-choose-one__shape-1 rotate-me"></div>
                  <div className="why-choose-one__cstomer-services">
                    <div className="why-choose-one__cstomer-services-bg float-bob-x" style={{ backgroundImage: 'url(/assets/images/shapes/why-choose-one-cstomer-services-bg-shape.png)' }}></div>
                    <h4>24/7 Customer Service</h4>
                  </div>
                  <div className="why-choose-one__client-active">
                    <div className="why-choose-one__client-count-box">
                      <h3 className="odometer" data-count="13">00</h3>
                      <span>K</span>
                      <span> </span>
                    </div>
                    <p className="why-choose-one__client-text">Active Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
