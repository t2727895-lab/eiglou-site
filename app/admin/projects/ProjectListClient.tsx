"use client";

import { useState } from "react";
import ProjectCard from "@/components/admin/ProjectCard";

interface Project {
  id: number;
  title: string;
  slug: string;
  tagline: string | null;
  coverImage: string | null;
  images: string | null;
  category: string;
  tags: string | null;
  client: string | null;
  url: string | null;
  githubUrl: string | null;
  status: string;
  featured: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectListClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects]         = useState<Project[]>(initialProjects);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = projects.filter((p) => {
    const matchSearch   = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          (p.tagline ?? "").toLowerCase().includes(search.toLowerCase()) ||
                          (p.client ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus   = filterStatus === "all" || p.status === filterStatus;
    const matchCategory = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  const published = projects.filter((p) => p.status === "published").length;
  const drafts    = projects.filter((p) => p.status === "draft").length;
  const featured  = projects.filter((p) => p.featured).length;

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No projects yet</h3>
        <p className="text-gray-400 text-sm">Add your first portfolio project to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Quick stats */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "All",       value: projects.length, key: "all",       color: "bg-gray-100 text-gray-700" },
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
        {featured > 0 && (
          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-100 text-indigo-700">
            ★ {featured} featured
          </span>
        )}
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
            placeholder="Search by title, tagline or client..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
          ))}
        </select>
      </div>

      {/* Result count */}
      {(search || filterStatus !== "all" || filterCategory !== "all") && (
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {projects.length} projects
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={(id) => setProjects((prev) => prev.filter((p) => p.id !== id))}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No projects match your filters.</p>
        </div>
      )}
    </div>
  );
}
