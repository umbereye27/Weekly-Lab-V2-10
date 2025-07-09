export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validation";
import { auth } from "@/auth";

// GET a single task by ID
export const GET = auth(async function GET(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  const taskId = (await params).id;

  try {
    const userId = req.auth.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        skill: {
          userId: userId,
        },
      },
      include: {
        skill: true,
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    console.error("Get task error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve task",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});

// UPDATE a task by ID
export const PATCH = auth(async function PATCH(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  const taskId = (await params).id;

  try {
    const userId = req.auth.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    // Check if the task exists and belongs to the user's skills
    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
        skill: {
          userId: userId,
        },
      },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const body = await req.json();
    const { title, description, completed, skillId } = taskSchema.parse({
      ...body,
      skillId: existingTask.skillId, // Preserve the original skillId if not provided
    });

    // If skillId is provided, verify that it belongs to the user
    if (skillId && skillId !== existingTask.skillId) {
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

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        completed,
        skillId: skillId || existingTask.skillId,
      },
      include: {
        skill: true,
      },
    });

    return NextResponse.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update task error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to update task",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});

// DELETE a task by ID
export const DELETE = auth(async function DELETE(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  const taskId = (await params).id;

  try {
    const userId = req.auth.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    // Check if the task exists and belongs to the user's skills
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        skill: {
          userId: userId,
        },
      },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json({
      message: "Task deleted successfully",
      taskId: taskId,
      status: "deleted",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to delete task",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});
