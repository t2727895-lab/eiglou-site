import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// POST /api/admin/seed — run once to bootstrap the first admin + sample blogs
export async function POST() {
  try {
    // ── Admin ──────────────────────────────────────────────────────────────
    let admin = await prisma.admin.findUnique({
      where: { email: "admin@example.com" },
    });

    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 12);
      admin = await prisma.admin.create({
        data: {
          name: "Super Admin",
          email: "admin@example.com",
          password: hashedPassword,
          phone: "+1 555-000-0000",
          role: "superadmin",
          isActive: true,
        },
      });
      console.log("✅ Admin created");
    } else {
      console.log("ℹ️  Admin already exists");
    }

    // ── Sample blogs ───────────────────────────────────────────────────────
    const blogCount = await prisma.blog.count();
    if (blogCount === 0) {
      await prisma.blog.createMany({
        data: [
          {
            title: "Getting Started with Next.js 15",
            slug: "getting-started-with-nextjs-15",
            excerpt: "A practical guide to building modern web apps with Next.js 15 App Router, Server Components, and the latest features.",
            content: `<h2>Introduction</h2><p>Next.js 15 brings exciting improvements including faster builds with Turbopack, enhanced caching, and a more powerful App Router.</p><h2>Key Features</h2><ul><li>Turbopack for lightning-fast HMR</li><li>Improved Server Components</li><li>Enhanced caching strategies</li><li>Better TypeScript integration</li></ul><p>Start building amazing applications today!</p>`,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
            category: "Technology",
            tags: "nextjs,react,webdev",
            status: "published",
            views: 142,
            authorId: admin.id,
          },
          {
            title: "Mastering Tailwind CSS in 2025",
            slug: "mastering-tailwind-css-2025",
            excerpt: "Everything you need to know about Tailwind CSS v4 — from utility classes to custom themes and responsive design.",
            content: `<h2>Why Tailwind CSS?</h2><p>Tailwind CSS is a utility-first framework that lets you build modern designs directly in your markup without leaving your HTML.</p><h2>Benefits</h2><ul><li>No more naming CSS classes</li><li>Consistent design system out of the box</li><li>Highly customizable via config</li><li>Tiny production bundle with PurgeCSS</li></ul><blockquote>Tailwind makes you faster once you learn the utility names.</blockquote>`,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
            category: "Design",
            tags: "tailwindcss,css,frontend",
            status: "published",
            views: 89,
            authorId: admin.id,
          },
          {
            title: "Introduction to Prisma ORM",
            slug: "introduction-to-prisma-orm",
            excerpt: "Learn how Prisma makes database access type-safe, intuitive, and enjoyable with auto-generated queries.",
            content: `<h2>What is Prisma?</h2><p>Prisma is a next-generation ORM that makes database access easy with an auto-generated, type-safe query builder for Node.js and TypeScript.</p><blockquote>Prisma helps app developers build faster and make fewer errors.</blockquote><h2>Getting Started</h2><p>Define your schema, run migrations, and start querying with full type safety — no raw SQL required.</p>`,
            image: null,
            category: "Backend",
            tags: "prisma,database,orm,mysql",
            status: "draft",
            views: 0,
            authorId: admin.id,
          },
        ],
      });
      console.log("✅ Sample blogs created");
    } else {
      console.log("ℹ️  Blogs already exist");
    }

    return NextResponse.json(
      {
        message: "Database seeded successfully",
        credentials: { email: "admin@example.com", password: "admin123" },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
