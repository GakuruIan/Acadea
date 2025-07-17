import React from "react";

import { UseFormReturn } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { StudentData } from "@/zodSchemas/zodSchemas";

interface props {
  form: UseFormReturn<StudentData>;
}

const StudentReview = ({ form }: props) => {
  const getEducationLevelLabel = (value: string) => {
    const labels = {
      primary: "Primary School",
      secondary: "Secondary School",
      high_school: "High School",
      undergraduate: "Undergraduate",
      graduate: "Graduate",
      postgraduate: "Postgraduate",
      phd: "PhD",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getLanguageLabel = (value: string) => {
    const labels = {
      english: "English",
      spanish: "Spanish",
      french: "French",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getLearningStyleLabel = (value: string) => {
    const labels = {
      visual: "Visual",
      auditory: "Auditory",
      kinesthetic: "Kinesthetic",
      reading_writing: "Reading/Writing",
      live_classes: "Live Classes",
      self_paced: "Self Paced",
      group_discussion: "Group Discussions",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getScheduleLabel = (value: string) => {
    const labels = {
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      flexible: "Flexible",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getDeviceLabel = (value: string) => {
    const labels = {
      mobile: "Mobile",
      laptop: "Laptop",
      tablet: "Tablet",
      desktop: "Desktop",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getInternetQualityLabel = (value: string) => {
    const labels = {
      poor: "Poor",
      moderate: "Moderate",
      reliable: "Reliable",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getPaceLabel = (value: string) => {
    const labels = {
      slow: "Slow",
      normal: "Normal",
      fast: "Fast",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getFocusDurationLabel = (value: string) => {
    const labels = {
      "15": "15 minutes",
      "30": "30 minutes",
      "60": "60 minutes",
      "90+": "90+ minutes",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getEngagementLabel = (value: string) => {
    const labels = {
      quizzes_and_test: "Quizzes and Tests",
      assignment_and_projects: "Assignments and Projects",
      discussions: "Discussions",
      live_oral_questioning: "Live Oral Questioning",
      peer_review: "Peer Review",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getAcademicGoalsLabel = (value: string) => {
    const labels = {
      improve_grades: "Improve Grades",
      exam_preparation: "Exam Preparation",
      skill_development: "Skill Development",
      career_advancement: "Career Advancement",
      personal_interest: "Personal Interest",
    };
    return labels[value as keyof typeof labels] || value;
  };

  const getEducationStatusLabel = (value: string) => {
    const labels = {
      graduated: "Graduated",
      full_time: "Studing fulltime",
      part_time: "Studing part time",
      academic_break: "On academic break",
      dropped_out: "Dropped out",
    };
    return labels[value as keyof typeof labels] || value;
  };

  // Format interest labels (convert snake_case to Title Case)
  const formatInterestLabel = (value: string) => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Basic information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-y-6 text-balance">
          <div className="flex items-center justify-between">
            <p>Fullname</p>
            <p>{`${form.getValues("firstname")} ${form.getValues("lastname")}`}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Phone number</p>
            <p>{form.getValues("phonenumber")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Country</p>
            <p>{form.getValues("country")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Role</p>
            <p className="capitalize">{form.getValues("role")}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Academic Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className="flex items-center justify-between">
            <p>Education Level</p>
            <p>
              {getEducationLevelLabel(form.getValues("studentEducationLevel"))}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Education Status</p>
            <p>
              {getEducationStatusLabel(
                form.getValues("studentEducationStatus")
              )}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Field of study</p>
            <p>{form.getValues("fieldOfStudy")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Name of school</p>
            <p>{form.getValues("nameofInstitution")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Academic year</p>
            <p>{form.getValues("academicYear")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Main Academic goal</p>
            <p>{getAcademicGoalsLabel(form.getValues("academicGoals"))}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Learning Preference</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className="flex items-center justify-between">
            <p>Learning Language Preference</p>
            <p>{getLanguageLabel(form.getValues("languagePreference"))}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Preferred Learning Style</p>
            <p>{getLearningStyleLabel(form.getValues("learningStyle"))}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>When You Prefer to Study</p>
            <p>{getScheduleLabel(form.getValues("preferredSchedule"))}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Device Will You Use to Learn</p>
            <p>{getDeviceLabel(form.getValues("deviceAccess"))}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Quality of Your Internet Connection</p>
            <p>
              {getInternetQualityLabel(form.getValues("internetAccessQuality"))}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>Preferred Learning Speed</p>
            <p>{getPaceLabel(form.getValues("preferredPace"))}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>How long you stay focused during a learning session</p>
            <p>{getFocusDurationLabel(form.getValues("focusDuration"))}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>How Do You Prefer to Stay Engaged During Learning?</p>
            <p>{getEngagementLabel(form.getValues("engagementPreference"))}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Interests</AccordionTrigger>
        <AccordionContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-balance">
          {form.getValues("interests").map((interest, index) => (
            <span
              key={index}
              className="text-center px-3 py-2 border dark:border-neutral-500/10 border-gray-200 rounded-lg text-sm dark:text-white"
            >
              {formatInterestLabel(interest)}
            </span>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default StudentReview;
