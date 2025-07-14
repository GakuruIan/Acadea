import React from "react";

// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  form: any;
}

const LearningPreference = ({ form }: Props) => {
  return (
    <div>
      <div className="mb-6">
        <FormField
          control={form.control}
          name="languagePreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Preferred Language of Instruction
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a language you’re most comfortable learning in" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="learningStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Your Preferred Learning Style
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder=" Your Preferred Learning Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">Visual</SelectItem>
                    <SelectItem value="auditory">Auditory</SelectItem>
                    <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                    <SelectItem value="reading">Reading/Writing</SelectItem>
                    <SelectItem value="live_classes">Live classes</SelectItem>
                    <SelectItem value="self_paced">Self paced</SelectItem>
                    <SelectItem value="group_discussion">
                      Group discussions
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="preferredSchedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                When Do You Prefer to Study?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your ideal study time" />
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

      <div className="mb-6">
        <FormField
          control={form.control}
          name="deviceAccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                What Device Will You Use to Learn?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose the device you’ll use most often" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="internetAccessQuality"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Quality of Your Internet Connection
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the internet quality you usually have" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="reliable">Reliable</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="preferredPace"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Preferred Learning Speed
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="How quickly do you like to learn?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="focusDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                How long can you stay focused during a learning session?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your typical focus span" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90+">more than hour</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="engagementPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                How Do You Prefer to Stay Engaged During Learning?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your preferred engagement style" />
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
    </div>
  );
};

export default LearningPreference;
