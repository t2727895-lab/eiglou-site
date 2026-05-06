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
    const existing = await prisma.service.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${counter++}`;
  }
}

// GET /api/services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const services = await prisma.service.findMany({
      where: { ...(status ? { status } : {}) },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: { faqs: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error("Fetch services error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/services
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    const slug = await uniqueSlug(baseSlug);

    const service = await prisma.service.create({
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

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
