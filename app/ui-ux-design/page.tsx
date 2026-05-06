'use client';

import PageHeader from '@/components/PageHeader';
import ServiceSidebar from '@/components/ServiceSidebar';
import Link from 'next/link';
import NewsletterTwo from '@/components/NewsletterTwo';

export default function UiUxDesign() {
  return (
    <>
      <PageHeader 
        title="UI/UX Design" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'UI/UX Design' }
        ]} 
      />

      {/* Service Details Start */}
      <section className="service-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5">
              <ServiceSidebar />
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="service-details__left">
                <div className="service-details__img">
                  <img src="/assets/images/services/service-details-img-1.jpg" alt="UI/UX Design" />
                </div>
                <h3 className="service-details__title-1">UI/UX Design</h3>
                <p className="service-details__text-1">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa.
                </p>
                <p className="service-details__text-2">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laborer et dolore magna aliqua. 
                  Out enigma ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute inure dolor in the reprehenderit in voluptate velit esse cillum dolore eu fugiat null pariatur. 
                  Excepteur snit occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <ul className="service-details__points-list list-unstyled">
                  <li>
                    <div className="icon">
                      <span className="icon-check"></span>
                    </div>
                    <p>It is a long established fact that a reader will be distracted by the readable content</p>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-check"></span>
                    </div>
                    <p>Distracted by the readable content of a page when looking at its layout</p>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-check"></span>
                    </div>
                    <p>Content of a page when looking at its layout to the point</p>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-check"></span>
                    </div>
                    <p>Reader will be distracted by the readable content of a page when looking</p>
                  </li>
                </ul>
                <div className="service-details__img-box">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="service-details__img-box-single">
                        <div className="service-details__img-box-img">
                          <img src="/assets/images/services/service-details-img-box-img-1.jpg" alt="" />
                        </div>
                        <div className="service-details__img-box-content">
                          <div className="service-details__img-box-content-icon-and-title">
                            <div className="service-details__img-box-content-icon">
                              <span className="icon-financial"></span>
                            </div>
                            <h3 className="service-details__img-box-content-title">Quality Full Work</h3>
                          </div>
                          <p className="service-details__img-box-content-text">
                            Duis acute arura dolor in reprehenderit in voluptate velit esse cillum dolore 
                            Velit esse quam nihil molestiae thos consequatur, Velia ease chillum dolore
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="service-details__img-box-single">
                        <div className="service-details__img-box-img">
                          <img src="/assets/images/services/service-details-img-box-img-2.jpg" alt="" />
                        </div>
                        <div className="service-details__img-box-content">
                          <div className="service-details__img-box-content-icon-and-title">
                            <div className="service-details__img-box-content-icon">
                              <span className="icon-certified"></span>
                            </div>
                            <h3 className="service-details__img-box-content-title">100% Work Satisfaction</h3>
                          </div>
                          <p className="service-details__img-box-content-text">
                            Duis acute arura dolor in reprehenderit in voluptate velit esse cillum dolore 
                            Velit esse quam nihil molestiae thos consequatur, Velia ease chillum dolore
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Service Details End */}

      <NewsletterTwo />
    </>
  );
}
