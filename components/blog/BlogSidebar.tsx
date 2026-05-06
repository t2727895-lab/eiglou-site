import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const PLACEHOLDER_IMG = '/assets/images/blog/blog-1-1.jpg';

export default async function BlogSidebar() {
  // Recent posts + categories in parallel
  const [recentPosts, allPosts] = await Promise.all([
    prisma.blog.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: { id: true, title: true, slug: true, image: true, createdAt: true },
    }),
    prisma.blog.findMany({
      where: { status: 'published' },
      select: { category: true, tags: true },
    }),
  ]);

  // Build category counts
  const categoryCounts: Record<string, number> = {};
  for (const post of allPosts) {
    const cat = post.category || 'General';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }
  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  // Collect all unique tags
  const tagSet = new Set<string>();
  for (const post of allPosts) {
    if (post.tags) {
      post.tags.split(',').forEach((t) => {
        const trimmed = t.trim();
        if (trimmed) tagSet.add(trimmed);
      });
    }
  }
  const tags = Array.from(tagSet).slice(0, 12);

  return (
    <div className="sidebar">

      {/* Search */}
      <div className="sidebar__single sidebar__search wow fadeInUp" data-wow-delay=".1s">
        <form action="/blog" method="get" className="sidebar__search-form">
          <input type="search" name="q" placeholder="Search..." />
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="sidebar__single sidebar__category wow fadeInUp" data-wow-delay=".1s">
          <h3 className="sidebar__title">Categories</h3>
          <ul className="sidebar__category-list list-unstyled">
            {categories.map(([cat, count]) => (
              <li key={cat}>
                <Link href={`/blog?category=${encodeURIComponent(cat)}`}>
                  {cat} <span>({count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="sidebar__single sidebar__post wow fadeInUp" data-wow-delay=".1s">
          <h3 className="sidebar__title">Recent Posts</h3>
          <ul className="sidebar__post-list list-unstyled">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <div className="sidebar__post-image">
                  <img src={post.image || PLACEHOLDER_IMG} alt={post.title} />
                </div>
                <div className="sidebar__post-content">
                  <p className="sidebar__post-date">
                    <span className="icon-calendar"></span>
                    {post.createdAt.toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </p>
                  <h3 className="sidebar__post-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags Cloud */}
      {tags.length > 0 && (
        <div className="sidebar__single sidebar__tags wow fadeInUp" data-wow-delay=".1s">
          <h3 className="sidebar__title">Tags Cloud</h3>
          <ul className="sidebar__tags-list clearfix list-unstyled">
            {tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
