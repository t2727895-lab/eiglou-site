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
    const existing = await prisma.project.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${counter++}`;
  }
}

// GET /api/projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status   = searchParams.get("status");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const projects = await prisma.project.findMany({
      where: {
        ...(status   ? { status }                    : {}),
        ...(category ? { category }                  : {}),
        ...(featured ? { featured: featured === "true" } : {}),
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/projects
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const {
      title, tagline, description, coverImage, images,
      category, tags, client, url, githubUrl,
      status, featured, completedAt,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!(description ?? "").replace(/<[^>]+>/g, "").trim()) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const slug = await uniqueSlug(generateSlug(title));

    const project = await prisma.project.create({
      data: {
        title:       title.trim(),
        slug,
        tagline:     tagline?.trim()     || null,
        description,
        coverImage:  coverImage?.trim()  || null,
        images:      images?.length ? JSON.stringify(images) : null,
        category:    category?.trim()    || "Web",
        tags:        tags?.trim()        || null,
        client:      client?.trim()      || null,
        url:         url?.trim()         || null,
        githubUrl:   githubUrl?.trim()   || null,
        status:      status === "draft"  ? "draft" : "published",
        featured:    featured === true,
        completedAt: completedAt ? new Date(completedAt) : null,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
