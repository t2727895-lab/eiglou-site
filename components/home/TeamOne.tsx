import Image from 'next/image';
import Link from 'next/link';

const team = [
  {
    image: '/assets/images/team/team-1-1.jpg',
    name: 'Aleesha Brown',
    role: 'CEO & Founder',
  },
  {
    image: '/assets/images/team/team-1-2.jpg',
    name: 'Kevin Martin',
    role: 'Web Developer',
  },
  {
    image: '/assets/images/team/team-1-3.jpg',
    name: 'Sarah Albert',
    role: 'UI/UX Designer',
  },
  {
    image: '/assets/images/team/team-1-4.jpg',
    name: 'Mike Hardson',
    role: 'Marketing Manager',
  },
];

const wowDelays = ['100ms', '200ms', '300ms', '400ms'];

export default function TeamOne() {
  return (
    <section className="team-one">
      <div className="team-one__shape-1 rotate-me">
        <Image
          src="/assets/images/shapes/team-one-shape-1.png"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Our Team</span>
          </div>
          <h2 className="section-title__title title-animation">
            Meet Our Expert <span>Team Members</span>
          </h2>
        </div>
        <div className="row">
          {team.map((member) => (
            <div
              className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={wowDelays[team.indexOf(member)]}
              key={member.name}
            >
              <div className="team-one__single">
                <div className="team-one__img-box">
                  <div className="team-one__img">
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      width={370}
                      height={400}
                    />
                  </div>
                  <div className="team-one__share-btn">
                    <a href="#"><span className="fas fa-share-alt"></span></a>
                  </div>
                  <ul className="team-one__social list-unstyled">
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                  </ul>
                </div>
                <div className="team-one__content">
                  <h3 className="team-one__title">
                    <Link href="/team-details">{member.name}</Link>
                  </h3>
                  <p className="team-one__sub-title">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
