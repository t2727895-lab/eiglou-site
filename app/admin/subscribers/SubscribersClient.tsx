"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

export default function SubscribersClient({
  initialSubscribers,
}: {
  initialSubscribers: Subscriber[];
}) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [search, setSearch]           = useState("");
  const [copied, setCopied]           = useState(false);

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  // Copy all emails (comma-separated) to clipboard
  const copyAllEmails = async () => {
    const all = subscribers.map((s) => s.email).join(", ");
    try {
      await navigator.clipboard.writeText(all);
      setCopied(true);
      toast.success(`${subscribers.length} email${subscribers.length !== 1 ? "s" : ""} copied to clipboard!`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for browsers that block clipboard API
      const ta = document.createElement("textarea");
      ta.value = all;
      ta.style.position = "fixed";
      ta.style.opacity  = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      toast.success(`${subscribers.length} emails copied to clipboard!`);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Delete a single subscriber
  const handleDelete = async (id: number, email: string) => {
    if (!confirm(`Remove "${email}" from subscribers? This cannot be undone.`)) return;
    const toastId = toast.loading("Removing subscriber…");
    try {
      const res = await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
        toast.success("Subscriber removed", { id: toastId });
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to remove", { id: toastId });
      }
    } catch {
      toast.error("Network error", { id: toastId });
    }
  };

  if (subscribers.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No subscribers yet</h3>
        <p className="text-gray-400 text-sm">Emails will appear here once someone subscribes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Stats + actions row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

        {/* Stats */}
        <div className="flex gap-3">
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg px-4 py-3">
            <p className="text-xs font-medium opacity-70">Total</p>
            <p className="text-xl font-bold">{subscribers.length}</p>
          </div>
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3">
            <p className="text-xs font-medium opacity-70">Showing</p>
            <p className="text-xl font-bold">{filtered.length}</p>
          </div>
        </div>

        {/* Copy all button */}
        <button
          onClick={copyAllEmails}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
            copied
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy All Emails
            </>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
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
          placeholder="Search by email…"
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Copied emails preview box */}
      {copied && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 font-medium mb-1">Copied to clipboard:</p>
          <p className="text-xs text-gray-700 break-all leading-relaxed">
            {subscribers.map((s) => s.email).join(", ")}
          </p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left border-b border-gray-100">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Subscribed On</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-sm">
                    No subscribers match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((sub, index) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{sub.email}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(sub.id, sub.email)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
