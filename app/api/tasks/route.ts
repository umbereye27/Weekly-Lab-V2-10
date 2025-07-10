export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validation";
import { auth } from "@/auth";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const userId = req.auth.user?.id;
    const skillId = req.nextUrl.searchParams.get("skillId");

    const tasks = await prisma.task.findMany({
      where: {
        skillId: skillId || undefined,
        skill: {
          userId: userId,
        },
      },
      include: {
        skill: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve tasks",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const userId = req.auth.user?.id;
    const body = await req.json();
    const { title, skillId } = taskSchema.parse(body);

    // Verify that the skill belongs to the user
    const skill = await prisma.skill.findFirst({
      where: {
        id: skillId,
        userId: userId, // Ensure the skill belongs to the authenticated user
      },
    });

    if (!skill) {
      return NextResponse.json(
        { error: "Skill not found or unauthorized" },
        { status: 404 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        skillId: String(skillId),
      },
      include: {
        skill: true,
      },
    });

    return NextResponse.json(
      {
        message: "Task created successfully",
        task,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to create task",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});
