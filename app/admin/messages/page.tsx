import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import MessagesClient from "./MessagesClient";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
            <p className="text-gray-500 mt-1">
              {messages.length} message{messages.length !== 1 ? "s" : ""} ·{" "}
              <span className="text-indigo-600 font-medium">
                {messages.filter((m) => !m.isRead).length} unread
              </span>
            </p>
          </div>
        </div>
        <MessagesClient initialMessages={serialized} />
      </div>
    </AdminLayout>
  );
}
