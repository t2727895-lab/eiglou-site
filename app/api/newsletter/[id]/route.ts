import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// DELETE /api/newsletter/[id]  — admin removes a subscriber
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.subscriber.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Subscriber removed" });
  } catch (error) {
    console.error("Delete subscriber error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
