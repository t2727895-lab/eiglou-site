import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';

export const metadata = {
  title: 'Team Members || Itzone || Itzone Next.js Template',
  description: 'Meet our team of experts and professionals.',
};

export default function TeamPage() {
  const teamMembers = [
    { name: 'Alisha Martin', role: 'Cheif Expert', image: '/assets/images/team/team-2-1.jpg' },
    { name: 'Devid Coper', role: 'Product Designer', image: '/assets/images/team/team-2-2.jpg' },
    { name: 'Naila Dev', role: 'UI/UX Designer', image: '/assets/images/team/team-2-3.jpg' },
    { name: 'Robert Martin', role: 'CEO & Founder', image: '/assets/images/team/team-2-4.jpg' },
    { name: 'Kevin Martis', role: 'Chief Officer', image: '/assets/images/team/team-2-5.jpg' },
    { name: 'Anila Koper', role: 'Software Engineer', image: '/assets/images/team/team-2-6.jpg' },
    { name: 'Haris Rouf', role: 'Software Engineer', image: '/assets/images/team/team-2-7.jpg' },
    { name: 'Amil Karties', role: 'Software Engineer', image: '/assets/images/team/team-2-8.jpg' },
  ];

  return (
    <>
      <PageHeader 
        title="Team Members" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Team Members' }
        ]} 
      />

      {/* Team Page Start */}
      <section className="team-page">
        <div className="container">
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-xl-3 col-lg-6 col-md-6">
                <div className="team-two__single">
                  <div className="team-two__img-box">
                    <div className="team-two__img">
                      <img src={member.image} alt={member.name} />
                    </div>
                  </div>
                  <div className="team-two__content-inner">
                    <div className="team-two__content">
                      <h3 className="team-two__title">
                        <Link href="/team-details">{member.name}</Link>
                      </h3>
                      <p className="team-two__sub-title">{member.role}</p>
                    </div>
                    <div className="team-two__arrow-and-social">
                      <div className="team-two__arrow">
                        <span className="icon-share"></span>
                      </div>
                      <ul className="team-two__social list-unstyled">
                        <li><Link href="#"><span className="icon-facebook-app-symbol"></span></Link></li>
                        <li><Link href="#"><span className="icon-twitter-1"></span></Link></li>
                        <li><Link href="#"><span className="icon-pinterest"></span></Link></li>
                        <li><Link href="#"><span className="icon-linkedin"></span></Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Page End */}

      <NewsletterTwo />
    </>
  );
}
