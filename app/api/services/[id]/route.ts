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
    const existing = await prisma.service.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${counter++}`;
  }
}

// GET /api/services/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) },
      include: { faqs: { orderBy: { order: "asc" } } },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.error("Fetch service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/services/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const numId = parseInt(id);
    const body = await request.json();
    const { title, tagline, description, icon, image, status, faqs } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const plainText = (description ?? "").replace(/<[^>]+>/g, "").trim();
    if (!plainText) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const baseSlug = generateSlug(title);
    const slug = await uniqueSlug(baseSlug, numId);

    // Replace all FAQs: delete existing, create new ones
    await prisma.serviceFaq.deleteMany({ where: { serviceId: numId } });

    const service = await prisma.service.update({
      where: { id: numId },
      data: {
        title: title.trim(),
        slug,
        tagline: tagline?.trim() || null,
        description,
        icon: icon?.trim() || null,
        image: image?.trim() || null,
        status: status === "draft" ? "draft" : "published",
        faqs: {
          create: (faqs ?? [])
            .filter((f: { question: string; answer: string }) => f.question?.trim() && f.answer?.trim())
            .map((f: { question: string; answer: string }, i: number) => ({
              question: f.question.trim(),
              answer: f.answer.trim(),
              order: i,
            })),
        },
      },
      include: { faqs: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/services/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.service.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
