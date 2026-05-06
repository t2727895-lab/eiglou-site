import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PATCH /api/contact/[id]  — mark as read/unread
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body   = await request.json();

    const updated = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data:  { isRead: body.isRead ?? true },
    });
    return NextResponse.json({ message: updated });
  } catch (error) {
    console.error("Update contact message error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/contact/[id]  — delete a message
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.contactMessage.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete contact message error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
