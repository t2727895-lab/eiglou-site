import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function CreateProjectPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>
          <p className="text-gray-500 mt-1">Showcase a new portfolio project</p>
        </div>
        <ProjectForm mode="create" />
      </div>
    </AdminLayout>
  );
}
