import Image from 'next/image';

const faqs = [
  {
    id: 'business-plan-length',
    question: 'How long should a business plan be?',
    answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.',
    active: false,
  },
  {
    id: 'need-business-plan',
    question: 'Do I need a business plan?',
    answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.',
    active: true,
  },
  {
    id: 'soft-launch',
    question: 'How to Soft Launch Your Business?',
    answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.',
    active: false,
  },
  {
    id: 'find-solution',
    question: 'How Can I Find My Solution?',
    answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.',
    active: false,
  },
];

export default function FaqOne() {
  return (
    <section className="faq-one">
      <div className="faq-one__shape-2 float-bob-y">
        <Image
          src="/assets/images/shapes/faq-one-shape-2.png"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="faq-one__shape-3 float-bob">
        <Image
          src="/assets/images/shapes/faq-one-shape-3.png"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="container">
        <div className="row">
          {/* Left */}
          <div className="col-xl-6">
            <div className="faq-one__left">
              <div className="section-title text-left sec-title-animation animation-style2">
                <div className="section-title__tagline-box">
                  <span className="section-title__tagline">Frequently Asked Questions</span>
                </div>
                <h2 className="section-title__title title-animation">
                  Have Questions in <span>Your Mind?</span> Get the Answers Now
                </h2>
              </div>
              <div className="accrodion-grp faq-one-accrodion" data-grp-name="faq-one-accrodion">
                {faqs.map((faq) => (
                  <div className={`accrodion${faq.active ? ' active' : ''}`} key={faq.id}>
                    <div className="accrodion-title">
                      <h4>{faq.question}</h4>
                    </div>
                    <div className="accrodion-content">
                      <div className="inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="col-xl-6">
            <div className="faq-one__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
              <div className="faq-one__img-box">
                <div className="faq-one__shape-1 float-bob-y">
                  <Image
                    src="/assets/images/shapes/faq-one-shape-1.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div className="faq-one__experience-box">
                  <div className="faq-one__experience-year">
                    <h2 className="odometer" data-count="55">00</h2>
                  </div>
                  <p className="faq-one__experience-text">Year of <br /> experience</p>
                </div>
                <div className="faq-one__img">
                  <Image
                    src="/assets/images/resources/faq-one-img-1.jpg"
                    alt="FAQ section illustration"
                    width={540}
                    height={400}
                  />
                </div>
                <div className="faq-one__img-2">
                  <Image
                    src="/assets/images/resources/faq-one-img-2.jpg"
                    alt="Team answering questions"
                    width={260}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
