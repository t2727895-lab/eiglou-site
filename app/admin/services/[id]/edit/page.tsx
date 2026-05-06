import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id: parseInt(id) },
    include: { faqs: { orderBy: { order: "asc" } } },
  });
  if (!service) notFound();

  const serialized = {
    ...service,
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString(),
    faqs: service.faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      order: f.order,
    })),
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Service</h2>
          <p className="text-gray-500 mt-1">
            Slug: <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{service.slug}</code>
          </p>
        </div>
        <ServiceForm mode="edit" service={serialized} />
      </div>
    </AdminLayout>
  );
}
