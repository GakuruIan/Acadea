"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// icons
import { GalleryVerticalEnd } from "lucide-react";

import Link from "next/link";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

//toast
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

//validation schema
const loginSchema = z.object({
  email: z
    .email("Invalid email, Please enter a valid Email")
    .max(50, "Email cannot exceed 50 characters.")
    .min(1, "Email is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password cannot exceed 50 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)."
    ),
});

const Page = () => {
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleNextStep = () => {
    setStep(2);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-6">
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
                <h1 className="text-xl font-medium font-poppins-semibold  tracking-tight">
                  Welcome to Acadea Inc.
                </h1>
                <div className="text-center text-sm tracking-wide dark:text-neutral-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4 dark:hover:text-neutral-200 hover:text-gray-600"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {step === 1 && (
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
                            Enter the email you used to sign up.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="tracking-wider text-sm">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="********"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Link
                      href="/forgot-password"
                      className="text-sm text-right dark:text-neutral-400 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                )}

                <Button
                  type={step === 1 ? "button" : "submit"}
                  variant="default"
                  className="w-full text-sm font-semibold tracking-wider"
                  onClick={step === 1 ? handleNextStep : undefined}
                >
                  {step === 1 ? "Continue" : "Sign In"}
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="dark:bg-neutral-900 text-muted-foreground relative z-10 px-2">
                  Or
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Apple
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className="text-muted-foreground *:[a]:hover:text-primary *:[a]:dark:hover:text-gray-300 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Page;
