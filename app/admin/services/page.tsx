import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import ServiceListClient from "./ServiceListClient";

export default async function ServicesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const services = await prisma.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { faqs: { orderBy: { order: "asc" } } },
  });

  const serialized = services.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
    faqs: s.faqs.map((f) => ({
      ...f,
      createdAt: f.createdAt.toISOString(),
      updatedAt: f.updatedAt.toISOString(),
    })),
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Services</h2>
            <p className="text-gray-500 mt-1">
              {services.length} service{services.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Link
            href="/admin/services/create"
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Service
          </Link>
        </div>

        <ServiceListClient initialServices={serialized} />
      </div>
    </AdminLayout>
  );
}
