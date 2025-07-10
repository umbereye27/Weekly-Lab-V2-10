export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reflectionSchema } from "@/lib/validation";
import { auth } from "@/auth";
export const PATCH = auth(async function PATCH(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  const reflectionId = (await params).id;

  try {
    const userId = req.auth.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    // Check if the reflection exists and belongs to the user
    const existingReflection = await prisma.reflection.findFirst({
      where: {
        id: reflectionId,
        userId: userId,
      },
    });

    if (!existingReflection) {
      return NextResponse.json(
        { error: "Reflection not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { content, skillId } = reflectionSchema.parse({
      ...body,
      skillId: existingReflection.skillId, // Preserve the original skillId if not provided
    });

    // If skillId is provided, verify that it belongs to the user
    if (skillId && skillId !== existingReflection.skillId) {
      const skill = await prisma.skill.findFirst({
        where: {
          id: skillId,
          userId: userId,
        },
      });

      if (!skill) {
        return NextResponse.json(
          { error: "Skill not found or unauthorized" },
          { status: 404 }
        );
      }
    }

    const updatedReflection = await prisma.reflection.update({
      where: {
        id: reflectionId,
      },
      data: {
        content,
        skillId: skillId || existingReflection.skillId,
      },
      include: {
        skill: true,
      },
    });

    return NextResponse.json({
      message: "Reflection updated successfully",
      reflection: updatedReflection,
    });
  } catch (error) {
    console.error("Update reflection error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to update reflection",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});

// DELETE a reflection by ID
export const DELETE = auth(async function DELETE(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const reflectionId = (await params).id;

  try {
    const userId = req.auth.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    // Check if the reflection exists and belongs to the user
    const existingReflection = await prisma.reflection.findFirst({
      where: {
        id: reflectionId,
        userId: userId,
      },
    });

    if (!existingReflection) {
      return NextResponse.json(
        { error: "Reflection not found" },
        { status: 404 }
      );
    }

    await prisma.reflection.delete({
      where: {
        id: reflectionId,
      },
    });

    return NextResponse.json({
      message: "Reflection deleted successfully",
      reflectionId: reflectionId,
      status: "deleted",
    });
  } catch (error) {
    console.error("Delete reflection error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to delete reflection",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});
