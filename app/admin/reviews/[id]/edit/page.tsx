import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import ReviewForm from "@/components/admin/ReviewForm";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const review = await prisma.review.findUnique({ where: { id: parseInt(id) } });
  if (!review) notFound();

  const serialized = {
    ...review,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Review</h2>
          <p className="text-gray-500 mt-1">Update review from {review.name}</p>
        </div>
        <ReviewForm mode="edit" review={serialized} />
      </div>
    </AdminLayout>
  );
}
