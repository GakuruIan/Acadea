"use client";
import React, { useState, useEffect } from "react";

import { motion } from "motion/react";

import { ArrowRight, ArrowLeft } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";

// validation schema
import {
  studentSchema,
  tutorSchema,
  getValidationSchema,
} from "@/zodSchemas/zodSchemas";
//toast
import { toast } from "sonner";

import { useUser } from "@clerk/nextjs";

import { Form } from "@/components/ui/form";

// onboarding components
import AcademicInformation from "./components/student/AcademicInformation";
import LearningPreference from "./components/student/LearningPreference";
import StudentReview from "./components/student/StudentReview";
import Interest from "./components/student/Interests";
import TeachingExperience from "./components/tutor/TeachingExperience";
import DocumentUpload from "./components/tutor/DocumentUpload";
import CoursePreference from "./components/tutor/CoursePreference";
import TeachingPreference from "./components/tutor/TeachingPreference";
import BasicInfo from "./components/BasicInfo";
import TutorReview from "./components/tutor/TutorReview";

import RolePicker from "./components/RolePicker";
import Loader from "@/components/ui/Loader/Loader";
import { useRouter } from "next/navigation";

const getStepConfig = (role: string) => {
  const steps = [
    {
      id: 1,
      title: "Choose your role",
      description: "Select whether you want to join as a student or a tutor.",
    },
  ];

  const studentSteps = [
    {
      id: 2,
      title: "Basic Information",
      description: "Tell us about yourself and how we can reach you.",
    },
    {
      id: 3,
      title: "Academic Information",
      description: "Help us understand your education level and goals.",
    },
    {
      id: 4,
      title: "Learning Preferences",
      description: "Tell us when and how you prefer to learn.",
    },
    {
      id: 5,
      title: "Subject Interests",
      description: "Choose subjects you're interested in learning.",
    },
    {
      id: 6,
      title: "Review and Submit",
      description: "Check your details before completing sign-up.",
    },
  ];

  const tutorSteps = [
    {
      id: 2,
      title: "Basic Information",
      description: "Provide your personal details and contact info.",
    },
    {
      id: 3,
      title: "Teaching Experience",
      description: "Tell us about your experience and expertise.",
    },
    {
      id: 4,
      title: "Teaching Preferences",
      description: "Define how and when you'd like to teach.",
    },
    {
      id: 5,
      title: "Course Preferences",
      description: "Select subjects you’re comfortable teaching.",
    },
    {
      id: 6,
      title: "Document Upload",
      description: "Upload certifications or proof of qualifications.",
    },
    {
      id: 7,
      title: "Review and Submit",
      description: "Verify your details before completing registration.",
    },
  ];

  if (role === "student") return [...steps, ...studentSteps];
  if (role === "tutor") return [...steps, ...tutorSteps];

  return steps;
};

type StudentFormSchema = z.infer<typeof studentSchema>;
type TutorFormSchema = z.infer<typeof tutorSchema>;

