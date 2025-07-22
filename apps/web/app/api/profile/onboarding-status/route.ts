import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@acadea/database";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Authenticated users only", { status: 401 });
    }

    const [studentProfile, tutorProfile] = await Promise.all([
      prisma.studentProfile.findUnique({
        where: {
          user_id: userId,
          has_completed_onboarding: true,
        },
        select: { user_id: true, role: true },
      }),
      prisma.tutorProfile.findUnique({
        where: {
          user_id: userId,
          has_completed_onboarding: true,
        },
        select: { user_id: true, role: true },
      }),
    ]);

    if (studentProfile) {
      return NextResponse.json({
        has_completed_onboarding: true,
        user_id: studentProfile.user_id,
        role: studentProfile.role,
      });
    }

    if (tutorProfile) {
      return NextResponse.json({
        has_completed_onboarding: true,
        user_id: tutorProfile.user_id,
        role: tutorProfile.role,
      });
    }

    const [incompleteStudent, incompleteTutor] = await Promise.all([
      prisma.studentProfile.findUnique({
        where: {
          user_id: userId,
          has_completed_onboarding: false,
        },
        select: { user_id: true, role: true },
      }),
      prisma.tutorProfile.findUnique({
        where: {
          user_id: userId,
          has_completed_onboarding: false,
        },
        select: { user_id: true, role: true },
      }),
    ]);

    if (incompleteStudent) {
      return NextResponse.json({
        hasCompletedOnboarding: false,
        role: "student",
      });
    }

    if (incompleteTutor) {
      return NextResponse.json({
        hasCompletedOnboarding: false,
        role: "tutor",
      });
    }

    return NextResponse.json({
      has_completed_onboarding: false,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
