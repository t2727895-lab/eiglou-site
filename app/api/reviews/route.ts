import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status   = searchParams.get("status");
    const featured = searchParams.get("featured");

    const reviews = await prisma.review.findMany({
      where: {
        ...(status   ? { status }                        : {}),
        ...(featured ? { featured: featured === "true" } : {}),
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/reviews
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, avatar, tagline, review, rating, status, featured } = body;

    if (!name?.trim())   return NextResponse.json({ error: "Client name is required" }, { status: 400 });
    if (!review?.trim()) return NextResponse.json({ error: "Review text is required" }, { status: 400 });

    const clampedRating = Math.min(5, Math.max(1, parseInt(rating) || 5));

    const created = await prisma.review.create({
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

    return NextResponse.json({ review: created }, { status: 201 });
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
