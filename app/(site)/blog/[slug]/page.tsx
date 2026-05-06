import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Newsletter from '@/components/Newsletter';
import { prisma } from '@/lib/prisma';

const PLACEHOLDER_IMG    = '/assets/images/blog/blog-1-1.jpg';
const PLACEHOLDER_AVATAR = '/assets/images/blog/blog-one-user-1.jpg';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  });
  if (!post) return {};
  return {
    title: `${post.title} || Itzone Blog`,
    description: post.excerpt ?? `Read ${post.title} on our blog`,
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true, avatar: true } },
    },
  });

  if (!post || post.status !== 'published') notFound();

  const tags = post.tags
    ? post.tags.split(',').map((t: string) => t.trim()).filter((s: string): s is string => s.length > 0)
    : [];

  const formattedDate = post.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dateDay   = post.createdAt.getDate().toString().padStart(2, '0');
  const dateMonth = post.createdAt.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <>
      <PageHeader
        title="Blog Details"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Blog Details Start */}
      <section className="blog-details">
        <div className="container">
          <div className="row">

            {/* ── Main Content ──────────────────────────────────────── */}
            <div className="col-xl-8 col-lg-7">
              <div className="blog-details__left">

                {/* Featured Image */}
                <div className="blog-details__img">
                  <img src={post.image || PLACEHOLDER_IMG} alt={post.title} />
                  <div className="blog-details__date">
                    <p>{dateDay}<br />{dateMonth}</p>
                  </div>
                </div>

                <div className="blog-details__content">
                  {/* Author & Meta */}
                  <div className="blog-details__user-and-meta">
                    <div className="blog-details__user">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img
                          src={post.author?.avatar || PLACEHOLDER_AVATAR}
                          alt={post.author?.name || 'Admin'}
                          style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <p>
                          <span className="fas fa-user"></span> By {post.author?.name || 'Admin'}
                        </p>
                      </div>
                    </div>
                    <ul className="blog-details__meta list-unstyled">
                      <li>
                        <span>
                          <span className="far fa-calendar-alt"></span>{formattedDate}
                        </span>
                      </li>
                      <li>
                        <span>
                          <span className="fas fa-folder"></span>{post.category}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Title */}
                  <h3 className="blog-details__title">{post.title}</h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="blog-details__text-1">{post.excerpt}</p>
                  )}

                  {/* Rich-text content from editor */}
                  <div
                    className="blog-details__text-1"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags & Share */}
                  {tags.length > 0 && (
                    <div className="blog-details__tag-and-share">
                      <div className="blog-details__tag">
                        <h3 className="blog-details__tag-title">Tags :</h3>
                        <ul className="blog-details__tag-list list-unstyled">
                          {tags.map((tag) => (
                            <li key={tag}>
                              <Link href={`/blog?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="blog-details__share-box">
                        <h3 className="blog-details__share-title">Share :</h3>
                        <div className="blog-details__share">
                          <Link href="#"><span className="icon-facebook-app-symbol"></span></Link>
                          <Link href="#"><span className="icon-twitter-1"></span></Link>
                          <Link href="#"><span className="icon-linkedin"></span></Link>
                          <Link href="#"><span className="icon-pinterest"></span></Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comment Form */}
                  <div className="comment-form">
                    <h3 className="comment-form__title">Leave A Reply</h3>
                    <p className="comment-form__text">
                      Have thoughts on this post? We&apos;d love to hear from you.
                    </p>
                    <form className="comment-one__form contact-form-validated" action="#" method="post">
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="comment-form__input-box">
                            <input type="text" placeholder="Your Name" name="name" />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="comment-form__input-box">
                            <input type="email" placeholder="Your Email" name="email" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="comment-form__input-box text-message-box">
                            <textarea name="message" placeholder="Write your message"></textarea>
                          </div>
                          <div className="comment-form__btn-box">
                            <button type="submit" className="thm-btn comment-form__btn">
                              Submit Now <span className="fas fa-arrow-right"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>

            {/* ── Sidebar ───────────────────────────────────────────── */}
            <div className="col-xl-4 col-lg-5">
              <BlogSidebar />
            </div>

          </div>
        </div>
      </section>
      {/* Blog Details End */}

      <Newsletter />
    </>
  );
}
