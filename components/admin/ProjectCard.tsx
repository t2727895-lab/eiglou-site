"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

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
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const handleDelete = async () => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    const toastId = toast.loading("Deleting project...");
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted", { id: toastId });
        onDelete(project.id);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const tagList = project.tags
    ? project.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];

  const galleryCount = (() => {
    try { return project.images ? JSON.parse(project.images).length : 0; }
    catch { return 0; }
  })();

  const isPublished = project.status === "published";

  const completedYear = project.completedAt
    ? new Date(project.completedAt).getFullYear()
    : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">

      {/* Cover image */}
      {project.coverImage ? (
        <div className="relative h-44 bg-gray-100 flex-shrink-0">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPublished ? "bg-green-500 text-white" : "bg-yellow-400 text-yellow-900"
            }`}>
              {project.status}
            </span>
            {project.featured && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-600 text-white flex items-center gap-1">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            )}
          </div>
          {/* Gallery count */}
          {galleryCount > 0 && (
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
              +{galleryCount} photos
            </span>
          )}
        </div>
      ) : (
        <div className="px-5 pt-4 flex gap-1.5 flex-wrap">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}>
            {project.status}
          </span>
          {project.featured && (
            <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              ★ Featured
            </span>
          )}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">

        {/* Category + year */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
            {project.category}
          </span>
          {completedYear && (
            <span className="text-xs text-gray-400">{completedYear}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
          {project.title}
        </h3>

        {/* Tagline */}
        {project.tagline && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">{project.tagline}</p>
        )}

        {/* Client */}
        {project.client && (
          <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {project.client}
          </p>
        )}

        {/* Tags */}
        {tagList.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tagList.slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            {tagList.length > 4 && (
              <span className="text-xs text-gray-400">+{tagList.length - 4}</span>
            )}
          </div>
        )}

        {/* Links */}
        {(project.url || project.githubUrl) && (
          <div className="flex gap-2 mb-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-indigo-600 hover:underline"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gray-500 hover:underline"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-auto">
          <Link
            href={`/admin/projects/${project.id}/edit`}
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
