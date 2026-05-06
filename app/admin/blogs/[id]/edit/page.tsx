import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import BlogForm from "@/components/admin/BlogForm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
  if (!blog) notFound();

  const serialized = {
    ...blog,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Blog</h2>
          <p className="text-gray-500 mt-1">
            Slug: <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{blog.slug}</code>
          </p>
        </div>
        <BlogForm mode="edit" blog={serialized} />
      </div>
    </AdminLayout>
  );
}
