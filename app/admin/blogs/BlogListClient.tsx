"use client";

import { useState } from "react";
import BlogCard from "@/components/admin/BlogCard";

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
  updatedAt: string;
  author?: { id: number; name: string; email: string; avatar: string | null } | null;
}

export default function BlogListClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const [blogs, setBlogs]     = useState<Blog[]>(initialBlogs);
  const [search, setSearch]   = useState("");
  const [filterStatus, setFilterStatus]     = useState<"all" | "published" | "draft">("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filtered = blogs.filter((b) => {
    const matchSearch   = b.title.toLowerCase().includes(search.toLowerCase()) ||
                          (b.excerpt ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus   = filterStatus === "all" || b.status === filterStatus;
    const matchCategory = filterCategory === "all" || b.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  const published = blogs.filter((b) => b.status === "published").length;
  const drafts    = blogs.filter((b) => b.status === "draft").length;

  if (blogs.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No blogs yet</h3>
        <p className="text-gray-400 text-sm">Create your first blog post to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Quick stats */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "All",       value: blogs.length,  key: "all",       color: "bg-gray-100 text-gray-700" },
          { label: "Published", value: published,      key: "published", color: "bg-green-100 text-green-700" },
          { label: "Drafts",    value: drafts,         key: "draft",     color: "bg-yellow-100 text-yellow-700" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setFilterStatus(s.key as typeof filterStatus)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
              ${filterStatus === s.key ? s.color + " ring-2 ring-offset-1 ring-indigo-400" : s.color + " opacity-70 hover:opacity-100"}`}
          >
            {s.label} ({s.value})
          </button>
        ))}
      </div>

      {/* Search + category filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or excerpt..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white capitalize"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
          ))}
        </select>
      </div>

      {/* Result count */}
      {(search || filterStatus !== "all" || filterCategory !== "all") && (
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {blogs.length} posts
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={(id) => setBlogs((prev) => prev.filter((b) => b.id !== id))}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No blogs match your filters.</p>
        </div>
      )}
    </div>
  );
}