const getDefaultValues = (role: string) => {
  const roleDefaults = {
    role: "student",
  };
  const baseDefaults = {
    firstname: "",
    lastname: "",
    country: "",
    phonenumber: "",
    photo: undefined,
  };

  if (role === "student") {
    return {
      ...roleDefaults,
      ...baseDefaults,
      studentEducationLevel: undefined,
      fieldOfStudy: "",
      institution: "",
      academicYear: "",
      deviceAccess: undefined,
      preferredPace: undefined,
      focusDuration: undefined,
      engagementPreference: undefined,
      internetAccessQuality: undefined,
      academicGoals: undefined,
      languagePreference: undefined,
      learningStyle: undefined,
      preferredSchedule: undefined,
      interests: [] as string[],
    };
  } else if (role === "tutor") {
    return {
      ...roleDefaults,
      ...baseDefaults,
      tutorEducationLevel: undefined,
      yearsOfTeaching: "",
      previousInstitution: "",
      preferredStudentLevel: undefined,
      schedulePreference: undefined,
      deliveryFormat: undefined,
      studentEvaluationMethod: undefined,
      classFormat: undefined,
      outsideClassInteraction: undefined,
      teachingLanguages: undefined,
      coursePreferences: [] as string[],
      cv: undefined as File | undefined,
      certifications: [] as File[],
    };
  }
  return baseDefaults;
};

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentRole, setCurrentRole] = useState<"student" | "tutor">(
    "student"
  );
  const router = useRouter();

  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn, router]);

  const schema = React.useMemo(() => {
    return getValidationSchema(currentRole, currentStep + 1);
  }, [currentRole, currentStep]);

  const form = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: getDefaultValues(currentRole) as
      | StudentFormSchema
      | TutorFormSchema,
  });

  const watchedRole = useWatch({
    control: form.control,
    name: "role",
  });

  useEffect(() => {
    if (watchedRole && watchedRole !== currentRole) {
      const prevValues = form.getValues();

      setCurrentRole(watchedRole);
      setCurrentStep(0);

      form.reset({
        ...getDefaultValues(watchedRole),
        ...prevValues,
        role: watchedRole,
      });
    }
  }, [watchedRole, form, currentRole]);

  const steps = getStepConfig(watchedRole);

  const handleNext = async () => {
    const currentStepNumber = currentStep + 1;

    try {
      const stepSchema = getValidationSchema(currentRole, currentStepNumber);
      const stepFields = Object.keys(stepSchema.shape);

      const isValid = await form.trigger(stepFields as any);

      if (isValid) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      } else {
        console.log("Form errors:", form.formState.errors);
        toast.error("Please fix the errors before proceeding");
      }
    } catch (error) {
      console.error("Step validation error:", error);

      const isValid = await form.trigger();
      if (isValid && currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        toast.error("Please fix the errors before proceeding");
      }
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 0) {
      return <RolePicker form={form} />;
    }

    if (currentStep === 1) {
      return <BasicInfo form={form} />;
    }

    if (watchedRole === "student") {
      switch (currentStep) {
        case 2:
          return <AcademicInformation form={form} />;
        case 3:
          return <LearningPreference form={form} />;
        case 4:
          return <Interest control={form.control} />;
        case 5:
          return <StudentReview />;
        default:
          return null;
      }
    } else if (watchedRole === "tutor") {
      switch (currentStep) {
        case 2:
          return <TeachingExperience form={form} />;
        case 3:
          return <TeachingPreference form={form} />;
        case 4:
          return <CoursePreference control={form.control} />;
        case 5:
          return <DocumentUpload form={form} />;
        case 6:
          return <TutorReview />;
        default:
          return null;
      }
    }

    return null;
  };

  const isLastStep = currentStep === steps.length - 1;

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 w-full max-w-2xl  mx-auto ">
      <div className="w-full">
        <div className="mt-8">
          <h6 className="mb-2 text-3xl">{steps[currentStep]?.title}</h6>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            {steps[currentStep]?.description}
          </p>
        </div>

        {/* form stepper */}
        <div className="">
          <div className="flex mt-4 w-full justify-end">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <div className="flex  items-center justify-between mb-8 mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <motion.div
                className="h-1 bg-gray-300 dark:bg-neutral-500/60"
                initial={{ width: "0%" }}
                animate={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="">
            <Form {...form}>
              <form>{renderStepContent()}</form>
            </Form>
          </div>

          <div className="flex items-center justify-between mt-4 w-full">
            {currentStep > 0 && (
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft size={16} className="" />
                Back
              </Button>
            )}

            {isLastStep ? (
              <Button
                type="submit"
                className="flex justify-end"
                onClick={() => {
                  console.log("submitting");
                }}
                variant="default"
              >
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                className="flex justify-end"
                onClick={handleNext}
                variant="default"
              >
                Next
                <ArrowRight />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
