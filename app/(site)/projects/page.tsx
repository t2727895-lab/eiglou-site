import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Projects || Itzone || Itzone Next.js Template',
  description: 'View our successful projects and digital solutions.',
};

const PLACEHOLDER = '/assets/images/project/project-2-1.jpg';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: 'published' },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      title: true,
      slug: true,
      tagline: true,
      category: true,
      coverImage: true,
    },
  });

  return (
    <>
      <PageHeader
        title="Projects"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects' },
        ]}
      />

      {/* Project Page Start */}
      <section className="project-page">
        <div className="container">
          {projects.length === 0 ? (
            <div className="text-center" style={{ padding: '60px 0' }}>
              <p>No projects found. Add some from the admin panel.</p>
            </div>
          ) : (
            <div className="row">
              {projects.map((project, index) => {
                const image = project.coverImage || PLACEHOLDER;
                const delay = `${(index + 1) * 100}ms`;
                const href  = `/projects/${project.slug}`;
                return (
                  <div
                    key={project.id}
                    className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft"
                    data-wow-delay={delay}
                  >
                    <div className="project-two__single">
                      <div className="project-two__img-box">
                        <div className="project-two__img">
                          <img src={image} alt={project.title} />
                          <div className="project-two__arrow">
                            <Link href={href}>
                              <span className="fas fa-arrow-right"></span>
                            </Link>
                          </div>
                        </div>
                        <div className="project-two__content">
                          <h3 className="project-two__title">
                            <Link href={href}>{project.title}</Link>
                          </h3>
                          <p className="project-two__sub-title">
                            {project.tagline || project.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      {/* Project Page End */}

      <NewsletterTwo />
    </>
  );
}
