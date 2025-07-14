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

const AcademicInformation = ({ form }: Props) => {
  return (
    <div>
      <div className="mb-6">
        <FormField
          control={form.control}
          name="studentEducationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Education Level
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Education Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Education Levels</SelectLabel>
                      <SelectItem value="high_school">High School</SelectItem>
                      <SelectItem value="bachelor">
                        Bachelor&apos;s Degree
                      </SelectItem>
                      <SelectItem value="master">
                        Master&apos;s Degree
                      </SelectItem>
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
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Field of study
              </FormLabel>
              <FormControl>
                <Input
                  id="fieldofstudy"
                  type="text"
                  placeholder="e.g Computer Science"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Name of Your Current School or Institution
              </FormLabel>
              <FormControl>
                <Input
                  id="institution"
                  type="text"
                  placeholder="e.g Gakuru group of schools"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-6">
        <FormField
          control={form.control}
          name="academicYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Current Academic Year or Level
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Year/Level</SelectLabel>
                      <SelectItem value="highschool_freshman">
                        High School - Freshman (Form 1)
                      </SelectItem>
                      <SelectItem value="highschool_sophomore">
                        High School - Sophomore (Form 2)
                      </SelectItem>
                      <SelectItem value="highschool_junior">
                        High School - Junior (Form 3)
                      </SelectItem>
                      <SelectItem value="highschool_senior">
                        High School - Senior (Form 4)
                      </SelectItem>
                      <SelectItem value="undergraduate_year1">
                        University - Year 1
                      </SelectItem>
                      <SelectItem value="undergraduate_year2">
                        University - Year 2
                      </SelectItem>
                      <SelectItem value="undergraduate_year3">
                        University - Year 3
                      </SelectItem>
                      <SelectItem value="undergraduate_year4">
                        University - Year 4+
                      </SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="not_applicable">
                        Not Applicable
                      </SelectItem>
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
          name="academicGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                What is Your Main Academic Goal?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Goals</SelectLabel>
                      <SelectItem value="degree_completion">
                        Degree Completion
                      </SelectItem>
                      <SelectItem value="skill_building">
                        Skill building
                      </SelectItem>

                      <SelectItem value="career_change">
                        Career change
                      </SelectItem>
                      <SelectItem value="pass_exam">Pass Exam</SelectItem>
                      <SelectItem value="get_job">Get a job</SelectItem>
                    </SelectGroup>
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

export default AcademicInformation;
