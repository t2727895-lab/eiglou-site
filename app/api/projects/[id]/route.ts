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

async function uniqueSlug(base: string, excludeId: number): Promise<string> {
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

// GET /api/projects/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id: parseInt(id) } });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ project });
  } catch (error) {
    console.error("Fetch project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/projects/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const numId = parseInt(id);
    const body  = await request.json();
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

    const slug = await uniqueSlug(generateSlug(title), numId);

    const project = await prisma.project.update({
      where: { id: numId },
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

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.project.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
