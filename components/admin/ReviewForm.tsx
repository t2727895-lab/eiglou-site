"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

interface Review {
  id: number;
  name: string;
  avatar: string | null;
  tagline: string | null;
  review: string;
  rating: number;
  status: string;
  featured: boolean;
}

interface ReviewFormProps {
  mode: "create" | "edit";
  review?: Review;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform hover:scale-110"
          title={`${star} star${star !== 1 ? "s" : ""}`}
        >
          <svg
            className={`w-8 h-8 transition-colors ${
              star <= (hovered || value) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
      <span className="ml-2 text-sm font-semibold text-gray-700">{value} / 5</span>
    </div>
  );
}

export default function ReviewForm({ mode, review }: ReviewFormProps) {
  const router = useRouter();

  const [name, setName]         = useState(review?.name ?? "");
  const [avatar, setAvatar]     = useState(review?.avatar ?? "");
  const [tagline, setTagline]   = useState(review?.tagline ?? "");
  const [text, setText]         = useState(review?.review ?? "");
  const [rating, setRating]     = useState(review?.rating ?? 5);
  const [status, setStatus]     = useState<"published" | "draft">(
    (review?.status as "published" | "draft") ?? "published"
  );
  const [featured, setFeatured] = useState(review?.featured ?? false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim())  { toast.error("Client name is required"); return; }
    if (!text.trim())  { toast.error("Review text is required"); return; }

    setLoading(true);
    const toastId = toast.loading(mode === "create" ? "Adding review..." : "Saving changes...");

    try {
      const url    = mode === "create" ? "/api/reviews" : `/api/reviews/${review!.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     name.trim(),
          avatar:   avatar || null,
          tagline:  tagline.trim() || null,
          review:   text.trim(),
          rating,
          status,
          featured,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(mode === "create" ? "Review added!" : "Review updated!", { id: toastId });
        router.push("/admin/reviews");
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

      {/* ── Avatar ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ImageUpload
          value={avatar}
          onChange={setAvatar}
          label="Client Avatar / Photo"
        />
      </div>

      {/* ── Client Info ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah Johnson"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1.5">
            Title / Company{" "}
            <span className="text-gray-400 font-normal">(shown under the name)</span>
          </label>
          <input
            id="tagline"
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. CEO at Acme Corp  or  Senior Designer"
            maxLength={150}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">{tagline.length}/150</p>
        </div>
      </div>

      {/* ── Star Rating ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Star Rating
        </label>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      {/* ── Review Text ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1.5">
          Review <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did the client say about your work?"
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">{text.length} characters</p>
      </div>

      {/* ── Visibility ──────────────────────────────────────────────────── */}
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
                {featured ? "Highlighted on site" : "Not featured"}
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
                {mode === "create" ? "Adding..." : "Saving..."}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={mode === "create" ? "M12 4v16m8-8H4" : "M5 13l4 4L19 7"} />
                </svg>
                {mode === "create" ? "Add Review" : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
