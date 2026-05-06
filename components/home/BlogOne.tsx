import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const PLACEHOLDER_IMG = '/assets/images/blog/blog-1-1.jpg';

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').trim();
}

function getExcerpt(blog: { excerpt: string | null; content: string }, maxLen = 120) {
  const text = blog.excerpt || stripHtml(blog.content);
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + '…' : text;
}

export default async function BlogOne() {
  const posts = await prisma.blog.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    take: 3,
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
      author: {
        select: { name: true, avatar: true },
      },
    },
  });

  if (posts.length === 0) return null;

  const [featured, ...sidePosts] = posts;

  const getTags = (tags: string | null): string[] =>
    tags ? tags.split(',').map((t: string) => t.trim()).filter((s: string) => s.length > 0).slice(0, 2) : [];

  return (
    <section className="blog-one">
      <div className="blog-one__shape-1"></div>
      <div className="blog-one__shape-2"></div>
      <div className="blog-one__shape-3 float-bob">
        <Image
          src="/assets/images/shapes/blog-one-shape-3.png"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="container">
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Our Blogs</span>
          </div>
          <h2 className="section-title__title title-animation">
            Latest News &amp; Articles From <br /> The <span>Blog Posts</span>
          </h2>
        </div>
        <div className="row">

          {/* ── Featured Post (left, large) ─────────────────────────── */}
          <div className="col-xl-6 wow fadeInLeft" data-wow-delay="100ms">
            <div className="blog-one__single">
              <div className="blog-one__img">
                <img
                  src={featured.image || PLACEHOLDER_IMG}
                  alt={featured.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="blog-one__tags">
                  {getTags(featured.tags).length > 0
                    ? getTags(featured.tags).map((tag) => <span key={tag}>{tag}</span>)
                    : <span>{featured.category}</span>
                  }
                </div>
              </div>
              <div className="blog-one__content">
                <div className="blog-one__user">
                  <div className="blog-one__user-img" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--itzone-base, #5b6fe6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-user" style={{ fontSize: 18, color: '#fff' }}></i>
                  </div>
                  <p className="blog-one__user-title">
                    {featured.author?.name || 'Admin'}
                  </p>
                </div>
                <ul className="blog-one__meta list-unstyled">
                  <li>
                    <Link href={`/blog/${featured.slug}`}>
                      <span className="far fa-calendar-alt"></span>
                      {formatDate(featured.createdAt)}
                    </Link>
                  </li>
                </ul>
                <h3 className="blog-one__title">
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h3>
                <p className="blog-one__text">{getExcerpt(featured)}</p>
                <div className="blog-one__btn-box">
                  <Link href={`/blog/${featured.slug}`} className="thm-btn">
                    Read More <span className="fas fa-arrow-right"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Side Posts (right, stacked) ─────────────────────────── */}
          <div className="col-xl-6">
            {sidePosts.map((post, i) => (
              <div
                key={post.id}
                className="blog-one__single-two wow fadeInUp"
                data-wow-delay={`${(i + 2) * 100}ms`}
              >
                <div className="blog-one__img-two">
                  <img
                    src={post.image || PLACEHOLDER_IMG}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="blog-one__tags-two">
                    {getTags(post.tags).length > 0
                      ? getTags(post.tags).map((tag) => <span key={tag}>{tag}</span>)
                      : <span>{post.category}</span>
                    }
                  </div>
                </div>
                <div className="blog-one__content-two">
                  <div className="blog-one__user-two">
                    <div className="blog-one__user-two-img" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--itzone-base, #5b6fe6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className="fas fa-user" style={{ fontSize: 18, color: '#fff' }}></i>
                    </div>
                    <p className="blog-one__user-two-title">
                      {post.author?.name || 'Admin'}
                    </p>
                  </div>
                  <ul className="blog-one__meta-two list-unstyled">
                    <li>
                      <Link href={`/blog/${post.slug}`}>
                        <span className="far fa-calendar-alt"></span>
                        {formatDate(post.createdAt)}
                      </Link>
                    </li>
                  </ul>
                  <h3 className="blog-one__title-two">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="blog-one__text-two">{getExcerpt(post, 100)}</p>
                  <div className="blog-one__btn-box-two">
                    <Link href={`/blog/${post.slug}`} className="thm-btn">
                      Read More <span className="fas fa-arrow-right"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


