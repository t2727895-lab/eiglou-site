"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
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
  "General", "Technology", "Design", "Backend", "Frontend",
  "DevOps", "Tutorial", "News", "Opinion", "Case Study",
];

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
}

interface BlogFormProps {
  mode: "create" | "edit";
  blog?: Blog;
}

export default function BlogForm({ mode, blog }: BlogFormProps) {
  const router = useRouter();
  const [title, setTitle]       = useState(blog?.title ?? "");
  const [excerpt, setExcerpt]   = useState(blog?.excerpt ?? "");
  const [content, setContent]   = useState(blog?.content ?? "");
  const [image, setImage]       = useState(blog?.image ?? "");
  const [category, setCategory] = useState(blog?.category ?? "General");
  const [tags, setTags]         = useState(blog?.tags ?? "");
  const [status, setStatus]     = useState<"published" | "draft">(
    (blog?.status as "published" | "draft") ?? "published"
  );
  const [loading, setLoading]           = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error("Title is required"); return; }
    const plainText = content.replace(/<[^>]+>/g, "").trim();
    if (!plainText) { toast.error("Content is required"); return; }

    setLoading(true);
    const toastId = toast.loading(mode === "create" ? "Publishing blog..." : "Saving changes...");

    try {
      const url    = mode === "create" ? "/api/blogs" : `/api/blogs/${blog!.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:    title.trim(),
          excerpt:  excerpt.trim() || null,
          content,
          image:    image.trim() || null,
          category: category || "General",
          tags:     tags.trim() || null,
          status,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          mode === "create" ? "Blog published!" : "Blog updated!",
          { id: toastId }
        );
        router.push("/admin/blogs");
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

      {/* ── Title + Status ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
            Blog Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a compelling title..."
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">{title.length} characters</p>
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1.5">
            Excerpt <span className="text-gray-400 font-normal">(short summary shown in listings)</span>
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A brief description of this post..."
            rows={2}
            maxLength={300}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">{excerpt.length}/300</p>
        </div>
      </div>

      {/* ── Rich Text Content ──────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content <span className="text-red-500">*</span>
        </label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write your blog content here..."
        />
      </div>

      {/* ── Meta: Category, Tags, Status ──────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Post Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
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
              placeholder="nextjs, react, typescript"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Status
            </label>
            <div className="flex gap-3 pt-1">
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
                  }`}>
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Image ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ImageUpload
          value={image}
          onChange={(url) => setImage(url)}
          label="Featured Image"
        />
      </div>

      {/* ── Actions ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          {/* Save as draft shortcut */}
          {status === "published" && (
            <button
              type="button"
              onClick={() => { setStatus("draft"); }}
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
                {mode === "create" ? "Publishing..." : "Saving..."}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={mode === "create" ? "M12 4v16m8-8H4" : "M5 13l4 4L19 7"} />
                </svg>
                {mode === "create"
                  ? status === "draft" ? "Save Draft" : "Publish Blog"
                  : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
