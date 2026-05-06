"use client";

import { useState } from "react";
import ServiceCard from "@/components/admin/ServiceCard";

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
  updatedAt: string;
  faqs: Faq[];
}

export default function ServiceListClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices]       = useState<Service[]>(initialServices);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const filtered = services.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.tagline ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const published = services.filter((s) => s.status === "published").length;
  const drafts    = services.filter((s) => s.status === "draft").length;

  if (services.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No services yet</h3>
        <p className="text-gray-400 text-sm">Create your first service to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Quick stats */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "All",       value: services.length, key: "all",       color: "bg-gray-100 text-gray-700" },
          { label: "Published", value: published,        key: "published", color: "bg-green-100 text-green-700" },
          { label: "Drafts",    value: drafts,           key: "draft",     color: "bg-yellow-100 text-yellow-700" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setFilterStatus(s.key as typeof filterStatus)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
              ${filterStatus === s.key
                ? s.color + " ring-2 ring-offset-1 ring-indigo-400"
                : s.color + " opacity-70 hover:opacity-100"}`}
          >
            {s.label} ({s.value})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
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
          placeholder="Search by title or tagline..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Result count */}
      {(search || filterStatus !== "all") && (
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {services.length} services
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={(id) => setServices((prev) => prev.filter((s) => s.id !== id))}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No services match your filters.</p>
        </div>
      )}
    </div>
  );
}
