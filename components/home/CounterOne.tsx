export default function CounterOne() {
  const counters = [
    {
      icon: 'icon-complete',
      count: '1.9',
      suffix: 'K',
      text: 'Project Completed',
      delay: '100ms'
    },
    {
      icon: 'icon-costumer',
      count: '25',
      suffix: 'M',
      text: 'Happy Clients Review',
      delay: '200ms'
    },
    {
      icon: 'icon-customer',
      count: '350',
      suffix: '',
      text: 'Expert Team Members',
      delay: '300ms'
    },
    {
      icon: 'icon-trophy',
      count: '458',
      suffix: '',
      text: 'Creative Plus award',
      delay: '400ms'
    }
  ];

  return (
    <section className="counter-one">
      <div className="counter-one__bg-shape float-bob-y" style={{ backgroundImage: 'url(/assets/images/shapes/counter-one-bg-shape.png)' }}></div>
      <div className="container">
        <div className="row">
          {counters.map((counter, index) => (
            <div className={`col-xl-3 col-lg-6 col-md-6 wow ${index < 2 ? 'fadeInLeft' : 'fadeInRight'}`} data-wow-delay={counter.delay} key={index}>
              <div className="counter-one__single">
                <div className="counter-one__icon">
                  <span className={counter.icon}></span>
                </div>
                <div className="counter-one__content count-box">
                  <h3 className="counter-one__count">
                    <span className="count-text" data-stop={counter.count} data-speed="1500"></span>
                    {counter.suffix}
                  </h3>
                  <p className="counter-one__text">{counter.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="particles-js"></div>
    </section>
  );
}
