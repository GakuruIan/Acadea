import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@acadea/database";
import { StudentData, studentSchema, TutorData } from "@/zodSchemas/zodSchemas";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 401 });
    }

    const body = await req.json();

    if (!body.role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    const { role } = body;

    if (role === "student") {
      const validatedData = studentSchema.parse(body);

      const { photo, ...dataForDB } = validatedData;

      const existingProfile = await prisma.studentProfile.findUnique({
        where: {
          user_id: userId,
        },
      });

      if (existingProfile) {
        return new NextResponse("Student profile already exists", {
          status: 409,
        });
      }

      const studentProfile = await prisma.studentProfile.create({
        data: {
          ...dataForDB,
          has_completed_onboarding: true,
          owner: {
            connect: {
              clerkId: userId,
            },
          },
        },
      });

      return NextResponse.json(
        {
          message: "Student profile created successfully",
          profile: studentProfile,
          role: "student",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("Error creating profile:", error);

    // Handle Zod validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid data provided", details: error.message },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Profile already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
