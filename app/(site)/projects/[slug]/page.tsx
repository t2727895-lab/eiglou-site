import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';
import { prisma } from '@/lib/prisma';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    select: { title: true, tagline: true },
  });
  if (!project) return {};
  return {
    title: `${project.title} || Portfolio || Itzone`,
    description: project.tagline ?? `Details about ${project.title}`,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  // Fetch the project
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project || project.status !== 'published') notFound();

  // Parse gallery images (stored as JSON string)
  let gallery: string[] = [];
  try {
    gallery = project.images ? JSON.parse(project.images) : [];
  } catch {
    gallery = [];
  }

  // Parse tags
  const tags = project.tags
    ? project.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];

  // Prev / Next navigation among published projects
  const allProjects = await prisma.project.findMany({
    where: { status: 'published' },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, title: true, slug: true },
  });
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject  = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject  = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // Format completion date
  const completedDate = project.completedAt
    ? new Date(project.completedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <>
      <PageHeader
        title={project.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
      />

      {/* Project Details Start */}
      <section className="project-details">
        <div className="container">
          <div className="row">

            {/* ── Left: Main Content ─────────────────────────────────── */}
            <div className="col-xl-8 col-lg-7">
              <div className="project-details__left">

                {/* Cover Image */}
                {project.coverImage && (
                  <div className="project-details__img">
                    <img src={project.coverImage} alt={project.title} />
                  </div>
                )}

                {/* Tagline */}
                {project.tagline && (
                  <p className="project-details__text-1" style={{ fontSize: 18, fontWeight: 500, marginBottom: 24 }}>
                    {project.tagline}
                  </p>
                )}

                {/* Description (rich HTML from editor) */}
                <h3 className="project-details__title-1">About The Project</h3>
                <div
                  className="project-details__text-1"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />

                {/* Gallery */}
                {gallery.length > 0 && (
                  <>
                    <h3 className="project-details__title-2" style={{ marginTop: 40 }}>
                      Project Gallery
                    </h3>
                    <div className="row" style={{ marginTop: 20 }}>
                      {gallery.map((img, i) => (
                        <div key={i} className="col-xl-6 col-lg-6 col-md-6" style={{ marginBottom: 24 }}>
                          <div className="project-details__img">
                            <img
                              src={img}
                              alt={`${project.title} — gallery image ${i + 1}`}
                              style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: 'inline-block',
                          padding: '4px 14px',
                          borderRadius: 20,
                          background: 'var(--itzone-base, #0d6efd)',
                          color: '#fff',
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Sidebar ─────────────────────────────────────── */}
            <div className="col-xl-4 col-lg-5">
              <div className="project-details__sidebar">

                {/* Project Information */}
                <div className="project-details__information">
                  <h3 className="project-details__information-title">Project Information</h3>
                  <ul className="project-details__information-list list-unstyled">
                    {project.client && (
                      <li>
                        <h4>Client :</h4>
                        <p>{project.client}</p>
                      </li>
                    )}
                    <li>
                      <h4>Category :</h4>
                      <p>{project.category}</p>
                    </li>
                    {completedDate && (
                      <li>
                        <h4>Completed :</h4>
                        <p>{completedDate}</p>
                      </li>
                    )}
                    {project.url && (
                      <li>
                        <h4>Live URL :</h4>
                        <p>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--itzone-base)', wordBreak: 'break-all' }}
                          >
                            {project.url.replace(/^https?:\/\//, '')}
                          </a>
                        </p>
                      </li>
                    )}
                    {project.githubUrl && (
                      <li>
                        <h4>GitHub :</h4>
                        <p>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--itzone-base)', wordBreak: 'break-all' }}
                          >
                            View Repository
                          </a>
                        </p>
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Box */}
                <div className="service-details__get-started">
                  <h3 className="service-details__get-started-title">Start a Project</h3>
                  <p className="service-details__get-started-text">
                    Have a similar project in mind? Let&apos;s talk about how we can help you.
                  </p>
                  <div className="service-details__get-started-btn-box" style={{ marginTop: 20 }}>
                    <Link href="/contact" className="thm-btn">
                      Get In Touch <span className="fas fa-arrow-right"></span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── Prev / Next Navigation ──────────────────────────────── */}
          {(prevProject || nextProject) && (
            <div className="row">
              <div className="col-xl-12">
                <div className="project-details__previous-next">
                  <ul className="list-unstyled">
                    {prevProject ? (
                      <li>
                        <div className="icon">
                          <Link href={`/projects/${prevProject.slug}`}>
                            <span className="icon-right-arrow"></span>
                          </Link>
                        </div>
                        <div className="text-box">
                          <Link href={`/projects/${prevProject.slug}`}>
                            Previous: {prevProject.title}
                          </Link>
                        </div>
                      </li>
                    ) : <li></li>}
                    {nextProject && (
                      <li>
                        <div className="text-box">
                          <Link href={`/projects/${nextProject.slug}`}>
                            Next: {nextProject.title}
                          </Link>
                        </div>
                        <div className="icon">
                          <Link href={`/projects/${nextProject.slug}`}>
                            <span className="icon-right-arrow"></span>
                          </Link>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
      {/* Project Details End */}

      <NewsletterTwo />
    </>
  );
}
