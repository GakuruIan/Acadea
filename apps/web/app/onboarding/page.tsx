"use client";
import React, { useState, useEffect } from "react";

// tanstack hooks
import { useCreateProfile } from "@/hooks/profile/useCreateProfile";
import { useCheckOnboardingStatus } from "@/hooks/profile/useCheckOnboardingStatus";

import { motion } from "motion/react";

import { ArrowRight, ArrowLeft } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
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

//
import Loader from "@/components/ui/Loader/Loader";
import Spinner from "@/components/ui/spinner/spinner";

// routing
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

type FormValues = StudentFormSchema | TutorFormSchema;

const getDefaultValues = (role: string) => {
  const roleDefaults = {
    role: "student",
  };
  const baseDefaults = {
    first_name: "",
    last_name: "",
    country: "",
    phone_number: "",
    photo: undefined,
  };

  if (role === "student") {
    return {
      ...roleDefaults,
      ...baseDefaults,
      student_education_level: undefined,
      field_of_study: "",
      name_of_institution: "",
      academic_year: "",
      device_access: undefined,
      preferred_pace: undefined,
      focus_duration: undefined,
      engagement_preference: undefined,
      internet_access_quality: undefined,
      academic_goals: undefined,
      language_preference: undefined,
      learning_style: undefined,
      preferred_schedule: undefined,
      interests: [] as string[],
    };
  } else if (role === "tutor") {
    return {
      ...roleDefaults,
      ...baseDefaults,
      tutor_education_level: undefined,
      years_of_teaching: "",
      previous_institution: "",
      preferred_student_level: undefined,
      schedule_preference: undefined,
      delivery_format: undefined,
      student_evaluation_method: undefined,
      class_format: undefined,
      outside_class_interaction: undefined,
      teaching_languages: undefined,
      course_preferences: [] as string[],
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
  const createProfileMutation = useCreateProfile();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { isLoaded, isSignedIn, user } = useUser();

  const {
    data: onboardingStatus,
    isLoading: isCheckingOnboarding,
    isError: onboardingError,
  } = useCheckOnboardingStatus(user?.id, {
    enabled: isLoaded && isSignedIn,
  });

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

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/login");
    }

    if (isLoaded && isSignedIn && onboardingStatus && !isCheckingOnboarding) {
      console.log(onboardingStatus);
      if (onboardingStatus.has_completed_onboarding) {
        const redirectPath =
          onboardingStatus.role === "tutor"
            ? "/tutor-dashboard"
            : "/student-dashboard";
        router.replace(redirectPath);
        return;
      }

      if (onboardingStatus.role && !onboardingStatus.hasCompletedOnboarding) {
        setCurrentRole(onboardingStatus.role);
        form.reset({
          ...getDefaultValues(onboardingStatus.role),
          role: onboardingStatus.role,
        });
      }
    }
  }, [
    form,
    isLoaded,
    isSignedIn,
    onboardingStatus,
    isCheckingOnboarding,
    router,
  ]);

  const watchedRole = useWatch({
    control: form.control,
    name: "role",
  });

  useEffect(() => {
    if (watchedRole && watchedRole !== currentRole) {
      setCurrentRole(watchedRole);
      setCurrentStep(0);

      form.reset({
        ...getDefaultValues(watchedRole),
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
  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
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
          return <StudentReview form={form} />;
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

  if (!isLoaded || isCheckingOnboarding) {
    return <Loader />;
  }

  const onSubmit: SubmitHandler<FormValues> = async (
    values: StudentFormSchema | TutorFormSchema
  ) => {
    const role = form.getValues("role");
    setIsLoading(true);

    if (role === "student") {
      const studentValues = form.getValues() as StudentFormSchema;
      toast.promise(
        (async () => {
          try {
            await createProfileMutation.mutateAsync(studentValues);
            router.push("/dashboard");
          } catch (err: any) {
            console.error(err);
            throw err;
          } finally {
            setIsLoading(false);
          }
        })(),
        {
          loading: "Creating student profile...",
          success: "Profile created!",
          error: (err) => err?.message || "Failed to submit",
        }
      );
    }
    if (role === "tutor") {
      const tutorValues = values as TutorFormSchema;
      toast.promise(
        (async () => {
          try {
            await createProfileMutation.mutateAsync(tutorValues);
            router.push("/dashboard");
          } catch (err: any) {
            console.log(err);
            throw err;
          } finally {
            setIsLoading(false);
          }
        })(),
        {
          loading: "Creating tutor profile...",
          success: "Profile created!",
          error: (err) => err?.message || "Failed to submit",
        }
      );
    }
  };

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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                {renderStepContent()}
                <div className="flex items-center justify-between mt-4 w-full">
                  {currentStep > 0 && (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                    >
                      <ArrowLeft size={16} className="" />
                      Back
                    </Button>
                  )}

                  {isLastStep ? (
                    <Button
                      type="submit"
                      className="flex justify-end"
                      variant="default"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-x-3">
                          <Spinner size="xs" variant="button" />
                          <p className=" ">Submitting...</p>
                        </div>
                      ) : (
                        "Submit"
                      )}
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
