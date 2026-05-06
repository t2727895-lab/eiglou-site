"use client";

import { useState } from "react";
import ReviewCard from "@/components/admin/ReviewCard";

interface Review {
  id: number;
  name: string;
  avatar: string | null;
  tagline: string | null;
  review: string;
  rating: number;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ReviewListClient({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews]           = useState<Review[]>(initialReviews);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [filterRating, setFilterRating] = useState<number | "all">("all");

  const filtered = reviews.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        (r.tagline ?? "").toLowerCase().includes(search.toLowerCase()) ||
                        r.review.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const matchRating = filterRating === "all" || r.rating === filterRating;
    return matchSearch && matchStatus && matchRating;
  });

  const published = reviews.filter((r) => r.status === "published").length;
  const drafts    = reviews.filter((r) => r.status === "draft").length;
  const featured  = reviews.filter((r) => r.featured).length;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  if (reviews.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No reviews yet</h3>
        <p className="text-gray-400 text-sm">Add your first client review to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",     value: reviews.length, color: "bg-gray-50 border-gray-200 text-gray-700" },
          { label: "Published", value: published,       color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Featured",  value: featured,        color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
          { label: "Avg Rating",value: `★ ${avgRating}`,color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-lg border px-4 py-3 ${s.color}`}>
            <p className="text-xs font-medium opacity-70">{s.label}</p>
            <p className="text-xl font-bold mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
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
            placeholder="Search by name, title or review text..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Status filter */}
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-colors border ${
                filterStatus === s
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Star filter */}
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value === "all" ? "all" : parseInt(e.target.value))}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="all">All Stars</option>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{"★".repeat(n)} {n} star{n !== 1 ? "s" : ""}</option>
          ))}
        </select>
      </div>

      {/* Result count */}
      {(search || filterStatus !== "all" || filterRating !== "all") && (
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {reviews.length} reviews
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              onDelete={(id) => setReviews((prev) => prev.filter((x) => x.id !== id))}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No reviews match your filters.</p>
        </div>
      )}
    </div>
  );
}
