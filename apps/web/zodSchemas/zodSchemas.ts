import * as z from "zod";

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Step 1: (Common for both student and tutor)

export const step0Schema = z.object({
  role: z.enum(["tutor", "student"]),
});
export const step1Schema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(10, "First name cannot be more than 10 character"),
  lastname: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(10, "Last name cannot be more than 10 character"),
  phonenumber: z
    .string()
    .trim()
    .min(8, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^\+?[0-9]{8,15}$/, "Invalid phone number format")
    .refine((val) => !/(.)\1{5,}/.test(val), {
      message: "Phone number appears to be fake",
    }),
  country: z.string().trim().min(1, "Country is required"),

  photo: z
    .instanceof(File)
    .refine(
      (file) =>
        file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      {
        message: "Only .jpeg, .jpg, and .png files are allowed",
      }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .optional(),
});

// STUDENT SCHEMAS
// Step 2: Student Education & Goals
export const studentStep2Schema = z.object({
  studentEducationLevel: z.enum(
    ["high_school", "bachelor", "master", "phd"],
    "Education Level is required"
  ),
  studentEducationStatus: z.enum(
    ["graduated", "full_time", "part_time", "academic_break", "dropped_out"],
    "Education status is required"
  ),
  fieldOfStudy: z
    .string()
    .min(2, "Field of study must be at least 2 characters")
    .max(100, "Field of study must be at most 100 characters"),
  academicGoals: z.enum(
    [
      "improve_grades",
      "exam_preparation",
      "skill_development",
      "career_advancement",
      "personal_interest",
    ],
    {
      error: "Academic goal is required ",
    }
  ),
  nameofInstitution: z
    .string()
    .trim()
    .min(1, "Name of institution is required")
    .max(100, "Name of institution cannot be more than 100 characters"),
  academicYear: z.enum(
    [
      "highschool_freshman",
      "highschool_sophomore",
      "highschool_junior",
      "highschool_senior",
      "undergraduate_year1",
      "undergraduate_year2",
      "undergraduate_year3",
      "undergraduate_year4",
      "postgraduate",
      "not_applicable",
    ],
    " Current Academic Year or Level is required"
  ),
});

// Step 3: Student Preferences
export const studentStep3Schema = z.object({
  languagePreference: z.enum(
    ["english", "spanish", "french", "arabic", "other"],
    "Language preference is required"
  ),
  learningStyle: z.enum(
    [
      "visual",
      "auditory",
      "kinesthetic",
      "reading_writing",
      "live_classes",
      "self_paced",
      "group_discussion",
    ],
    {
      error: "Learning style is required",
    }
  ),
  preferredSchedule: z.enum(
    ["morning", "afternoon", "evening", "flexible"],
    "Preferred schedule is required"
  ),
  deviceAccess: z.enum(
    ["mobile", "laptop", "tablet", "desktop"],
    "Device access is required"
  ),
  internetAccessQuality: z.enum(
    ["poor", "moderate", "reliable"],
    "Internet quality is required"
  ),
  preferredPace: z.enum(
    ["slow", "normal", "fast"],
    "Learning speed is required"
  ),

  focusDuration: z.enum(["15", "30", "60", "90+"], "Focus span is required"),
  engagementPreference: z.enum(
    [
      "quizzes_and_test",
      "assignment_and_projects",
      "discussions",
      "live_oral_questioning",
      "peer_review",
    ],
    "mode of engagment is required"
  ),
});

// Step 4: Student Interests
export const studentStep4Schema = z.object({
  interests: z.array(z.string()).min(3, "You must select at least 3 interests"),
});

// TUTOR SCHEMAS
// Step 2: Tutor Education & Experience
export const tutorStep2Schema = z.object({
  tutorEducationLevel: z.enum(
    ["diploma", "bachelors", "masters", "phd"],
    "Education level is required"
  ),
  yearsOfTeaching: z.coerce
    .number("Please enter a valid number")
    .min(1, "Must be at least 1 year")
    .max(50, "Too many years of experience"),
  previousInstitution: z
    .string()
    .trim()
    .min(1, "Previous institution is required")
    .max(100, "Institution name cannot be more 100 characters"),
});

