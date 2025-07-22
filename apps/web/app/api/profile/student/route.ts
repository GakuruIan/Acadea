import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@acadea/database";
import { studentSchema } from "@/zodSchemas/zodSchemas";

import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 401 });
    }

    const formData = await req.formData();

    // role validation
    const role = formData.get("role");
    if (!role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    const rawData: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key === "photo") {
        rawData[key] = value;
        continue;
      }

      if (key.endsWith("[]")) {
        const trimmedKey = key.replace("[]", "");
        if (!rawData[trimmedKey]) rawData[trimmedKey] = [];
        rawData[trimmedKey].push(value);
      } else {
        rawData[key] = value;
      }
    }

    let uploadResult;

    const photo = formData.get("photo") as File | null;
    if (photo) {
      const result = await uploadToCloudinary(photo, {
        folder: `acadea/${role}_profiles`,
        resource_type: "image",
      });
      uploadResult = Array.isArray(result) ? result[0] : result;
    }

    if (role === "student") {
      const validatedData = studentSchema.parse(rawData);

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
          photo: uploadResult?.secure_url || "",
          photoId: uploadResult?.public_id || "",
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

    // Handle file upload errors
    if (
      error instanceof Error &&
      error.message.includes("Invalid certification upload")
    ) {
      return NextResponse.json(
        { error: "Failed to upload one or more certification files" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
