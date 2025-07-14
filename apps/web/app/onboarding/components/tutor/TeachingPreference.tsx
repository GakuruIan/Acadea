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
        <div className="mb-1">
          <FormField
            control={form.control}
            name="preferredStudentLevel"
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

        <div className="mb-1">
          <FormField
            control={form.control}
            name="schedulePreference"
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
        <div className="mb-1">
          <FormField
            control={form.control}
            name="deliveryFormat"
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
                      <SelectItem value="text-base">Text base</SelectItem>
                      <SelectItem value="blended">Blended</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-1">
          <FormField
            control={form.control}
            name="studentEvaluationMethod"
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

        <div className="mb-1">
          <FormField
            control={form.control}
            name="classFormat"
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

        <div className="mb-1">
          <FormField
            control={form.control}
            name="outsideClassInteraction"
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

        <div className="mb-1">
          <FormField
            control={form.control}
            name="teachingLanguages"
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