// Step 3: Tutor Teaching Preferences
export const tutorStep3Schema = z.object({
  preferredStudentLevel: z.enum(
    ["beginner", "intermediate", "advanced", "all_levels"],
    "Preferred student Level is required"
  ),
  schedulePreference: z.enum(
    ["morning", "afternoon", "evening", "flexible"],
    "Schedule preference in required"
  ),
  deliveryFormat: z.enum(
    ["live", "recorded", "text-base", "blended"],
    "Delivery format is required"
  ),
  studentEvaluationMethod: z.enum(
    [
      "quizzes_and_test",
      "assignment_and_projects",
      "discussions",
      "live_oral_questioning",
      "peer_review",
    ],
    "Student evaluation is required"
  ),
  classFormat: z.enum(
    ["one_on_one", "small_class", "medium_class", "large_class"],
    "Class format is required"
  ),
  outsideClassInteraction: z.enum(
    ["lms_chat", "email", "forum", "video_feedback", "office_hours"],
    "Outside class interaction is required"
  ),
  teachingLanguages: z.enum(
    ["english", "spanish", "french", "arabic", "other"],
    "Teaching Language is required"
  ),
});

// Step 4: Tutor Course Preferences
export const tutorStep4Schema = z.object({
  coursePreferences: z
    .array(z.string())
    .min(3, "You must select at least 3 interests"),
});

// Step 5: Tutor Documents
export const tutorStep5Schema = z.object({
  cv: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "CV is required",
    })
    .refine((file) => file && allowedMimeTypes.includes(file.type), {
      message: "Only .pdf, .doc, and .docx files are allowed",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must be less than 10MB",
    }),
  certifications: z
    .array(z.instanceof(File))
    .nonempty({ message: "Please upload at least one file" })
    .refine(
      (files) => files.every((file) => allowedMimeTypes.includes(file.type)),
      {
        message: "Only .pdf, .doc, and .docx files are allowed",
      }
    )
    .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
      message: "Each file must be less than 10MB",
    }),
});

// Original complete schemas (for final validation)
export const basicSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(10, "First name cannot be more than 10 character"),
  lastname: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(10, "Last name cannot be more than 10 character"),
  phonenumber: z
    .string()
    .trim()
    .min(8, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^\+?[0-9]{8,15}$/, "Invalid phone number format")
    .refine((val) => !/(.)\1{5,}/.test(val), {
      message: "Phone number appears to be fake",
    }),
  country: z.string().trim().min(1, "Country is required"),
  role: z.enum(["tutor", "student"]),
  photo: z
    .instanceof(File)
    .refine(
      (file) =>
        file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      {
        message: "Only .jpeg, .jpg, and .png files are allowed",
      }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .optional(),
});

export const studentSchema = basicSchema.extend({
  studentEducationLevel: z.enum(
    ["high_school", "bachelor", "master", "phd"],
    "Education Level is required"
  ),
  fieldOfStudy: z
    .string()
    .min(2, "Field of study must be at least 2 characters")
    .max(100, "Field of study must be at most 100 characters"),
  nameofInstitution: z
    .string()
    .min(2, "Name your school institution is required")
    .max(100, "Name of institution cannot be more than 100 characters"),
  studentEducationStatus: z.enum(
    ["graduated", "full_time", "part_time", "academic_break", "dropped_out"],
    "Education status is required"
  ),
  academicGoals: z.enum(
    [
      "improve_grades",
      "exam_preparation",
      "skill_development",
      "career_advancement",
      "personal_interest",
    ],
    {
      error: "Academic goal is required ",
    }
  ),
  languagePreference: z.enum(
    ["english", "spanish", "french", "arabic", "other"],
    "Language preference is required"
  ),

  learningStyle: z.enum(
    [
      "visual",
      "auditory",
      "kinesthetic",
      "reading_writing",
      "live_classes",
      "self_paced",
      "group_discussion",
    ],
    {
      error: "Learning style is required",
    }
  ),
  preferredSchedule: z.enum(
    ["morning", "afternoon", "evening", "flexible"],
    "Preferred schedule is required"
  ),
  interests: z.array(z.string()).min(3, "You must select at least 3 interests"),
  academicYear: z.enum(
    [
      "highschool_freshman",
      "highschool_sophomore",
      "highschool_junior",
      "highschool_senior",
      "undergraduate_year1",
      "undergraduate_year2",
      "undergraduate_year3",
      "undergraduate_year4",
      "postgraduate",
      "not_applicable",
    ],
    " Current Academic Year or Level is required"
  ),
  deviceAccess: z.enum(
    ["mobile", "laptop", "tablet", "desktop"],
    "Device access is required"
  ),
  internetAccessQuality: z.enum(
    ["poor", "moderate", "reliable"],
    "Internet quality is required"
  ),
  preferredPace: z.enum(
    ["slow", "normal", "fast"],
    "Learning speed is required"
  ),

  focusDuration: z.enum(["15", "30", "60", "90+"], "Focus span is required"),
  engagementPreference: z.enum(
    [
      "quizzes_and_test",
      "assignment_and_projects",
      "discussions",
      "live_oral_questioning",
      "peer_review",
    ],
    "mode of engagment is required"
  ),
});

