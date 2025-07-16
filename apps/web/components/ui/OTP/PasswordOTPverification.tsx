"use client";
import { useState } from "react";

// clerk
import { useSignUp } from "@clerk/nextjs";

// icons
import { GalleryVerticalEnd } from "lucide-react";

// zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// router
import { useRouter } from "next/navigation";

// components
import Spinner from "../spinner/spinner";
import { Button } from "../button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "../input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";

// toast
import { toast } from "sonner";

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
});

// TODO:add password otp verification
const OTPverification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showResendBtn, setShowResendBtn] = useState(false);
  const [step, setStep] = useState(1);
  const [sendingCode, setSendingCode] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const handleResendCode = () => {
    setSendingCode(true);
    return toast.promise(
      (async () => {
        await signUp?.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setSendingCode(false);
        setShowResendBtn(false);
      })(),
      {
        loading: "Resending code...",
        success: "Verification code successfully",
        error: "An error has occurred",
        position: "top-center",
      }
    );
  };

  const handleVerification = async (values: z.infer<typeof formSchema>) => {
    const { code, password } = values;

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        // toaster
        toast.success("Success", {
          description: "Your account has being verified ",
        });

        // router
        router.push("/onboarding");
      } else {
        toast("An error occurred", {
          description: JSON.stringify(signUpAttempt, null, 2),
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error: unknown) {
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
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 w-full max-w-2xl  mx-auto ">
      <div className="flex flex-col">
        {/* header */}

        <div className="flex flex-col items-center gap-2 mb-4">
          <a href="#" className="flex flex-col  items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <span className="sr-only">Acadea Inc.</span>
          </a>
          <h6 className="mb-2 text-2xl md:text-3xl">Welcome to Acadea inc.</h6>
          <p className="text-sm text-left tracking-tight font-poppins dark:text-neutral-500 text-gray-600">
            Finish up by verifying your account
          </p>
        </div>

        {/* header */}

        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerification)} className="">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base  font-normal dark:text-white ">
                      Password reset code
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
                    <FormDescription className="text-sm font-normal my-4  font-saira">
                      Please enter the code sent to the Email Address your
                      provided
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <div className="grid gap-3">
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
                <Link
                  href="/forgot-password"
                  className="text-sm text-right dark:text-neutral-400 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {!showResendBtn && (
              <>
                <Button
                  variant="default"
                  disabled={isLoading}
                  className="w-full font-semibold tracking-wide "
                >
                  {isLoading ? (
                    <div className="flex items-center gap-x-3">
                      <Spinner variant="xs" />
                      <p className=" ">Verifing...</p>
                    </div>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </>
            )}
          </form>
        </Form>
        {/*  */}
      </div>

      {showResendBtn && (
        <div className="mt-2">
          <p className="text-sm dark:text-gray-400 text-gray-500 mb-2">
            Get new Code
          </p>
          <Button variant={"outline"} onClick={handleResendCode}>
            Resend code
          </Button>
        </div>
      )}
    </div>
  );
};

export default OTPverification;
