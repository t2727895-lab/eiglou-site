import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function CreateServicePage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Service</h2>
          <p className="text-gray-500 mt-1">Add a service you offer to your clients</p>
        </div>
        <ServiceForm mode="create" />
      </div>
    </AdminLayout>
  );
}
