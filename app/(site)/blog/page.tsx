import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Newsletter from '@/components/Newsletter';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Blog & News || Itzone || Itzone Next.js Template',
  description: 'Latest blog posts and news from Itzone',
};

const PLACEHOLDER_IMG    = '/assets/images/blog/blog-1-1.jpg';
const PLACEHOLDER_AVATAR = '/assets/images/blog/blog-one-user-1.jpg';

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').trim();
}

export default async function BlogPage() {
  const posts = await prisma.blog.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      image: true,
      category: true,
      tags: true,
      createdAt: true,
      author: { select: { name: true, avatar: true } },
    },
  });

  return (
    <>
      <PageHeader
        title="Blog & News"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog & News' },
        ]}
      />

      {/* Blog List Start */}
      <section className="blog-list">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-xl-8 col-lg-7">
              <div className="blog-list__left">
                {posts.length === 0 ? (
                  <div style={{ padding: '40px 0', textAlign: 'center' }}>
                    <p>No blog posts yet. Check back soon!</p>
                  </div>
                ) : (
                  posts.map((post) => {
                    const tags = post.tags
                      ? post.tags.split(',').map((t: string) => t.trim()).filter((s: string) => s.length > 0)
                      : [post.category];
                    const excerpt =
                      post.excerpt ||
                      stripHtml(post.content).slice(0, 160).trimEnd() + '…';

                    return (
                      <div className="blog-list__single" key={post.id}>
                        <div className="blog-list__img">
                          <img src={post.image || PLACEHOLDER_IMG} alt={post.title} />
                          <div className="blog-list__tags">
                            {tags.slice(0, 2).map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="blog-list__content">
                          <div className="blog-list__user">
                            <div className="blog-list__user-img">
                              <img
                                src={post.author?.avatar || PLACEHOLDER_AVATAR}
                                alt={post.author?.name || 'Admin'}
                                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                              />
                            </div>
                            <p className="blog-list__user-title">
                              {post.author?.name || 'Admin'}
                            </p>
                          </div>
                          <ul className="blog-list__meta list-unstyled">
                            <li>
                              <Link href={`/blog/${post.slug}`}>
                                <span className="far fa-calendar-alt"></span>
                                {formatDate(post.createdAt)}
                              </Link>
                            </li>
                          </ul>
                          <h3 className="blog-list__title">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="blog-list__text">{excerpt}</p>
                          <div className="blog-list__btn-box">
                            <Link href={`/blog/${post.slug}`} className="thm-btn">
                              Read More <span className="fas fa-arrow-right"></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-5">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
      {/* Blog List End */}

      <Newsletter />
    </>
  );
}
