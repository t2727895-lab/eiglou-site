import { prisma } from '@/lib/prisma';

const FALLBACK_ITEMS = [
  'UI/UX Design',
  'Product Design',
  'Web Development',
  'Branding',
  'Cyber Security',
  'Digital Marketing',
];

export default async function SlidingTextOne() {
  let serviceNames: string[] = [];

  try {
    const services = await prisma.service.findMany({
      where: { status: 'published' },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      select: { title: true },
    });
    serviceNames = services.map((s) => s.title);
  } catch {
    // fall through to fallback
  }

  const items = serviceNames.length > 0 ? serviceNames : FALLBACK_ITEMS;

  return (
    <section className="sliding-text-one">
      <div className="sliding-text-one__wrap">
        <ul className="sliding-text-one__list list-unstyled marquee_mode-1">
          {items.map((item, index) => (
            <li key={index}>
              <h2 data-hover={item} className="sliding-text-one__title">{item}</h2>
              <span className="icon-star"></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
