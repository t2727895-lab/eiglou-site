import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

async function uniqueSlug(base: string, excludeId?: number): Promise<string> {
  let slug = base;
  let counter = 1;
  while (true) {
    const existing = await prisma.blog.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${counter++}`;
  }
}

// GET /api/blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    const blogs = await prisma.blog.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, email: true, avatar: true },
        },
      },
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/blogs
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, image, excerpt, category, tags, status } = body;

    if (!title?.trim() || !(content ?? "").replace(/<[^>]+>/g, "").trim()) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(title);
    const slug = await uniqueSlug(baseSlug);

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug,
        excerpt: excerpt?.trim() || null,
        content,
        image: image?.trim() || null,
        category: category?.trim() || "General",
        tags: tags?.trim() || null,
        status: status === "draft" ? "draft" : "published",
        authorId: session.id,
      },
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true } },
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
