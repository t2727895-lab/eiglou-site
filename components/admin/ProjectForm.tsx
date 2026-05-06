"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Image from "next/image";
import ImageUpload from "./ImageUpload";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg h-64 bg-gray-50 animate-pulse flex items-center justify-center">
      <span className="text-gray-400 text-sm">Loading editor...</span>
    </div>
  ),
});

const CATEGORIES = [
  "Web", "Mobile", "Design", "Branding", "E-Commerce",
  "SaaS", "Dashboard", "Landing Page", "API", "Other",
];

interface Project {
  id: number;
  title: string;
  slug: string;
  tagline: string | null;
  description: string;
  coverImage: string | null;
  images: string | null;       // JSON string of string[]
  category: string;
  tags: string | null;
  client: string | null;
  url: string | null;
  githubUrl: string | null;
  status: string;
  featured: boolean;
  completedAt: string | null;  // ISO string
}

interface ProjectFormProps {
  mode: "create" | "edit";
  project?: Project;
}

export default function ProjectForm({ mode, project }: ProjectFormProps) {
  const router = useRouter();

  // Parse existing gallery images from JSON
  const initialGallery: string[] = (() => {
    try { return project?.images ? JSON.parse(project.images) : []; }
    catch { return []; }
  })();

  const [title, setTitle]             = useState(project?.title ?? "");
  const [tagline, setTagline]         = useState(project?.tagline ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [coverImage, setCoverImage]   = useState(project?.coverImage ?? "");
  const [gallery, setGallery]         = useState<string[]>(initialGallery);
  const [category, setCategory]       = useState(project?.category ?? "Web");
  const [tags, setTags]               = useState(project?.tags ?? "");
  const [client, setClient]           = useState(project?.client ?? "");
  const [url, setUrl]                 = useState(project?.url ?? "");
  const [githubUrl, setGithubUrl]     = useState(project?.githubUrl ?? "");
  const [status, setStatus]           = useState<"published" | "draft">(
    (project?.status as "published" | "draft") ?? "published"
  );
  const [featured, setFeatured]       = useState(project?.featured ?? false);
  const [completedAt, setCompletedAt] = useState(
    project?.completedAt ? project.completedAt.slice(0, 10) : ""
  );
  const [loading, setLoading]         = useState(false);

  // Gallery upload state
  const galleryInputRef               = useRef<HTMLInputElement>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);

  // ── Gallery helpers ──────────────────────────────────────────────────────
  const uploadGalleryFile = async (file: File) => {
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      toast.error("Only JPEG, PNG, WebP or GIF images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB.");
      return;
    }
    setGalleryUploading(true);
    const toastId = toast.loading("Uploading gallery image...");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setGallery((prev) => [...prev, data.url]);
        toast.success("Image added to gallery!", { id: toastId });
      } else {
        toast.error(data.error || "Upload failed", { id: toastId });
      }
    } catch {
      toast.error("Network error during upload.", { id: toastId });
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((f) => uploadGalleryFile(f));
    e.target.value = "";
  };

  const removeGalleryImage = (index: number) =>
    setGallery((prev) => prev.filter((_, i) => i !== index));

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error("Title is required"); return; }
    if (!description.replace(/<[^>]+>/g, "").trim()) {
      toast.error("Description is required"); return;
    }

    setLoading(true);
    const toastId = toast.loading(mode === "create" ? "Creating project..." : "Saving changes...");

    try {
      const url_  = mode === "create" ? "/api/projects" : `/api/projects/${project!.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url_, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:       title.trim(),
          tagline:     tagline.trim()   || null,
          description,
          coverImage:  coverImage       || null,
          images:      gallery,
          category,
          tags:        tags.trim()      || null,
          client:      client.trim()    || null,
          url:         url.trim()       || null,
          githubUrl:   githubUrl.trim() || null,
          status,
          featured,
          completedAt: completedAt      || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(mode === "create" ? "Project created!" : "Project updated!", { id: toastId });
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(data.error || "Something went wrong", { id: toastId });
      }
    } catch {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Title + Tagline ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. E-Commerce Platform for FashionBrand"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">{title.length} characters</p>
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1.5">
            Tagline <span className="text-gray-400 font-normal">(short hook shown on portfolio cards)</span>
          </label>
          <input
            id="tagline"
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. A blazing-fast storefront built with Next.js & Stripe"
            maxLength={200}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">{tagline.length}/200</p>
        </div>
      </div>

      {/* ── Cover Image ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ImageUpload
          value={coverImage}
          onChange={setCoverImage}
          label="Cover Image"
        />
      </div>

      {/* ── Description ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <RichTextEditor
          value={description}
          onChange={setDescription}
          placeholder="Describe the project — goals, challenges, solutions, tech stack..."
        />
      </div>

      {/* ── Gallery ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Gallery</h3>
            <p className="text-xs text-gray-400 mt-0.5">Additional screenshots or mockups</p>
          </div>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            disabled={galleryUploading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            {galleryUploading ? (
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
            Add Images
          </button>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={handleGalleryFileChange}
          />
        </div>

        {gallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-video">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  title="Remove"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={() => !galleryUploading && galleryInputRef.current?.click()}
            className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors"
          >
            <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-400">Click to add gallery images</p>
          </div>
        )}
      </div>

      {/* ── Project Details ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Project Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Client */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1.5">
              Client / Company
            </label>
            <input
              id="client"
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1.5">
              Tags <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="nextjs, tailwind, stripe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Completed At */}
          <div>
            <label htmlFor="completedAt" className="block text-sm font-medium text-gray-700 mb-1.5">
              Completion Date
            </label>
            <input
              id="completedAt"
              type="date"
              value={completedAt}
              onChange={(e) => setCompletedAt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Live URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1.5">
              Live URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourproject.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/you/repo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── Visibility & Settings ────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Visibility & Settings</h3>
        <div className="flex flex-wrap gap-6">

          {/* Status */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Status</p>
            <div className="flex gap-4">
              {(["published", "draft"] as const).map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                    className="accent-indigo-600"
                  />
                  <span className={`text-sm font-medium capitalize ${
                    s === "published" ? "text-green-700" : "text-yellow-700"
                  }`}>{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Featured</p>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setFeatured((v) => !v)}
                className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                  featured ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  featured ? "translate-x-5" : "translate-x-0"
                }`} />
              </div>
              <span className="text-sm text-gray-600">
                {featured ? "Pinned to top" : "Not featured"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* ── Actions ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          {status === "published" && (
            <button
              type="button"
              onClick={() => setStatus("draft")}
              className="px-4 py-2.5 text-sm font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              Save as Draft
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {mode === "create" ? "Creating..." : "Saving..."}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={mode === "create" ? "M12 4v16m8-8H4" : "M5 13l4 4L19 7"} />
                </svg>
                {mode === "create"
                  ? status === "draft" ? "Save Draft" : "Publish Project"
                  : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
