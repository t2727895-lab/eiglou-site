import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import ReviewForm from "@/components/admin/ReviewForm";

export default async function CreateReviewPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Review</h2>
          <p className="text-gray-500 mt-1">Add a client testimonial to your portfolio</p>
        </div>
        <ReviewForm mode="create" />
      </div>
    </AdminLayout>
  );
}
