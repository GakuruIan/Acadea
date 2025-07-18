"use client";
import React, { useEffect, useState } from "react";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner/spinner";

// icons
import { GalleryVerticalEnd } from "lucide-react";

import Link from "next/link";

// form utils
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

// clerk
import { useSignIn, useUser } from "@clerk/nextjs";

//toast
import { toast } from "sonner";

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/ui/Loader/Loader";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// routing
import { useRouter } from "next/navigation";

//validation schema
const formSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time code must be 6 characters.",
  }),
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
  confirmPassword: z.string(),
});

const Page = () => {
  const [step, setStep] = useState(1);
  const [showResendBtn, setShowResendBtn] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();
  const { isLoaded: isSignLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isUserLoaded, isSignedIn } = useUser();

  const isLoaded = isSignLoaded && isUserLoaded;

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await form.trigger("code");
    if (!isValid) return;
    setStep(2);
  };

  if (!isLoaded) {
    return <Loader />;
  }

  const handleVerification = async (values: z.infer<typeof formSchema>) => {
    const { code, password } = values;
    setIsloading(true);

    if (!isLoaded) return;

    await signIn
      .attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((res) => {
        if (res.status === "complete") {
          setActive({ session: res.createdSessionId });
          toast.success("Password has been updated successfully");
          router.replace("/dashboard");
        }
      })
      .catch((error) => {
        if (error?.errors[0]?.code === "verification_expired") {
          setShowResendBtn(true);
          return toast("Vefication code Expired", {
            description: error?.errors[0]?.longMessage,
          });
        }

        toast("An error occurred", {
          description: JSON.stringify(error?.errors[0]?.longMessage, null, 2),
        });
        console.error("Error:", JSON.stringify(error, null, 2));
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerification)}>
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
                  We’ll help you get back in{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 dark:hover:text-neutral-200 hover:text-gray-600"
                  >
                    Sign in instead
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {step === 1 && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base  font-normal dark:text-white ">
                          Verification Code
                        </FormLabel>

                        <FormControl className="w-full ">
                          <div className="">
                            <InputOTP maxLength={6} {...field} className="">
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {step === 2 && (
                  <div className="flex flex-col space-y-4">
                    <div className="grid gap-3 ">
                      <FormField
                        control={form.control}
                        name="password"
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
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="tracking-wider text-sm">
                              Confirm Password
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
                    </div>
                  </div>
                )}
                {step !== 2 ? (
                  <Button
                    type="button"
                    variant="default"
                    className="w-full text-sm font-semibold tracking-wider"
                    onClick={handleNextStep}
                    disabled={
                      !form.watch("code") || Boolean(form.formState.errors.code)
                    }
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full text-sm font-semibold tracking-wider"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-x-3">
                        <Spinner variant="button" size="xs" />
                        <p className=" ">Updating password...</p>
                      </div>
                    ) : (
                      "Update password"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
        <div className="">
          {showResendBtn && (
            <div className="flex items-center justify-center gap-x-1 dark:text-neutral-300 text-muted-foreground *:[a]:hover:text-primary *:[a]:dark:hover:text-gray-300 text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4">
              <p>Didn&apos;t get the code ? </p>
              <Button variant="link" className="text-sm">
                Resend code
              </Button>
            </div>
          )}
        </div>
        <div className="text-muted-foreground *:[a]:hover:text-primary *:[a]:dark:hover:text-gray-300 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Page;
