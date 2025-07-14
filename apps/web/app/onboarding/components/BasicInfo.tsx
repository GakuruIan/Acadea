import React from "react";

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

import FileUpload from "@/components/ui/FileUpload/FileUpload";

interface props {
  form: any;
}

const BasicInfo = ({ form }: props) => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="">
          <div className="mb-6">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider text-sm">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="John"
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
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider text-sm">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Doe"
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
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider text-sm">
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="(123) 456-7890"
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="tracking-wider text-sm">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="country"
                      type="text"
                      placeholder="e.g Kenya"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FileUpload
            form={form}
            name="photo"
            label="Choose a profile photo"
            placeholder="choose an image"
            accept=".jpg,.jpeg"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
