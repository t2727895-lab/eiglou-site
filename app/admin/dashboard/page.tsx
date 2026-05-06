import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [
    totalBlogs, publishedBlogs, draftBlogs, totalViews,
    totalProjects, publishedProjects,
    totalServices, publishedServices,
    totalReviews, publishedReviews,
    totalMessages, unreadMessages,
    totalSubscribers,
    recentBlogs,
    recentMessages,
  ] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { status: "published" } }),
    prisma.blog.count({ where: { status: "draft" } }),
    prisma.blog.aggregate({ _sum: { views: true } }),

    prisma.project.count(),
    prisma.project.count({ where: { status: "published" } }),

    prisma.service.count(),
    prisma.service.count({ where: { status: "published" } }),

    prisma.review.count(),
    prisma.review.count({ where: { status: "published" } }),

    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),

    prisma.subscriber.count(),

    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true, title: true, status: true, category: true,
        views: true, createdAt: true,
        author: { select: { name: true } },
      },
    }),

    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, subject: true, isRead: true, createdAt: true },
    }),
  ]);

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.name} 👋
          </h2>
          <p className="text-gray-500 mt-1">Here&apos;s a full overview of your site.</p>
        </div>

        {/* ── Top stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard title="Total Blogs"     value={totalBlogs}                  sub={`${publishedBlogs} published · ${draftBlogs} drafts`} color="indigo"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
            href="/admin/blogs"
          />
          <StatCard title="Blog Views"      value={totalViews._sum.views ?? 0}  sub="all time"                                             color="purple"
            icon={<><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>}
            href="/admin/blogs"
          />
          <StatCard title="Projects"        value={totalProjects}               sub={`${publishedProjects} published`}                     color="blue"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
            href="/admin/projects"
          />
          <StatCard title="Services"        value={totalServices}               sub={`${publishedServices} published`}                     color="teal"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
            href="/admin/services"
          />
          <StatCard title="Reviews"         value={totalReviews}                sub={`${publishedReviews} published`}                      color="yellow"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
            href="/admin/reviews"
          />
          <StatCard title="Messages"        value={totalMessages}               sub={unreadMessages > 0 ? `${unreadMessages} unread` : "all read"} color={unreadMessages > 0 ? "red" : "green"}
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
            href="/admin/messages"
          />
          <StatCard title="Subscribers"     value={totalSubscribers}            sub="newsletter"                                           color="pink"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />}
            href="/admin/subscribers"
          />
        </div>

        {/* ── Quick actions ── */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { href: "/admin/blogs/create",    label: "New Blog",    color: "bg-indigo-600 hover:bg-indigo-700",  icon: "M12 4v16m8-8H4" },
              { href: "/admin/projects/create", label: "New Project", color: "bg-blue-600 hover:bg-blue-700",     icon: "M12 4v16m8-8H4" },
              { href: "/admin/services/create", label: "New Service", color: "bg-teal-600 hover:bg-teal-700",     icon: "M12 4v16m8-8H4" },
              { href: "/admin/reviews/create",  label: "New Review",  color: "bg-yellow-500 hover:bg-yellow-600", icon: "M12 4v16m8-8H4" },
              { href: "/admin/messages",        label: "View Messages", color: unreadMessages > 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-800", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            ].map((a) => (
              <Link key={a.href} href={a.href}
                className={`flex items-center gap-2 px-4 py-3 ${a.color} text-white rounded-xl text-sm font-medium transition-colors`}>
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
                </svg>
                {a.label}
                {a.href === "/admin/messages" && unreadMessages > 0 && (
                  <span className="ml-auto bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadMessages}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Two column: recent messages + recent blogs ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Messages */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Messages</h3>
              <Link href="/admin/messages" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View all →
              </Link>
            </div>
            {recentMessages.length === 0 ? (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">No messages yet.</p>
            ) : (
              <ul className="divide-y divide-gray-50">
                {recentMessages.map((msg) => (
                  <li key={msg.id} className="px-6 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${msg.isRead ? "bg-gray-300" : "bg-red-500"}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800 truncate">{msg.name}</p>
                      <p className="text-xs text-gray-400 truncate">{msg.subject || msg.email}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Blogs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Blogs</h3>
              <Link href="/admin/blogs" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View all →
              </Link>
            </div>
            {recentBlogs.length === 0 ? (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">No blogs yet.</p>
            ) : (
              <ul className="divide-y divide-gray-50">
                {recentBlogs.map((blog) => (
                  <li key={blog.id} className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800 truncate">{blog.title}</p>
                      <p className="text-xs text-gray-400">{blog.category} · {blog.views.toLocaleString()} views</p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {blog.status}
                    </span>
                    <Link href={`/admin/blogs/${blog.id}/edit`}
                      className="shrink-0 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  title, value, sub, color, icon, href,
}: {
  title: string;
  value: number;
  sub?: string;
  color: "indigo" | "green" | "yellow" | "purple" | "blue" | "teal" | "red" | "pink";
  icon: React.ReactNode;
  href?: string;
}) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    green:  "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
    blue:   "bg-blue-50 text-blue-600",
    teal:   "bg-teal-50 text-teal-600",
    red:    "bg-red-50 text-red-600",
    pink:   "bg-pink-50 text-pink-600",
  };
  const card = (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
  return href ? <Link href={href}>{card}</Link> : card;
}
