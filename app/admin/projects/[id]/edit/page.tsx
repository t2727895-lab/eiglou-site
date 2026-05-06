import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: parseInt(id) } });
  if (!project) notFound();

  const serialized = {
    ...project,
    completedAt: project.completedAt ? project.completedAt.toISOString() : null,
    createdAt:   project.createdAt.toISOString(),
    updatedAt:   project.updatedAt.toISOString(),
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Project</h2>
          <p className="text-gray-500 mt-1">
            Slug: <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{project.slug}</code>
          </p>
        </div>
        <ProjectForm mode="edit" project={serialized} />
      </div>
    </AdminLayout>
  );
}
