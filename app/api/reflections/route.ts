export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reflectionSchema } from "@/lib/validation";
import { auth } from "@/auth";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const userId = req.auth.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { content, skillId } = reflectionSchema.parse(body);

    const skill = await prisma.skill.findFirst({
      where: {
        id: skillId,
        userId: userId,
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const reflection = await prisma.reflection.create({
      data: {
        content,
        skillId,
        userId: userId,
      },
      include: {
        skill: true,
      },
    });

    return NextResponse.json(
      {
        message: "Reflection created successfully",
        reflection,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create reflection error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to create reflection",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const userId = req.auth.user?.id;
    const skillId = req.nextUrl.searchParams.get("skillId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    const reflections = await prisma.reflection.findMany({
      where: {
        skillId: skillId || undefined,
        userId: userId,
      },
      include: {
        skill: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      message: "Reflections retrieved successfully",
      reflections,
    });
  } catch (error) {
    console.error("Get reflections error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve reflections",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});
