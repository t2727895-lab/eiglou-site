import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/reviews/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await prisma.review.findUnique({ where: { id: parseInt(id) } });
    if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ review });
  } catch (error) {
    console.error("Fetch review error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/reviews/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body   = await request.json();
    const { name, avatar, tagline, review, rating, status, featured } = body;

    if (!name?.trim())   return NextResponse.json({ error: "Client name is required" }, { status: 400 });
    if (!review?.trim()) return NextResponse.json({ error: "Review text is required" }, { status: 400 });

    const clampedRating = Math.min(5, Math.max(1, parseInt(rating) || 5));

    const updated = await prisma.review.update({
      where: { id: parseInt(id) },
      data: {
        name:     name.trim(),
        avatar:   avatar?.trim()   || null,
        tagline:  tagline?.trim()  || null,
        review:   review.trim(),
        rating:   clampedRating,
        status:   status === "draft" ? "draft" : "published",
        featured: featured === true,
      },
    });

    return NextResponse.json({ review: updated });
  } catch (error) {
    console.error("Update review error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/reviews/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.review.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Delete review error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
