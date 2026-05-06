import PageWrapper from "@/components/PageWrapper";
import { prisma } from "@/lib/prisma";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch services once at layout level — shared across all navigations
  const services = await prisma.service.findMany({
    where: { status: 'published' },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, title: true, slug: true },
  });

  return <PageWrapper services={services}>{children}</PageWrapper>;
}
