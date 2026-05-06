import Link from 'next/link';
import { prisma } from '@/lib/prisma';

// Fallback placeholder when a project has no cover image
const PLACEHOLDER = '/assets/images/project/project-1-1.jpg';

export default async function ProjectOne() {
  const projects = await prisma.project.findMany({
    where: { status: 'published' },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    take: 6, // show up to 6 in the home carousel
    select: {
      id: true,
      title: true,
      slug: true,
      tagline: true,
      category: true,
      coverImage: true,
    },
  });

  if (projects.length === 0) return null;

  return (
    <section className="project-one">
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Portfolio</span>
          </div>
          <h2 className="section-title__title title-animation">
            Explore Our Recent <span>Projects</span>
          </h2>
        </div>
        <div className="project-one__carousel-container">
          <div className="project-one__carousel owl-carousel owl-theme">
            <div className="item">
              <div className="project-one__single-box">
                <ul className="project-one__box list-unstyled">
                  {projects.map((project, index) => {
                    const image = project.coverImage || PLACEHOLDER;
                    const href  = `/projects/${project.slug}`;
                    return (
                      <li key={project.id} className={index === 1 ? 'active' : ''}>
                        <div className="project-one__box-content">
                          <div
                            className="single-project-one__bg"
                            style={{ backgroundImage: `url(${image})` }}
                          ></div>
                          <div className="project-one__title">
                            <h3>
                              <Link href={href}>{project.title}</Link>
                            </h3>
                          </div>
                          <div className="project-one__content-box">
                            <div className="project-one__icon">
                              <Link href={href}>
                                <span className="icon-right-arrow"></span>
                              </Link>
                            </div>
                            <div className="project-one__title-box">
                              <h3 className="project-one__title-2">
                                <Link href={href}>{project.title}</Link>
                              </h3>
                              <p className="project-one__text">
                                {project.tagline || project.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
