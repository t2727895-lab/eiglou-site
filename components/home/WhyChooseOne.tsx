import Image from 'next/image';
import Link from 'next/link';

const progressItems = [
  { title: 'Business Grow', percent: '90%' },
  { title: 'Quality Products', percent: '85%' },
  { title: 'Innovation Design', percent: '96%' },
];

export default function WhyChooseOne() {
  return (
    <section className="why-choose-one">
      <div
        className="why-choose-one__bg-shape-1"
        style={{ backgroundImage: 'url(/assets/images/shapes/why-choose-one-bg-shape-1.png)' }}
      ></div>
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
                Innovating and empowering businesses with tailored solutions for success
                and growth. Innovating and empowering
              </p>
              <div className="why-choose-one__progress-box">
                <ul className="why-choose-one__progress-list list-unstyled">
                  {progressItems.map((item) => (
                    <li key={item.title}>
                      <div className="why-choose-one__progress">
                        <h4 className="why-choose-one__progress-title">{item.title}</h4>
                        <div className="bar">
                          <div className="bar-inner count-bar" data-percent={item.percent}>
                            <div className="count-text">{item.percent}</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
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
                    <h5><Link href="tel:0882466422710">088 (246) 642-27-10</Link></h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="why-choose-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
              <div className="why-choose-one__img-box">
                <div className="why-choose-one__img">
                  <Image
                    src="/assets/images/resources/why-choose-one-img-1.jpg"
                    alt="Our IT solutions team"
                    width={540}
                    height={400}
                  />
                </div>
                <div className="why-choose-one__img-2">
                  <Image
                    src="/assets/images/resources/why-choose-one-img-2.jpg"
                    alt="Technology infrastructure"
                    width={260}
                    height={200}
                  />
                </div>
                <div className="why-choose-one__shape-1 rotate-me"></div>
                <div className="why-choose-one__cstomer-services">
                  <div
                    className="why-choose-one__cstomer-services-bg float-bob-x"
                    style={{ backgroundImage: 'url(/assets/images/shapes/why-choose-one-cstomer-services-bg-shape.png)' }}
                  ></div>
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
  );
}
