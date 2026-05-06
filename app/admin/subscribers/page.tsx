import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import SubscribersClient from "./SubscribersClient";

export default async function SubscribersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { subscribedAt: "desc" },
  });

  const serialized = subscribers.map((s) => ({
    ...s,
    subscribedAt: s.subscribedAt.toISOString(),
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h2>
          <p className="text-gray-500 mt-1">
            {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <SubscribersClient initialSubscribers={serialized} />
      </div>
    </AdminLayout>
  );
}