export const tutorSchema = basicSchema.extend({
  tutorEducationLevel: z.enum(
    ["diploma", "bachelors", "masters", "phd"],
    "Education level is required"
  ),
  yearsOfTeaching: z.number(),
  previousInstitution: z
    .string()
    .trim()
    .min(1, "Previous institution is required")
    .max(100, "Institution name cannot be more 100 characters"),
  preferredStudentLevel: z.enum(
    ["beginner", "intermediate", "advanced", "all_levels"],
    "Preferred student Level is required"
  ),
  schedulePreference: z.enum(
    ["mornining", "afternoon", "evening", "flexible"],
    "Schedule preference in required"
  ),
  deliveryFormat: z.enum(
    ["live", "recorded", "text-base", "blended"],
    "Delivery format is required"
  ),
  studentEvaluationMethod: z.enum(
    [
      "quizzes_and_test",
      "assignment_and_projects",
      "discussions",
      "live_oral_questioning",
      "peer_review",
    ],
    "Student evaluation is required"
  ),
  classFormat: z.enum(
    ["one_on_one", "small_class", "medium_class", "large_class"],
    "Class format is required"
  ),
  outsideClassInteraction: z.enum(
    ["lms_chat", "email", "forum", "video_feedback", "office_hours"],
    "Outside class interaction is required"
  ),
  teachingLanguages: z.enum(
    ["english", "spanish", "french", "arabic", "other"],
    "Teaching Language is required"
  ),
  coursePreferences: z
    .array(z.string())
    .min(3, "You must select at least 3 interests"),
  cv: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "CV is required",
    })
    .refine((file) => file && allowedMimeTypes.includes(file.type), {
      message: "Only .pdf, .doc, and .docx files are allowed",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size must be less than 10MB",
    }),
  certifications: z
    .array(z.instanceof(File))
    .nonempty({ message: "Please upload at least one file" })
    .refine(
      (files) => files.every((file) => allowedMimeTypes.includes(file.type)),
      {
        message: "Only .pdf, .doc, and .docx files are allowed",
      }
    )
    .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
      message: "Each file must be less than 10MB",
    }),
});

// Helper function to get the appropriate schema for a step
export const getValidationSchema = (
  role: "student" | "tutor",
  step: number
) => {
  if (step === 1) return step0Schema;
  if (step === 2) return step1Schema;

  if (role === "student") {
    switch (step) {
      case 3:
        return studentStep2Schema;
      case 4:
        return studentStep3Schema;
      case 5:
        return studentStep4Schema;
      default:
        return studentSchema;
    }
  } else if (role === "tutor") {
    switch (step) {
      case 3:
        return tutorStep2Schema;
      case 4:
        return tutorStep3Schema;
      case 5:
        return tutorStep4Schema;
      case 6:
        return tutorStep5Schema;
      default:
        return tutorSchema;
    }
  }

  throw new Error(`Invalid role or step: ${role}, ${step}`);
};

// Type definitions for each step
export type Step1Data = z.infer<typeof step1Schema>;
export type StudentStep2Data = z.infer<typeof studentStep2Schema>;
export type StudentStep3Data = z.infer<typeof studentStep3Schema>;
export type StudentStep4Data = z.infer<typeof studentStep4Schema>;
export type TutorStep2Data = z.infer<typeof tutorStep2Schema>;
export type TutorStep3Data = z.infer<typeof tutorStep3Schema>;
export type TutorStep4Data = z.infer<typeof tutorStep4Schema>;
export type TutorStep5Data = z.infer<typeof tutorStep5Schema>;
export type StudentData = z.infer<typeof studentSchema>;
export type TutorData = z.infer<typeof tutorSchema>;
