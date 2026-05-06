import Image from 'next/image';
import Link from 'next/link';

export default function BannerOne() {
  return (
    <section className="banner-one">
      <div className="banner-one__shape-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800"></div>
      <div className="banner-one__shape-2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000"></div>
      <div className="banner-one__shape-3 img-bounce-two"></div>
      <div className="banner-one__shape-4 float-bob-x">
        <Image
          src="/assets/images/shapes/banner-one-shape-4.png"
          alt=""
          width={120}
          height={120}
        />
      </div>
      <div className="banner-one__shape-5 float-bob-y"></div>
      <div className="banner-one__shape-6 float-bob-y">
        <Image
          src="/assets/images/shapes/banner-one-shape-6.png"
          alt=""
          width={80}
          height={80}
          className="rotate-me"
        />
      </div>
      <div className="container">
        <div className="banner-one__inner">
          <div className="banner-one__img-box">
            <div className="banner-one__img" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000">
              <Image
                src="/assets/images/resources/banner-one-img-1-eiglou.png"
                alt="IT Solutions Banner"
                width={500}
                height={400}
                priority
              />
            </div>
            <div className="banner-one__img-shape-1"></div>
            <div className="banner-one__img-shape-2 float-bob"></div>
            <div className="banner-one__img-shape-3 float-bob-y"></div>
            <div className="banner-one__img-shape-4 float-bob-x"></div>
            <div className="banner-one__img-shape-5 float-bob-y">
              <Image
                src="/assets/images/shapes/banner-one-img-shape-5.png"
                alt=""
                width={80}
                height={80}
                className="rotate-me"
              />
            </div>
          </div>
          <div className="banner-one__content">
            <div className="banner-one__sub-title-box" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="0">
              <p className="banner-one__sub-title">Best IT Solution Service</p>
            </div>
            <h2 className="banner-one__title" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">
              Modern Your Business<br /> With <span>IT service.</span>
            </h2>
            <p className="banner-one__text" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
              IT solutions refer to a broad range of services and technologies designed to address<br /> specific business needs, streamline operations, and drive growth.
            </p>
            <div className="banner-one__btn-box" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
              <div className="banner-one__btn">
                <Link href="/about" className="thm-btn">
                  Discover More
                  <span className="fas fa-arrow-right"></span>
                </Link>
              </div>
              <div className="banner-one__btn">
                <Link href="/contact" className="thm-btn">
                  Let&apos;s Talk
                  <span className="fas fa-arrow-right"></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="banner-one__video-link">
            <a href="https://www.youtube.com/watch?v=rbFoRH2deeY" className="video-popup">
              <div className="banner-one__video-icon">
                <span className="fa fa-play"></span>
                <i className="ripple"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
