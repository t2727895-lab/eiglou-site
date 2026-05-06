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

const ICON_OPTIONS = [
  { value: "icon-social-media-marketing", label: "Social Media / Marketing" },
  { value: "icon-financial-risk",         label: "Financial Risk" },
  { value: "icon-ux-design",              label: "UX Design" },
  { value: "icon-promotion",              label: "Digital Marketing" },
  { value: "icon-implement",              label: "Cloud / Implementation" },
  { value: "icon-monitor",               label: "Monitor / Analytics" },
  { value: "icon-web-development",        label: "Web Development" },
  { value: "icon-mobile-app",             label: "Mobile App" },
  { value: "icon-cyber-security",         label: "Cyber Security" },
  { value: "icon-it-solution",            label: "IT Solution" },
  { value: "icon-software",              label: "Software" },
  { value: "icon-database",              label: "Database" },
  { value: "icon-network",               label: "Network" },
  { value: "icon-support",               label: "Support" },
  { value: "icon-settings",              label: "Settings" },
  { value: "icon-chart",                 label: "Chart / Data" },
  { value: "icon-shield",                label: "Shield / Security" },
  { value: "icon-code",                  label: "Code / Dev" },
  { value: "icon-cloud",                 label: "Cloud" },
  { value: "icon-ai",                    label: "AI / ML" },
];

interface Faq {
  id?: number;
  question: string;
  answer: string;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  tagline: string | null;
  description: string;
  icon: string | null;
  image: string | null;
  status: string;
  faqs: Faq[];
}

interface ServiceFormProps {
  mode: "create" | "edit";
  service?: Service;
}

export default function ServiceForm({ mode, service }: ServiceFormProps) {
  const router = useRouter();

  const [title, setTitle]             = useState(service?.title ?? "");
  const [tagline, setTagline]         = useState(service?.tagline ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [icon, setIcon]               = useState(service?.icon ?? "");
  const [image, setImage]             = useState(service?.image ?? "");
  const [status, setStatus]           = useState<"published" | "draft">(
    (service?.status as "published" | "draft") ?? "published"
  );
  const [faqs, setFaqs] = useState<Faq[]>(
    service?.faqs?.length ? service.faqs : [{ question: "", answer: "" }]
  );
  const [loading, setLoading] = useState(false);

  const addFaq = () => setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const removeFaq = (index: number) => setFaqs((prev) => prev.filter((_, i) => i !== index));
  const updateFaq = (index: number, field: "question" | "answer", value: string) =>
    setFaqs((prev) => prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error("Title is required"); return; }
    const plainText = description.replace(/<[^>]+>/g, "").trim();
    if (!plainText) { toast.error("Description is required"); return; }

    const validFaqs = faqs.filter((f) => f.question.trim() || f.answer.trim());
    const incompleteFaqs = validFaqs.filter((f) => !f.question.trim() || !f.answer.trim());
    if (incompleteFaqs.length > 0) {
      toast.error("Each FAQ must have both a question and an answer");
      return;
    }

    setLoading(true);
    const toastId = toast.loading(mode === "create" ? "Creating service..." : "Saving changes...");

    try {
      const url    = mode === "create" ? "/api/services" : `/api/services/${service!.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:       title.trim(),
          tagline:     tagline.trim() || null,
          description,
          icon:        icon.trim() || null,
          image:       image.trim() || null,
          status,
          faqs:        validFaqs,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(mode === "create" ? "Service created!" : "Service updated!", { id: toastId });
        router.push("/admin/services");
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
            Service Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Web Development"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">{title.length} characters</p>
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1.5">
            Tagline <span className="text-gray-400 font-normal">(short catchy line shown under the title)</span>
          </label>
          <input
            id="tagline"
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Building fast, modern web experiences"
            maxLength={200}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1">{tagline.length}/200</p>
        </div>
      </div>

      {/* ── Icon Picker ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Service Icon{" "}
          <span className="text-gray-400 font-normal">(shown on the homepage services section)</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
          {ICON_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setIcon(opt.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-center transition-all ${
                icon === opt.value
                  ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
              }`}
            >
              <span className={`${opt.value} text-2xl text-indigo-600`}></span>
              <span className="text-xs text-gray-600 leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Or enter a custom icon class
          </label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="e.g. icon-ux-design"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          {icon && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Preview:</span>
              <span className={`${icon} text-2xl text-indigo-600`}></span>
              <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{icon}</code>
            </div>
          )}
        </div>
      </div>

      {/* ── Featured Image ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ImageUpload value={image} onChange={(url) => setImage(url)} label="Featured Image" />
      </div>

      {/* ── Rich Text Description ──────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <RichTextEditor value={description} onChange={setDescription} placeholder="Describe this service in detail..." />
      </div>

      {/* ── FAQs ───────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">FAQs</h3>
            <p className="text-xs text-gray-400 mt-0.5">Add frequently asked questions about this service</p>
          </div>
          <button
            type="button"
            onClick={addFaq}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">FAQ #{index + 1}</span>
                {faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Question</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="e.g. How long does a typical project take?"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Answer</label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="Provide a clear, helpful answer..."
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No FAQs added yet.{" "}
            <button type="button" onClick={addFaq} className="text-indigo-600 hover:underline">Add one</button>
          </div>
        )}
      </div>

      {/* ── Status ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Visibility</h3>
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
              <span className={`text-sm font-medium capitalize ${s === "published" ? "text-green-700" : "text-yellow-700"}`}>
                {s}
              </span>
            </label>
          ))}
        </div>
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
                {mode === "create" ? (status === "draft" ? "Save Draft" : "Publish Service") : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
