export default function ProcessOne() {
  const processes = [
    {
      icon: 'icon-complete',
      title: 'Choose a project',
      description: 'Start by selecting the service that fits your goals. We help you identify the right scope and set clear expectations from day one.',
      delay: '100ms'
    },
    {
      icon: 'icon-social-media-marketing',
      title: 'Project analysis',
      description: 'We dive deep into your requirements, audience, and market to build a solid strategy tailored to your unique needs.',
      delay: '200ms'
    },
    {
      icon: 'icon-execution',
      title: 'Plan Execute',
      description: 'Once the strategy is in place, we move to designing and developing your vision with precision and creativity.',
      delay: '300ms'
    },
    {
      icon: 'icon-complete',
      title: 'Deliver result',
      description: 'We launch your project, ensure everything runs smoothly, and provide ongoing support to keep you ahead of the curve.',
      delay: '400ms'
    }
  ];

  return (
    <section className="process-one">
      <div className="process-one__shape-1"></div>
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Working Process</span>
          </div>
          <h2 className="section-title__title title-animation">
            How To Work <span>It</span>
          </h2>
        </div>
        <div className="row">
          {processes.map((process, index) => (
            <div className={`col-xl-3 col-lg-6 col-md-6 wow ${index < 2 ? 'fadeInLeft' : 'fadeInRight'}`} data-wow-delay={process.delay} key={index}>
              <div className="process-one__single-inner">
                <div className="process-one__single">
                  <div className="process-one__icon">
                    <span className={process.icon}></span>
                  </div>
                  <h3 className="process-one__title">{process.title}</h3>
                  <p className="process-one__text">{process.description}</p>
                </div>
                <div className="process-one__count"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
