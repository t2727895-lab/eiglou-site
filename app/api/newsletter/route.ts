import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/newsletter  — subscribe an email
export async function POST(request: NextRequest) {
  try {
    let email: string | undefined;

    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = body.email;
    } else {
      // form submission (application/x-www-form-urlencoded)
      const formData = await request.formData();
      email = formData.get("email")?.toString();
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalised = email.trim().toLowerCase();

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalised)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Upsert — silently succeed if already subscribed
    await prisma.subscriber.upsert({
      where:  { email: normalised },
      update: {},                          // already exists — do nothing
      create: { email: normalised },
    });

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/newsletter  — list all subscribers (admin use)
export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: "desc" },
    });
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error("Fetch subscribers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
