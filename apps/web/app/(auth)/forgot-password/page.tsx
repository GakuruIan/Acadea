"use client";
import React from "react";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// icons
import { GalleryVerticalEnd } from "lucide-react";

import Link from "next/link";

const loginSchema = z.object({
  email: z
    .email("Invalid email, Please enter a valid Email")
    .max(50, "Email cannot exceed 50 characters.")
    .min(1, "Email is required."),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-6 max-w-md w-full">
        <Form {...form}>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                  <span className="sr-only">Acadea Inc.</span>
                </a>
                <h1 className="text-xl font-medium font-poppins-semibold  tracking-tight ">
                  We’ll help you get back in
                </h1>
                <div className="text-center text-sm tracking-wide dark:text-neutral-300">
                  Changed your mind?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 dark:hover:text-neutral-200 hover:text-gray-600"
                  >
                    Sign in instead
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="tracking-wider text-sm">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          We&apos;ll send you a link to reset your password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full text-sm font-semibold tracking-wider"
                >
                  Send reset link
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
