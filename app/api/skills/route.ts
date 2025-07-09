export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { skillSchema } from "@/lib/validation";
import { auth } from "@/auth";

export const GET = auth(async function GET(req) {
  console.log("GET skills");
  console.log(req.auth);
  if (!req.auth) {
    return NextResponse.json(
      { message: "Not authenticatedyese" },
      { status: 401 }
    );
  }

  try {
    const userId = req.auth.user?.id;
    const skills = await prisma.skill.findMany({
      where: { userId },
      include: {
        tasks: true,
        _count: {
          select: {
            tasks: true,
            reflections: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Remove userId from each skill in the response
    const sanitizedSkills = skills.map((skill) => {
      const { userId: skillUserId, ...skillWithoutUserId } = skill;
      return skillWithoutUserId;
    });

    return NextResponse.json({
      message: "Skills retrieved successfully",
      skills: sanitizedSkills,
    });
  } catch (error) {
    console.error("Get skills error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve skills",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(req) {
  console.log("POST skills");
  console.log(req.auth);
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const currentUserId = req.auth.user?.id;

    if (!currentUserId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    const { title, description } = skillSchema.parse(body);

    const skill = await prisma.skill.create({
      data: {
        title,
        description,
        userId: currentUserId,
      },
      include: {
        tasks: true,
        _count: {
          select: {
            tasks: true,
            reflections: true,
          },
        },
      },
    });

    // Remove userId from the response
    const { userId: skillUserId, ...skillWithoutUserId } = skill;

    return NextResponse.json(
      {
        message: "Skill created successfully",
        skill: skillWithoutUserId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create skill error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to create skill",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
});
