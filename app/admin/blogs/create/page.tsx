import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import BlogForm from "@/components/admin/BlogForm";

export default async function CreateBlogPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Blog</h2>
          <p className="text-gray-500 mt-1">Write and publish a new blog post</p>
        </div>
        <BlogForm mode="create" />
      </div>
    </AdminLayout>
  );
}
