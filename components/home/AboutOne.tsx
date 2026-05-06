import Image from 'next/image';
import Link from 'next/link';

export default function AboutOne() {
  return (
    <section className="about-one">
      <div className="about-one__shape-2 float-bob">
        <Image
          src="/assets/images/shapes/about-one-shape-2.png"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="about-one__shape-3 float-bob-y">
        <Image
          src="/assets/images/shapes/about-one-shape-3.png"
          alt=""
          width={100}
          height={100}
        />
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
                Innovating and empowering businesses with tailored solutions for success
                and growth. Empowering businesses to create meaningful innovation.
              </p>
              <ul className="about-one__points list-unstyled">
                <li>
                  <div className="icon">
                    <span className="icon-award"></span>
                  </div>
                  <div className="content">
                    <h4>Award-Winning Company.</h4>
                    <p>Partner with us to unlock new possibilities, drive progress, and shape
                      a future filled with success</p>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <span className="icon-certified"></span>
                  </div>
                  <div className="content">
                    <h4>Certified Company</h4>
                    <p>Partner with us to unlock new possibilities, drive progress, and shape
                      a future filled with success</p>
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
                        <Image
                          src="/assets/images/resources/about-one-client-img-1.jpg"
                          alt="Adam Smith, CEO of Itzone"
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>
                    <div className="about-one__client-details">
                      <h5>Adam Smith</h5>
                      <p>CEO, Itzone</p>
                    </div>
                  </div>
                  <div className="about-one__client-sign">
                    <Image
                      src="/assets/images/resources/about-one-client-sign.png"
                      alt="Adam Smith signature"
                      width={120}
                      height={50}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="about-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
              <div className="about-one__img-box">
                <div className="about-one__shape-1 float-bob-x">
                  <Image
                    src="/assets/images/shapes/about-one-shape-1.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div className="about-one__img">
                  <Image
                    src="/assets/images/resources/about-one-img-1.jpg"
                    alt="Our team working on IT solutions"
                    width={540}
                    height={400}
                  />
                </div>
                <div className="about-one__img-2">
                  <Image
                    src="/assets/images/resources/about-one-img-2.jpg"
                    alt="IT professionals collaborating"
                    width={260}
                    height={200}
                  />
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
                        <Image
                          src="/assets/images/resources/about-one-client-img-1-1.jpg"
                          alt="Satisfied client"
                          width={40}
                          height={40}
                        />
                      </div>
                    </li>
                    <li>
                      <div className="about-one__client-box-img">
                        <Image
                          src="/assets/images/resources/about-one-client-img-1-2.jpg"
                          alt="Satisfied client"
                          width={40}
                          height={40}
                        />
                      </div>
                    </li>
                    <li>
                      <div className="about-one__client-box-img">
                        <Image
                          src="/assets/images/resources/about-one-client-img-1-3.jpg"
                          alt="Satisfied client"
                          width={40}
                          height={40}
                        />
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
  );
}
