"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  tagline: string | null;
  description: string;
  image: string | null;
  status: string;
  createdAt: string;
  faqs: Faq[];
}

interface ServiceCardProps {
  service: Service;
  onDelete: (id: number) => void;
}

export default function ServiceCard({ service, onDelete }: ServiceCardProps) {
  const handleDelete = async () => {
    if (!confirm(`Delete "${service.title}"? This cannot be undone.`)) return;
    const toastId = toast.loading("Deleting service...");
    try {
      const res = await fetch(`/api/services/${service.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Service deleted", { id: toastId });
        onDelete(service.id);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // Strip HTML for preview
  const preview = service.tagline
    ? service.tagline
    : service.description.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

  const formattedDate = new Date(service.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const isPublished = service.status === "published";

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">

      {/* Featured image */}
      {service.image ? (
        <div className="relative h-44 bg-gray-100 flex-shrink-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full
            ${isPublished ? "bg-green-500 text-white" : "bg-yellow-400 text-yellow-900"}`}>
            {service.status}
          </span>
        </div>
      ) : (
        <div className="px-5 pt-4">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full
            ${isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {service.status}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">

        {/* FAQ count badge */}
        {service.faqs.length > 0 && (
          <span className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">
            {service.faqs.length} FAQ{service.faqs.length !== 1 ? "s" : ""}
          </span>
        )}

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
          {service.title}
        </h3>

        {/* Tagline / preview */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">{preview}</p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </span>
          <span className="font-mono text-gray-300 text-xs truncate max-w-[120px]">
            /{service.slug}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/admin/services/${service.id}/edit`}
            className="flex-1 text-center px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
