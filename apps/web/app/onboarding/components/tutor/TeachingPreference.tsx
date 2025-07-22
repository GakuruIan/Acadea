import React from "react";

// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface props {
  form: any;
}

const TeachingPreference = ({ form }: props) => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* preferred student leve */}
        <div className="mb-1">
          <FormField
            control={form.control}
            name="preferred_student_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm">
                  Preferred student Level
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select student level " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Level</SelectLabel>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate Learners
                        </SelectItem>
                        <SelectItem value="advanced">
                          Advanced Learners
                        </SelectItem>
                        <SelectItem value="all_levels">All Levels</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* schedule preference */}
        <div className="mb-1">
          <FormField
            control={form.control}
            name="schedule_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm">
                  Preferred Schedule
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select schedule preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* delivery format */}
        <div className="mb-1">
          <FormField
            control={form.control}
            name="delivery_format"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm">
                  What’s your preferred delivery format?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select delivery preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live classes</SelectItem>
                      <SelectItem value="recorded">Pre-record</SelectItem>
                      <SelectItem value="text_base">Text base</SelectItem>
                      <SelectItem value="blended">Blended</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* student evaluation */}
        <div className="mb-1">
          <FormField
            control={form.control}
            name="student_evaluation_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm">
                  How do you prefer to evaluate student progress?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select schedule preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quizzes_and_test">
                        Quizzes and tests
                      </SelectItem>
                      <SelectItem value="assignment_and_projects">
                        Assignments and projects
                      </SelectItem>
                      <SelectItem value="discussions">
                        Participation in discussions
                      </SelectItem>
                      <SelectItem value="live_oral_questioning">
                        Live oral questioning
                      </SelectItem>
                      <SelectItem value="peer_review">Peer review</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* class format */}
        <div className="mb-1">
          <FormField
            control={form.control}
            name="class_format"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm">
                  What’s your preferred class format?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select schedule preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one_on_one">One-on-one</SelectItem>
                      <SelectItem value="small_class">
                        Small groups (2–5)
                      </SelectItem>
                      <SelectItem value="medium_class">
                        Medium groups (6–15)
                      </SelectItem>
                      <SelectItem value="large_class">
                        Large classes (15+)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* outside class interface */}
        <div className="mb-1">
          <FormField
            control={form.control}
            name="outside_class_interaction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm">
                  How would you like to interact with students outside class?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select mode of interaction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lms_chat">LMS chat</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="forum">Group forum</SelectItem>
                      <SelectItem value="video_feedback">
                        Video feedback
                      </SelectItem>
                      <SelectItem value="office_hours">Office hours</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* teaching languages */}
        <div className="mb-1">
          <FormField
            control={form.control}
            name="teaching_languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="tracking-wider text-sm">
                  Which languages can you teach in?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a language " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TeachingPreference;
