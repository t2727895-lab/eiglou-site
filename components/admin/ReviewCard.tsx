"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

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
}

interface ReviewCardProps {
  review: Review;
  onDelete: (id: number) => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review, onDelete }: ReviewCardProps) {
  const handleDelete = async () => {
    if (!confirm(`Delete review from "${review.name}"? This cannot be undone.`)) return;
    const toastId = toast.loading("Deleting review...");
    try {
      const res = await fetch(`/api/reviews/${review.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Review deleted", { id: toastId });
        onDelete(review.id);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const isPublished = review.status === "published";
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex flex-col p-5">

      {/* Header: avatar + name + badges */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
          {review.avatar ? (
            <Image
              src={review.avatar}
              alt={review.name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <span className="text-indigo-600 font-bold text-lg">
              {review.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Name + tagline */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{review.name}</h3>
            {review.featured && (
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                ★ Featured
              </span>
            )}
          </div>
          {review.tagline && (
            <p className="text-xs text-gray-500 truncate mt-0.5">{review.tagline}</p>
          )}
        </div>

        {/* Status badge */}
        <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
          isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}>
          {review.status}
        </span>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-2 mb-3">
        <Stars rating={review.rating} />
        <span className="text-xs text-gray-400">{review.rating}/5</span>
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 flex-1 mb-4">
        &ldquo;{review.review}&rdquo;
      </p>

      {/* Date */}
      <p className="text-xs text-gray-400 mb-4">{formattedDate}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <Link
          href={`/admin/reviews/${review.id}/edit`}
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
  );
}
