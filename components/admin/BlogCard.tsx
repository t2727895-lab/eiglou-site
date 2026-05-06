"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  category: string;
  tags: string | null;
  status: string;
  views: number;
  createdAt: string;
  author?: { name: string; avatar: string | null } | null;
}

interface BlogCardProps {
  blog: Blog;
  onDelete: (id: number) => void;
}

export default function BlogCard({ blog, onDelete }: BlogCardProps) {
  const handleDelete = async () => {
    if (!confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    const toastId = toast.loading("Deleting blog...");
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog deleted", { id: toastId });
        onDelete(blog.id);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // Use excerpt if available, otherwise strip HTML from content
  const preview = blog.excerpt
    ? blog.excerpt
    : blog.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

  const tagList = blog.tags
    ? blog.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const isPublished = blog.status === "published";

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">

      {/* Featured image */}
      {blog.image ? (
        <div className="relative h-44 bg-gray-100 flex-shrink-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          {/* Status badge over image */}
          <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full
            ${isPublished ? "bg-green-500 text-white" : "bg-yellow-400 text-yellow-900"}`}>
            {blog.status}
          </span>
        </div>
      ) : (
        /* No image — show status badge inline */
        <div className="px-5 pt-4">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full
            ${isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {blog.status}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">

        {/* Category */}
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">
          {blog.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
          {blog.title}
        </h3>

        {/* Excerpt / preview */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">{preview}</p>

        {/* Tags */}
        {tagList.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tagList.slice(0, 3).map((tag) => (
              <span key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
            {tagList.length > 3 && (
              <span className="text-xs text-gray-400">+{tagList.length - 3}</span>
            )}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-3">
            {/* Author */}
            {blog.author && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {blog.author.name}
              </span>
            )}
            {/* Date */}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </span>
          </div>
          {/* Views */}
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {blog.views.toLocaleString()} views
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/admin/blogs/${blog.id}/edit`}
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
