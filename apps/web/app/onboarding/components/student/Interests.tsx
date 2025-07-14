"use client";
import React, { useState } from "react";

// components
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

// form
import { Control } from "react-hook-form";

// animation
import { AnimatePresence, motion } from "motion/react";

interface InterestProps {
  control: Control<any>;
}

interface InterestItem {
  id: string;
  name: string;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const Interest = ({ control }: InterestProps) => {
  const [courses, setCourses] = useState<InterestItem[]>([
    { id: "1", name: "Math" },
    { id: "2", name: "Programming" },
    { id: "3", name: "Art and design" },
  ]);

  return (
    <FormField
      control={control}
      name="interests"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="tracking-wider text-sm mb-2">
            Choose at least 3 interests
          </FormLabel>
          <ScrollArea className="max-h-96 w-full  p-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AnimatePresence>
                {courses.map((course, index) => {
                  const isChecked = field.value?.includes(course.id);
                  return (
                    <motion.div
                      key={course.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ delay: index * 0.05 }}
                    >
                      <FormControl>
                        <Label className="hover:bg-accent/50 dark:hover:bg-neutral-500/40 hover:cursor-pointer flex items-start gap-3 rounded-lg border dark:border-neutral-500/30 p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                          <Checkbox
                            id={course.id}
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const updatedValues = checked
                                ? [...(field.value || []), course.id]
                                : (field.value || []).filter(
                                    (val: string) => val !== course.id
                                  );

                              field.onChange(updatedValues);
                            }}
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                          />
                          <div className="grid gap-1.5 font-normal">
                            <p className="text-sm leading-none font-medium">
                              {course.name}
                            </p>
                          </div>
                        </Label>
                      </FormControl>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </ScrollArea>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Interest;
