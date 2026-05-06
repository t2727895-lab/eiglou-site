"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesClient({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const [messages, setMessages]   = useState<Message[]>(initialMessages);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState<"all" | "unread" | "read">("all");
  const [expanded, setExpanded]   = useState<number | null>(null);

  const filtered = messages.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.subject ?? "").toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "unread" && !m.isRead) ||
      (filter === "read"   &&  m.isRead);
    return matchSearch && matchFilter;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const markRead = async (id: number, isRead: boolean) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ isRead }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead } : m))
        );
      }
    } catch {
      toast.error("Failed to update message");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    const toastId = toast.loading("Deleting…");
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (expanded === id) setExpanded(null);
        toast.success("Message deleted", { id: toastId });
      } else {
        toast.error("Failed to delete", { id: toastId });
      }
    } catch {
      toast.error("Network error", { id: toastId });
    }
  };

  const handleExpand = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
    // Auto-mark as read when opened
    const msg = messages.find((m) => m.id === id);
    if (msg && !msg.isRead) markRead(id, true);
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No messages yet</h3>
        <p className="text-gray-400 text-sm">Contact form submissions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Total",  value: messages.length, color: "bg-gray-50 border-gray-200 text-gray-700" },
          { label: "Unread", value: unreadCount,      color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
          { label: "Read",   value: messages.length - unreadCount, color: "bg-green-50 border-green-200 text-green-700" },
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
            placeholder="Search by name, email, subject or message…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {/* Status filter */}
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-colors border ${
                filter === f
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Message list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-gray-200 text-gray-400 text-sm">
            No messages match your filter.
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl border transition-shadow ${
                !msg.isRead
                  ? "border-indigo-200 shadow-sm shadow-indigo-50"
                  : "border-gray-200"
              }`}
            >
              {/* Header row — always visible */}
              <div
                className="flex items-start gap-3 p-4 cursor-pointer"
                onClick={() => handleExpand(msg.id)}
              >
                {/* Unread dot */}
                <div className="flex-shrink-0 mt-1">
                  {!msg.isRead ? (
                    <span className="block w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  ) : (
                    <span className="block w-2.5 h-2.5 rounded-full bg-gray-200"></span>
                  )}
                </div>

                {/* Avatar initial */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                  {msg.name.charAt(0).toUpperCase()}
                </div>

                {/* Content preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-semibold ${!msg.isRead ? "text-gray-900" : "text-gray-600"}`}>
                      {msg.name}
                    </span>
                    {!msg.isRead && (
                      <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                  {msg.subject && (
                    <p className="text-xs text-gray-700 font-medium mt-0.5 truncate">{msg.subject}</p>
                  )}
                  <p className="text-xs text-gray-400 truncate mt-0.5">{msg.message}</p>
                </div>

                {/* Date + chevron */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </p>
                  <svg
                    className={`w-4 h-4 text-gray-400 mt-1 ml-auto transition-transform ${expanded === msg.id ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === msg.id && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-3">
                  {/* Full details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Name</p>
                      <p className="text-gray-800">{msg.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
                      <a href={`mailto:${msg.email}`} className="text-indigo-600 hover:underline">{msg.email}</a>
                    </div>
                    {msg.phone && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Phone</p>
                        <a href={`tel:${msg.phone}`} className="text-indigo-600 hover:underline">{msg.phone}</a>
                      </div>
                    )}
                    {msg.subject && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Subject</p>
                        <p className="text-gray-800">{msg.subject}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Received</p>
                      <p className="text-gray-800">
                        {new Date(msg.createdAt).toLocaleString("en-US", {
                          dateStyle: "medium", timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Full message */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Message</p>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-3 border border-gray-100">
                      {msg.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Your enquiry")}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Reply via Email
                    </a>
                    <button
                      onClick={() => markRead(msg.id, !msg.isRead)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                    >
                      {msg.isRead ? "Mark as Unread" : "Mark as Read"}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold rounded-lg transition-colors ml-auto"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
