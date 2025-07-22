import React from "react";

// components
import {
  FormControl,
  FormDescription,
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

const TeachingExperience = ({ form }: Props) => {
  return (
    <div>
      <div className="mb-6">
        <FormField
          control={form.control}
          name="tutor_education_level"
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
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelors">
                        Bachelor&apos;s Degree
                      </SelectItem>
                      <SelectItem value="masters">
                        Master&apos;s Degree
                      </SelectItem>
                      <SelectItem value="phd">PHD</SelectItem>
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
          name="years_of_teaching"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Years of teaching
              </FormLabel>
              <FormControl>
                <Input
                  id="fieldofstudy"
                  type="number"
                  placeholder="e.g 1 years"
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
          name="previous_institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Previous institution
              </FormLabel>
              <FormControl>
                <Input
                  id="previousInstitution"
                  type="text"
                  placeholder="e.g Gakuru group of schools"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                If you have previous teaching experience, enter the institution
                name. If not, type &quot;NONE&quot; or &quot;N/A&quot;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* <div className="mb-6">
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="tracking-wider text-sm">
                Upload teaching certifications
              </FormLabel>
              <FormControl>
                <div className="">
                  <Label
                    id="certifications"
                    className="border flex items-center justify-center dark:bg-neutral-500/10 h-36 rounded-sm  dark:border-neutral-500/40"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500 dark:text-neutral-400">
                        Click to upload
                      </p>
                      <p className="text-xs text-gray-500 dark:text-neutral-400">
                        PDF,DOCX
                      </p>
                    </div>
                    <Input
                      id="certifications"
                      type="file"
                      multiple
                      hidden
                      onChange={handleFileChange}
                    />
                  </Label>

                  <AnimatePresence>
                    {selectedFiles.length > 0 &&
                      selectedFiles.map((file, index) => (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -1 }}
                          transition={{ duration: 0.25 }}
                          key={index}
                          layout
                          className="flex items-center justify-between dark:bg-neutral-500/10 bg-gray-500 rounded-md px-2 py-1.5 space-y-1.5 mt-1.5"
                        >
                          <div className="flex items-center gap-x-1.5">
                            <FileText
                              size={20}
                              className="text-neutral-800 dark:text-neutral-300"
                            />
                            <p className="text-sm dark:text-neutral-300 truncate">
                              {file.name}
                            </p>
                          </div>

                          <button
                            onClick={() => handleRemoveFile(index)}
                            type="button"
                            className="p-1.5 rounded-md bg-gray-400 dark:bg-neutral-500/10 cursor-pointer hover:dark:bg-neutral-500/20 hover:bg-gray-500 transition-colors duration-75"
                          >
                            <X size={18} className="dark:text-neutral-400" />
                          </button>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div> */}
    </div>
  );
};

export default TeachingExperience;
