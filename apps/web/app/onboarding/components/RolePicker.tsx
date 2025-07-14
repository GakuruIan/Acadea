import React from "react";
import { cn } from "@/lib/utils";

// components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

//icons
import { ArrowRight } from "lucide-react";

interface props {
  form: any;
}

const RolePicker = ({ form }: props) => {
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Student */}
              <div className="relative">
                <RadioGroupItem
                  value="student"
                  id="student"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="student"
                  className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white dark:bg-neutral-500/10 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-neutral-100 dark:border-neutral-500/40 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-500/40 gap-x-4 transition-colors ${
                    field.value === "student"
                      ? "dark:bg-white dark:text-neutral-900 bg-neutral-900 text-white"
                      : ""
                  }`}
                >
                  <div className="block">
                    <div className="w-full text-base tracking-wide mb-1 font-semibold">
                      Student
                    </div>
                    <div className="w-full text-sm">
                      Learn from expert tutors & grow your skills
                    </div>
                  </div>
                  <ArrowRight
                    size={24}
                    className={cn(
                      "dark:text-neutral-200",
                      field.value === "student" &&
                        "dark:text-neutral-900 text-white"
                    )}
                  />
                </Label>
              </div>

              {/* Tutor */}
              <div className="relative">
                <RadioGroupItem
                  value="tutor"
                  id="tutor"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="tutor"
                  className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white dark:bg-neutral-500/10 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-neutral-100 dark:border-neutral-500/40 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-500/40 gap-x-4 transition-colors ${
                    field.value === "tutor"
                      ? "dark:bg-white dark:text-neutral-900 bg-neutral-900 text-white"
                      : ""
                  }`}
                >
                  <div className="block">
                    <div className="w-full text-base tracking-wider font-semibold mb-1">
                      Tutor
                    </div>
                    <div className="w-full text-sm">
                      Share your expertise and earn by teaching students
                    </div>
                  </div>
                  <ArrowRight
                    size={24}
                    className={cn(
                      "dark:text-neutral-200",
                      field.value === "tutor" &&
                        "dark:text-neutral-900 text-white"
                    )}
                  />
                </Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RolePicker;
