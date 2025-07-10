export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { skillSchema } from "@/lib/validation";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const skillId = (await params).id;

  try {
    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
      include: {
        tasks: { orderBy: { createdAt: "asc" } },
        reflections: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Skill retrieved successfully",
      skill,
    });
  } catch (error) {
    console.error("Get skill error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve skill",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const skillId = (await params).id;
  try {
    const body = await req.json();
    const { title, description } = skillSchema.parse(body);

    const skill = await prisma.skill.update({
      where: {
        id: skillId,
      },
      data: {
        title,
        description,
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const updatedSkill = await prisma.skill.findUnique({
      where: { id: skillId },
      include: {
        tasks: true,
        reflections: true,
      },
    });

    return NextResponse.json({
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    console.error("Update skill error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to update skill",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const skillId = (await params).id;

  try {
    const result = await prisma.skill.delete({
      where: {
        id: skillId,
      },
    });
    return NextResponse.json({
      message: "Skill deleted successfully",
      skillId: skillId,
      status: "deleted",
    });
  } catch (error) {
    console.error("Delete skill error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to delete skill",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
