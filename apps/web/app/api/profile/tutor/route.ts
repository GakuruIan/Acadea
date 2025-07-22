import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@acadea/database";
import { auth } from "@clerk/nextjs/server";
import { tutorSchema } from "@/zodSchemas/zodSchemas";

// cloudinary upload function
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 401 });
    }

    const formData = await req.formData();

    const role = formData.get("role");
    if (!role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    const rawData: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key === "cv" || key === "photo") {
        rawData[key] = value;
        continue;
      }

      if (key === "certifications") {
        if (!rawData[key]) rawData[key] = [];
        rawData[key].push(value);
        continue;
      }

      //   if (key === "photo") continue;

      if (key.endsWith("[]")) {
        const trimmedKey = key.replace("[]", "");
        if (!rawData[trimmedKey]) rawData[trimmedKey] = [];
        rawData[trimmedKey].push(value);
      } else {
        rawData[key] = value;
      }
    }

    let uploadResult;
    let cvResults;
    let uploadedCerts: { url: string; fileId: string }[] = [];

    const photoFile = formData.get("photo") as File | null;
    if (photoFile) {
      const result = await uploadToCloudinary(photoFile, {
        folder: `acadea/${role}_profiles`,
        resource_type: "image",
      });
      uploadResult = Array.isArray(result) ? result[0] : result;
    }

    // uploading tutor cv
    const cvFile = formData.get("cv") as File;
    if (role === "tutor" && cvFile && cvFile instanceof File) {
      const results = await uploadToCloudinary(cvFile, {
        folder: `acadea/tutor_cv`,
        resource_type: "raw",
      });
      cvResults = Array.isArray(results) ? results[0] : results;
    }

    // upload certifications file if role is tutor
    const certFiles = formData.getAll("certifications") as File[];

    // validating the certifications
    const validCertFiles = certFiles.filter(
      (file): file is File => file instanceof File && file.size > 0
    );
    if (role === "tutor" && validCertFiles.length > 0) {
      uploadedCerts = await Promise.all(
        validCertFiles.map(async (file) => {
          const result = await uploadToCloudinary(file, {
            folder: "acadea/tutor_certifications",
            resource_type: "raw",
          });
          const certUpload = Array.isArray(result) ? result[0] : result;
          if (!certUpload?.public_id || !certUpload?.secure_url) {
            throw new Error("Invalid certification upload");
          }
          return {
            url: certUpload.secure_url,
            fileId: certUpload.public_id,
          };
        })
      );
    }

    // Validate that required files are present for tutor
    if (!cvResults) {
      return NextResponse.json(
        { error: "CV file is required for tutor registration" },
        { status: 400 }
      );
    }

    if (uploadedCerts.length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one certification is required for tutor registration",
        },
        { status: 400 }
      );
    }

    const existingProfile = await prisma.tutorProfile.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (existingProfile) {
      return new NextResponse("Tutor profile already exists", {
        status: 409,
      });
    }

    const validatedData = tutorSchema.parse(rawData);

    const { photo, cv, certifications, ...dataForDb } = validatedData;

    await prisma.tutorProfile.create({
      data: {
        ...dataForDb,
        cv: cvResults.secure_url,
        cvId: cvResults.public_id,
        photo: uploadResult?.secure_url || "",
        photoId: uploadResult?.public_id || "",
        has_completed_onboarding: true,
        certifications: {
          create: uploadedCerts,
        },
        owner: {
          connect: {
            clerkId: userId,
          },
        },
      },
      include: {
        certifications: true,
      },
    });

    return NextResponse.json(
      {
        message: "Tutor profile created successfully",
        role: "tutor",
      },
      { status: 201 }
    );
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
